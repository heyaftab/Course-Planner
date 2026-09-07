# 🎓 UIU CSE Course Planner

A web-based academic course planning application designed specifically for **Computer Science & Engineering (CSE) students of United International University (UIU)**.

The application helps students organize their courses, plan upcoming trimesters, and keep track of their academic progress through a simple and user-friendly interface.

---

## 🚀 Features

* 📚 **Course Management**
  Browse and manage available CSE courses.

* 🗓️ **Trimester Planning**
  Plan courses across different trimesters according to your academic progress.

* 🎯 **Academic Planning**
  Organize completed, ongoing, and planned courses.

* 🔍 **Course Search**
  Quickly find courses using course codes or names.

* 📊 **Credit Tracking**
  Keep track of completed and planned credits.

* 💾 **Data Persistence**
  Course and planning data is stored using SQLite.

* ⚡ **Fast Backend**
  Built with FastAPI for lightweight and high-performance API operations.

* 📱 **Responsive Interface**
  Designed to work across desktop and mobile screen sizes.

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Vanilla JavaScript

### Backend

* Python
* FastAPI

### Database

* SQLite

### Development Tools

* Git
* GitHub
* REST API
* VS Code

---

## 🏗️ Project Architecture

The project follows a simple client-server architecture:

```text
┌─────────────────────────┐
│       Frontend          │
│                         │
│ HTML + CSS + JavaScript │
└────────────┬────────────┘
             │
             │ HTTP / REST API
             ▼
┌─────────────────────────┐
│        FastAPI          │
│        Backend          │
│                         │
│ Python                  │
└────────────┬────────────┘
             │
             │ Database Queries
             ▼
┌─────────────────────────┐
│         SQLite          │
│        Database         │
└─────────────────────────┘
```

---

## 📂 Project Structure

```text
uiu-cse-course-planner/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── main.py
│   ├── database.py
│   └── ...
│
├── database/
│   └── course_planner.db
│
├── requirements.txt
├── README.md
└── .gitignore
```

> The exact structure may vary depending on the current implementation.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/heyaftab/uiu-cse-course-planner.git
```

### 2. Navigate to the project

```bash
cd uiu-cse-course-planner
```

### 3. Create a virtual environment

```bash
python3 -m venv venv
```

Activate it on macOS/Linux:

```bash
source venv/bin/activate
```

On Windows:

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the FastAPI server

```bash
uvicorn backend.main:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation can be accessed at:

```text
http://127.0.0.1:8000/docs
```

---

## 🖥️ Usage

1. Open the application in your browser.
2. Browse available CSE courses.
3. Select the courses you have completed.
4. Add courses you plan to take.
5. Organize courses by trimester.
6. Monitor your credit progress.
7. Use the planner to build a suitable academic roadmap.

---

## 🎯 Purpose

The purpose of this project is to make academic planning easier for UIU CSE students.

Students often need to keep track of:

* Completed courses
* Remaining courses
* Course prerequisites
* Credit requirements
* Upcoming trimesters
* Planned courses

This application brings these tasks into a single planning interface.

---

## 🔮 Future Improvements

Possible future improvements include:

* [ ] Automatic prerequisite validation
* [ ] Automatic trimester recommendations
* [ ] Degree progress visualization
* [ ] CGPA calculation
* [ ] Course conflict detection
* [ ] Class schedule generation
* [ ] Faculty and section information
* [ ] Course rating and review system
* [ ] Student authentication
* [ ] Cloud database support
* [ ] Mobile-friendly improvements
* [ ] Deployment as a production web application

---

## 🔐 Security

Sensitive configuration files and credentials should not be committed to the repository.

Make sure files such as the following are included in `.gitignore` when applicable:

```text
.env
venv/
__pycache__/
*.pyc
*.db
```

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## 📄 License

This project is currently intended for educational and academic purposes.

If you plan to distribute or reuse the project publicly, consider adding an appropriate open-source license.

---

## 👨‍💻 Author

**Aftab Uddin Ahmad**

Computer Science & Engineering
United International University

---

⭐ If you find this project useful, consider giving the repository a star.
