# Student CRUD - Full Stack Management System

A modern, responsive fullstack Student CRUD application built with **Vite + React (JavaScript)** and integrated with a **Spring Boot REST API** backend (`Student` entity) connected to **PostgreSQL**.

---

## 📁 Project Structure

```text
STUDENT-CRUD/
├── render.yaml          # Render Blueprint deployment definition
├── README.md            # Project documentation & deployment guide
├── frontend/            # Vite + React JavaScript Frontend
│   ├── src/
│   │   ├── api/         # Axios client & Student CRUD service
│   │   ├── components/  # Navbar, StudentTable, StudentModal, DeleteModal, etc.
│   │   ├── utils/       # Form validations
│   │   ├── App.jsx      # Root state management & notification logic
│   │   ├── App.css      # Modern SaaS design system
│   │   ├── index.css    # Typography, variables, and resets
│   │   └── main.jsx     # React entry point
│   ├── package.json
│   ├── vite.config.js   # Vite configuration with proxy to Spring Boot
│   └── .env             # Environment API configuration
└── student/             # Spring Boot Maven Backend
    ├── Dockerfile       # Multi-stage Docker container build for Render
    ├── pom.xml          # Maven dependencies (Java 21, Spring Boot 4)
    ├── src/
    │   ├── main/
    │   │   ├── java/com/tongson/student/
    │   │   │   ├── Student.java           # Entity (id, firstname, lastname, course, section)
    │   │   │   ├── StudentController.java # REST Controller (/tongson/students)
    │   │   │   ├── StudentRepository.java # JPA Repository
    │   │   │   └── StudentApplication.java
    │   │   └── resources/
    │   │       └── application.properties # Dynamic datasource configuration (Render & Local)
    │   └── test/
    └── mvnw.cmd
```

---

## 🚀 How to Run Locally

### 1. Run Backend (Spring Boot)
Ensure PostgreSQL is running on `localhost:5432` with database `db_student`:
```bash
cd student
./mvnw spring-boot:run
```
*(On Windows: `.\mvnw.cmd spring-boot:run`)*

Backend will start on **[http://localhost:8080](http://localhost:8080)**.
Endpoints:
- `GET /tongson/students` — Retrieve all students
- `GET /tongson/students/{id}` — Retrieve single student
- `POST /tongson/students` — Create student
- `PUT /tongson/students/{id}` — Update student
- `DELETE /tongson/students/{id}` — Delete student

### 2. Run Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## ☁️ Deploy to Render

This repository includes a [`render.yaml`](./render.yaml) Blueprint that automatically provisions:
1. **PostgreSQL Database (`student-db`)**: Managed Free PostgreSQL instance.
2. **Backend Web Service (`student-backend`)**: Dockerized Spring Boot application with auto-wired database credentials and CORS enabled.
3. **Frontend Static Site (`student-frontend`)**: Vite React application with client-side rewrites and automated build pipeline.

### Steps to Deploy:
1. Commit and push the repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure Render.com deployment blueprint"
   git push origin main
   ```
2. Go to **[dashboard.render.com](https://dashboard.render.com/)**.
3. Click **New +** > **Blueprint**.
4. Connect your GitHub repository: **`ICTongson/student-crud`**.
5. Render will automatically detect [`render.yaml`](./render.yaml) and provision all 3 resources!
6. Once deployed, update the frontend's `VITE_API_BASE_URL` in the Render dashboard to point to your live backend service URL (e.g., `https://student-backend.onrender.com/tongson/students`).
