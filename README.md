# UIU CSE Course Planner

## Project Overview

UIU CSE Course Planner is a full-stack academic planning app for B.Sc. in CSE students at United International University. It helps students create an account, manage a trimester-wise course plan, track completed courses, calculate CGPA, update their profile, upload a profile photo, and export progress as a CSV file.

The project demonstrates practical frontend state management, REST API design, authentication workflows, local persistence, responsive UI design, and deployment readiness.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python, FastAPI
- **Server**: Uvicorn
- **Optional Backend Alternative**: Node.js
- **Storage**: JSON file storage with browser `localStorage` fallback
- **Deployment**: Nginx reverse proxy with HTTPS support

## Features

- Secure student signup and login using a 10 digit UIU student ID.
- Editable profile with name, phone number, password, and profile photo.
- Locked student ID after signup to protect account identity.
- Dashboard summary for total courses, completed courses, earned credits, and CGPA.
- Trimester-wise course planning based on the UIU CSE curriculum.
- Completion and grade tracking for each course.
- Elective, GED, major, and custom course selection.
- Add or remove custom courses and trimesters.
- CSV export for offline academic records.
- Dark and light theme support.
- Optional saved-login account switching on personal devices.

## Screenshots

![Dashboard screenshot placeholder](docs/screenshots/dashboard.png)

Dashboard overview with progress, credits, CGPA, and profile photo.

![Profile editor screenshot placeholder](docs/screenshots/profile-editor.png)

Profile editor for updating personal information and profile photo.

![Trimester view screenshot placeholder](docs/screenshots/trimester-view.png)

Trimester view with course completion, grades, and course actions.

## How It Works

The app can run in two modes:

- **Backend mode**: FastAPI handles signup, login, profile updates, and account storage in `backend/data/students.json`.
- **Static-only mode**: The frontend runs directly in the browser and stores data with `localStorage`.

The frontend is a single-page app. JavaScript dynamically updates the dashboard, trimester views, profile modal, course status, grades, and export data.

## Project Structure

```text
.
├── README.md
├── run.py
├── requirements.txt
├── backend
│   ├── main.py
│   ├── server.js
│   └── data/students.json
├── frontend
│   ├── index.html
│   ├── css/styles.css
│   └── js/app.js
└── index.html
```

## Run Locally

From the project root:

```bash
python3 run.py
```

On Windows:

```bash
py run.py
```

The runner creates `.venv` if needed, installs `requirements.txt` only when dependencies are missing, and starts the FastAPI server.

The terminal will show:

```text
Student app:        http://127.0.0.1:8000
Backend dashboard:  http://127.0.0.1:8000/api
API test docs:      http://127.0.0.1:8000/docs
Server health page: http://127.0.0.1:8000/api/health/view
```

Open the frontend app in your browser:

```text
http://127.0.0.1:8000
```

Useful options:

```bash
python3 run.py --install
python3 run.py --no-reload
python3 run.py --port 8080
```

Manual setup:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
uvicorn backend.main:app --reload
```

Manual Windows setup:

```bash
py -m venv .venv
.venv\Scripts\activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
uvicorn backend.main:app --reload
```

For static-only testing, open `frontend/index.html` directly in a browser.

## API Examples

Health check:

```bash
curl http://127.0.0.1:8000/api/health
```

Create an account:

```bash
curl -X POST http://127.0.0.1:8000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Student","email":"student@example.com","studentId":"1234567890","password":"secret123"}'
```

Log in:

```bash
curl -X POST http://127.0.0.1:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"studentId":"1234567890","password":"secret123"}'
```

Update profile:

```bash
curl -X POST http://127.0.0.1:8000/api/profile \
  -H "Content-Type: application/json" \
  -d '{"studentId":"1234567890","name":"Updated Name","phone":"+880 1712345678","password":"","profilePhoto":""}'
```

## Deployment

Deploy the FastAPI app on a Python-capable cloud server such as DigitalOcean, AWS EC2, Azure, Google Cloud, or Render. A typical production setup is:

- Run Uvicorn without `--reload`.
- Put Nginx in front of Uvicorn as a reverse proxy.
- Enable HTTPS with Let's Encrypt.
- Ensure `backend/data/` is writable by the application process.
- Back up `backend/data/students.json` regularly.
- For production-scale use, replace JSON storage with a database such as PostgreSQL.

Example production command:

```bash
uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

## Security Notes

Official UIU credential verification requires access to a university authentication API. This project verifies only accounts created inside this planner.

Saved account switching stores selected login details in the browser. Use it only on a personal device.

## Future Improvements

- Add database-backed storage.
- Add token-based authentication.
- Add automated tests.
- Replace screenshot placeholders with real images.
