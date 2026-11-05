# 🎓 Student Management System — Frontend (Vite + React)

A modern, fast, and responsive frontend for the **Student CRUD API**, built with **React** and **Vite** (JavaScript).

---

## 🚀 Features

- **Full CRUD Capabilities**:
  - **Create**: Add new student with live input validation (ID, First & Last Name, Email, Course, Year Level).
  - **Read**: Dynamic data table with student avatars, badges, and sorting.
  - **Update**: Edit existing student records with pre-filled forms.
  - **Delete**: Safe delete dialog with confirmation prompt to prevent accidental data loss.
- **Search & Filter**: Real-time filtering by Name, Student ID, Email, Course, and Status (Active, Inactive, Graduated).
- **Responsive Design**: Clean desktop table and mobile-friendly card layout.
- **Live API Port / URL Switching**: Switch and test backend URLs right from the UI without touching configuration files.
- **Visual Feedback**: Toast notifications for successful creations, updates, deletions, and network errors.

---

## 🛠️ Quick Start

### 1. Install Dependencies
Open terminal in the `frontend` folder:
```bash
cd frontend
npm install
```

### 2. Configure Backend API (Optional)
The default backend URL is set to `http://localhost:5000/api` in `.env`.
To change it:
- Edit `.env`:
  ```env
  VITE_API_BASE_URL=http://localhost:YOUR_PORT/api
  ```
- **Or** click the **"API Settings"** button directly in the application navbar to update and test the URL in real time.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Contract Compatibility

The frontend communicates with standard REST endpoints:
- `GET /students` — Retrieve student list
- `GET /students/:id` — Retrieve student by ID
- `POST /students` — Create new student
- `PUT /students/:id` — Update student
- `DELETE /students/:id` — Delete student

The app includes automatic payload normalization compatible with `_id` or `id`, combined `name` or separate `firstName`/`lastName`, and `studentId`/`student_id`.
