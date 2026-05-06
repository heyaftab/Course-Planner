from __future__ import annotations

import hashlib
import hmac
import json
import os
import re
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, EmailStr, Field


BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
DATA_DIR = BASE_DIR / "data"
STUDENTS_FILE = DATA_DIR / "students.json"
FRONTEND_DIR = PROJECT_ROOT / "frontend"

app = FastAPI(title="UIU Course Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class SignupRequest(BaseModel):
    name: str = Field(min_length=1, examples=["Test Student"])
    email: EmailStr = Field(examples=["student@example.com"])
    studentId: str = Field(description="10 digit UIU student ID.", examples=["1234567890"])
    password: str = Field(min_length=6, examples=["secret123"])

    model_config = ConfigDict(json_schema_extra={
        "example": {
            "name": "Test Student",
            "email": "student@example.com",
            "studentId": "1234567890",
            "password": "secret123",
        }
    })


class LoginRequest(BaseModel):
    studentId: str = Field(description="10 digit UIU student ID.", examples=["1234567890"])
    password: str = Field(examples=["secret123"])

    model_config = ConfigDict(json_schema_extra={
        "example": {
            "studentId": "1234567890",
            "password": "secret123",
        }
    })


class ProfileUpdateRequest(BaseModel):
    studentId: str = Field(description="Used to find the account. This value is not changed.", examples=["1234567890"])
    name: str = Field(min_length=1, examples=["Updated Name"])
    phone: str = Field(default="", examples=["+880 1712345678"])
    password: str = Field(default="", description="Leave blank to keep the current password.", examples=[""])
    profilePhoto: str = Field(default="", description="Base64 image data URL. Leave blank to remove the photo.", examples=[""])

    model_config = ConfigDict(json_schema_extra={
        "example": {
            "studentId": "1234567890",
            "name": "Updated Name",
            "phone": "+880 1712345678",
            "password": "",
            "profilePhoto": "",
        }
    })


class PublicStudent(BaseModel):
    id: str = Field(examples=["1234567890"])
    name: str = Field(examples=["Test Student"])
    phone: str = Field(default="", examples=["+880 1712345678"])
    profilePhoto: str = Field(default="", examples=[""])


class StudentResponse(BaseModel):
    student: PublicStudent


class HealthResponse(BaseModel):
    status: str = Field(examples=["ok"])
    message: str = Field(examples=["Backend server is running."])


class ApiInfoResponse(BaseModel):
    name: str
    status: str
    docs: str
    endpoints: dict[str, str]


def ensure_data_file() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not STUDENTS_FILE.exists():
        STUDENTS_FILE.write_text("{}", encoding="utf-8")


def read_students() -> dict:
    ensure_data_file()
    return json.loads(STUDENTS_FILE.read_text(encoding="utf-8"))


def write_students(students: dict) -> None:
    ensure_data_file()
    STUDENTS_FILE.write_text(json.dumps(students, indent=2), encoding="utf-8")


def normalize_student_id(student_id: str) -> str:
    return re.sub(r"\D", "", str(student_id or ""))


def is_valid_uiu_student_id(student_id: str) -> bool:
    return bool(re.fullmatch(r"\d{10}", student_id))


def hash_password(password: str, salt: bytes | None = None) -> str:
    salt = salt or os.urandom(16)
    digest = hashlib.scrypt(password.encode("utf-8"), salt=salt, n=16384, r=8, p=1)
    return f"{salt.hex()}:{digest.hex()}"


def verify_password(password: str, saved_hash: str) -> bool:
    try:
        salt_hex, digest_hex = saved_hash.split(":", 1)
        salt = bytes.fromhex(salt_hex)
        expected = bytes.fromhex(digest_hex)
        candidate = hashlib.scrypt(password.encode("utf-8"), salt=salt, n=16384, r=8, p=1)
        return hmac.compare_digest(candidate, expected)
    except ValueError:
        return False


def public_student(student: dict) -> dict:
    return {
        "id": student["id"],
        "name": student["name"],
        "phone": student.get("phone", ""),
        "profilePhoto": student.get("profilePhoto", ""),
    }


@app.get(
    "/api/health",
    response_model=HealthResponse,
    tags=["System"],
    summary="Check backend health",
    description="Returns a small JSON response confirming that the backend server is running.",
)
def health() -> dict:
    return {"status": "ok", "message": "Backend server is running."}


def api_info_data() -> dict:
    return {
        "name": "UIU Course Planner API",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "health": "GET /api/health",
            "signup": "POST /api/signup",
            "login": "POST /api/login",
            "profile": "POST /api/profile",
        },
    }


def page_shell(title: str, body: str) -> str:
    return f"""
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>{title}</title>
      <style>
        * {{ box-sizing: border-box; }}
        body {{ margin: 0; font-family: Arial, sans-serif; background: #f6f8fa; color: #1f2937; }}
        main {{ max-width: 980px; margin: 0 auto; padding: 34px 18px; }}
        .hero, .panel, .card {{ background: #fff; border: 1px solid #d8dee4; border-radius: 14px; box-shadow: 0 12px 34px rgba(31,41,55,.07); }}
        .hero {{ padding: 28px; }}
        h1 {{ margin: 0 0 8px; font-size: 32px; }}
        h2 {{ margin: 0 0 12px; font-size: 20px; }}
        h3 {{ margin: 0 0 8px; font-size: 16px; }}
        p {{ color: #57606a; line-height: 1.6; margin: 7px 0; }}
        .status {{ display: inline-flex; align-items: center; gap: 8px; margin: 12px 0 20px; padding: 7px 12px; border-radius: 999px; background: #dafbe1; color: #116329; font-weight: 700; }}
        .dot {{ width: 9px; height: 9px; border-radius: 50%; background: #1a7f37; }}
        .links {{ display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }}
        a {{ color: #0969da; text-decoration: none; font-weight: 700; }}
        .button {{ display: inline-block; border: 1px solid #0969da; border-radius: 8px; padding: 10px 13px; background: #ddf4ff; }}
        .button.primary {{ background: #0969da; color: #fff; }}
        .panel {{ margin-top: 18px; padding: 22px; }}
        .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 20px; }}
        .card {{ padding: 16px; box-shadow: none; }}
        code {{ display: inline-block; margin-bottom: 7px; padding: 4px 7px; border-radius: 6px; background: #f0f3f6; color: #24292f; }}
        pre {{ margin: 10px 0 0; padding: 13px; overflow-x: auto; border-radius: 10px; background: #0d1117; color: #e6edf3; font-size: 13px; line-height: 1.5; }}
        .steps {{ padding-left: 20px; color: #57606a; line-height: 1.7; }}
        .tag {{ display: inline-block; border-radius: 999px; padding: 3px 8px; background: #fff8c5; color: #7d4e00; font-size: 12px; font-weight: 700; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 10px; }}
        th, td {{ border-bottom: 1px solid #d8dee4; padding: 10px; text-align: left; vertical-align: top; }}
        th {{ color: #57606a; font-size: 13px; }}
        footer {{ margin-top: 22px; color: #6e7781; font-size: 13px; }}
      </style>
    </head>
    <body><main>{body}</main></body>
    </html>
    """


@app.get("/api", response_class=HTMLResponse)
def api_dashboard() -> str:
    return page_shell("UIU Course Planner API", """
        <section class="hero">
          <span class="tag">Backend Server</span>
          <h1>UIU Course Planner Backend</h1>
          <p>This page confirms that the backend is running. The frontend uses this server for signup, login, profile updates, and account storage.</p>
          <div class="status"><span class="dot"></span> Backend is running</div>
          <div class="links">
            <a class="button primary" href="/">Open Frontend App</a>
            <a class="button" href="/docs">Open API Docs</a>
            <a class="button" href="/api/health/view">Check Health</a>
            <a class="button" href="/api/info/view">View API Info</a>
          </div>
        </section>
        <section class="panel">
          <h2>What should I open?</h2>
          <ol class="steps">
            <li>Use <strong>Open Frontend App</strong> to use the course planner normally.</li>
            <li>Use <strong>Open API Docs</strong> to test backend endpoints in the browser.</li>
            <li>Use <strong>Check Health</strong> to confirm the backend is responding.</li>
          </ol>
        </section>
        <section class="grid">
          <div class="card"><code>GET /api/health</code><p>Checks whether the backend server is running.</p></div>
          <div class="card"><code>POST /api/signup</code><p>Creates a student account with name, email, student ID, and password.</p></div>
          <div class="card"><code>POST /api/login</code><p>Logs in a student with student ID and password.</p></div>
          <div class="card"><code>POST /api/profile</code><p>Updates profile name, phone number, password, and profile photo.</p></div>
        </section>
        <section class="panel">
          <h2>Quick API Examples</h2>
          <h3>Health check</h3>
          <pre>curl http://127.0.0.1:8000/api/health</pre>
          <h3>Create account</h3>
          <pre>curl -X POST http://127.0.0.1:8000/api/signup \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test Student","email":"student@example.com","studentId":"1234567890","password":"secret123"}'</pre>
          <h3>Log in</h3>
          <pre>curl -X POST http://127.0.0.1:8000/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"studentId":"1234567890","password":"secret123"}'</pre>
        </section>
        <footer>Use the frontend app for normal student actions. Use API Docs or curl examples for backend testing.</footer>
    """)


@app.get("/api/health/view", response_class=HTMLResponse, include_in_schema=False)
def health_view() -> str:
    data = health()
    return page_shell("Backend Health", f"""
        <section class="hero">
          <span class="tag">Health Check</span>
          <h1>Backend Health</h1>
          <p>This page shows whether the backend server is responding correctly.</p>
          <div class="status"><span class="dot"></span> {data["message"]}</div>
          <div class="links">
            <a class="button primary" href="/">Open Frontend App</a>
            <a class="button" href="/api">Back to Backend Dashboard</a>
            <a class="button" href="/api/health">View Raw JSON</a>
          </div>
        </section>
        <section class="panel">
          <h2>Response</h2>
          <table>
            <tr><th>Field</th><th>Value</th><th>Meaning</th></tr>
            <tr><td><code>status</code></td><td>{data["status"]}</td><td>The backend is available.</td></tr>
            <tr><td><code>message</code></td><td>{data["message"]}</td><td>Human-readable server status.</td></tr>
          </table>
        </section>
    """)


@app.get("/api/info/view", response_class=HTMLResponse, include_in_schema=False)
def api_info_view() -> str:
    data = api_info_data()
    endpoint_rows = "".join(
        f"<tr><td><code>{endpoint}</code></td><td>{description}</td></tr>"
        for endpoint, description in data["endpoints"].items()
    )
    return page_shell("API Information", f"""
        <section class="hero">
          <span class="tag">API Info</span>
          <h1>{data["name"]}</h1>
          <p>This page summarizes the backend routes in a readable format.</p>
          <div class="status"><span class="dot"></span> API status: {data["status"]}</div>
          <div class="links">
            <a class="button primary" href="/docs">Open API Docs</a>
            <a class="button" href="/api">Back to Backend Dashboard</a>
            <a class="button" href="/api/info">View Raw JSON</a>
          </div>
        </section>
        <section class="panel">
          <h2>Available Endpoints</h2>
          <table>
            <tr><th>Name</th><th>Route</th></tr>
            {endpoint_rows}
          </table>
        </section>
        <section class="panel">
          <h2>Developer Links</h2>
          <p><strong>Interactive docs:</strong> <a href="{data["docs"]}">{data["docs"]}</a></p>
          <p><strong>Raw JSON info:</strong> <a href="/api/info">/api/info</a></p>
        </section>
    """)


@app.get(
    "/api/info",
    response_model=ApiInfoResponse,
    tags=["System"],
    summary="Get backend API information",
    description="Returns backend name, status, documentation path, and available API endpoints.",
)
def api_info() -> dict:
    return api_info_data()


@app.post(
    "/api/signup",
    response_model=StudentResponse,
    status_code=201,
    tags=["Authentication"],
    summary="Create student account",
    description="Creates a local planner account for a student using name, email, UIU student ID, and password.",
)
def signup(payload: SignupRequest) -> dict:
    student_id = normalize_student_id(payload.studentId)
    if not is_valid_uiu_student_id(student_id):
        raise HTTPException(status_code=400, detail="Student ID must be exactly 10 digits.")

    students = read_students()
    if student_id in students:
        raise HTTPException(status_code=409, detail="Student ID already exists.")

    students[student_id] = {
        "id": student_id,
        "name": payload.name.strip(),
        "email": str(payload.email).strip(),
        "passwordHash": hash_password(payload.password),
    }
    write_students(students)
    return {"student": public_student(students[student_id])}


@app.post(
    "/api/login",
    response_model=StudentResponse,
    tags=["Authentication"],
    summary="Log in student",
    description="Logs in a student with a 10 digit UIU student ID and password.",
)
def login(payload: LoginRequest) -> dict:
    student_id = normalize_student_id(payload.studentId)
    student = read_students().get(student_id)
    if not student or not verify_password(payload.password, student.get("passwordHash", "")):
        raise HTTPException(status_code=401, detail="Student ID or password does not match.")

    return {"student": public_student(student)}


@app.post(
    "/api/profile",
    response_model=StudentResponse,
    tags=["Profile"],
    summary="Update student profile",
    description="Updates name, phone number, password, and profile photo. The student ID is used to find the account and is not changed.",
)
def update_profile(payload: ProfileUpdateRequest) -> dict:
    student_id = normalize_student_id(payload.studentId)
    students = read_students()
    student = students.get(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student account was not found.")

    name = payload.name.strip()
    phone = payload.phone.strip()
    password = payload.password
    profile_photo = payload.profilePhoto.strip()

    if not name:
        raise HTTPException(status_code=400, detail="Name is required.")
    if password and len(password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")
    if phone and not re.fullmatch(r"[\d\s()+-]{7,20}", phone):
        raise HTTPException(status_code=400, detail="Enter a valid phone number.")
    if profile_photo and not profile_photo.startswith("data:image/"):
        raise HTTPException(status_code=400, detail="Profile photo must be an image.")

    student["name"] = name
    student["phone"] = phone
    student["profilePhoto"] = profile_photo
    if password:
        student["passwordHash"] = hash_password(password)

    write_students(students)
    return {"student": public_student(student)}


app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
