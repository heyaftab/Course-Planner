from __future__ import annotations

import argparse
import os
import signal
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
VENV_DIR = ROOT / ".venv"
REQUIREMENTS = ROOT / "requirements.txt"


def venv_python() -> Path:
    if os.name == "nt":
        return VENV_DIR / "Scripts" / "python.exe"
    return VENV_DIR / "bin" / "python"


def run_command(command: list[str], *, check: bool = True, quiet: bool = False) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        cwd=ROOT,
        check=check,
        text=True,
        stdout=subprocess.DEVNULL if quiet else None,
        stderr=subprocess.DEVNULL if quiet else None,
    )


def backend_is_ready(python_path: Path) -> bool:
    result = run_command(
        [str(python_path), "-c", "import backend.main"],
        check=False,
        quiet=True,
    )
    return result.returncode == 0


def install_dependencies(python_path: Path) -> None:
    print("Installing Python dependencies. This may take a minute the first time...")
    run_command([str(python_path), "-m", "pip", "install", "--upgrade", "pip"])
    run_command([str(python_path), "-m", "pip", "install", "-r", str(REQUIREMENTS)])


def ensure_environment(force_install: bool) -> Path:
    python_path = venv_python()

    if not python_path.exists():
        print("Creating virtual environment in .venv...")
        run_command([sys.executable, "-m", "venv", str(VENV_DIR)])
        install_dependencies(python_path)
        return python_path

    if force_install:
        install_dependencies(python_path)
        return python_path

    if not backend_is_ready(python_path):
        install_dependencies(python_path)

    return python_path


def run_server(command: list[str]) -> int:
    if os.name == "nt":
        process = subprocess.Popen(command, cwd=ROOT)
    else:
        process = subprocess.Popen(command, cwd=ROOT, start_new_session=True)

    try:
        return process.wait()
    except KeyboardInterrupt:
        print("\nStopping Course Planner...")
        if os.name == "nt":
            process.terminate()
        else:
            os.killpg(process.pid, signal.SIGINT)

        try:
            process.wait(timeout=8)
        except subprocess.TimeoutExpired:
            if os.name == "nt":
                process.kill()
            else:
                os.killpg(process.pid, signal.SIGTERM)
            process.wait()

        print("Course Planner stopped.")
        return 0


def main() -> None:
    parser = argparse.ArgumentParser(description="Set up and run UIU CSE Course Planner.")
    parser.add_argument("--host", default="127.0.0.1", help="Host for the local server.")
    parser.add_argument("--port", default="8000", help="Port for the local server.")
    parser.add_argument("--no-reload", action="store_true", help="Start Uvicorn without auto-reload.")
    parser.add_argument("--install", action="store_true", help="Force dependency installation before starting.")
    args = parser.parse_args()

    python_path = ensure_environment(args.install)
    url = f"http://{args.host}:{args.port}"
    command = [
        str(python_path),
        "-m",
        "uvicorn",
        "backend.main:app",
        "--host",
        args.host,
        "--port",
        args.port,
    ]
    if not args.no_reload:
        command.append("--reload")

    print("\nCourse Planner is starting...")
    print("")
    print("Open these links in your browser:")
    print(f"  Student app:        {url}")
    print(f"  Backend dashboard:  {url}/api")
    print(f"  API test docs:      {url}/docs")
    print(f"  Server health page: {url}/api/health/view")
    print("")
    print("Use the Student app for normal work. Use Backend dashboard/API docs for testing.")
    print("Press Ctrl+C to stop the server.")
    raise SystemExit(run_server(command))


if __name__ == "__main__":
    main()
