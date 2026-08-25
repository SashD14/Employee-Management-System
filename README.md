# Employee Management System

A full-stack Employee Management System built to manage employees, attendance, leave requests, user accounts, and reports from a centralized dashboard.

## Features

### Authentication & Security

- Secure user login
- JWT authentication
- Protected routes
- Role-based authorization
- Secure password change functionality
- Admin account access

### Employee Management

- Add new employees
- View employee details
- Update employee information
- Delete employees
- Search employees
- Filter employees by department

### Attendance Management

- Mark employee attendance
- Present status
- Absent status
- Leave status
- Half-day status
- View attendance records
- Attendance statistics

### Leave Management

- Apply for leave
- View leave requests
- Approve leave requests
- Reject leave requests
- Track pending leave requests

### Dashboard

- Employee statistics
- Today's attendance overview
- Pending leave requests
- Recent activity
- Quick overview of the organization

### Reports

- Employee attendance reports
- Leave reports
- Attendance statistics
- Attendance rate calculation
- Employee filtering
- Department filtering
- Period filtering
- Attendance distribution chart
- Leave status distribution chart
- Export attendance reports
- Export leave reports

### Settings

- View logged-in user profile
- View account role
- View system access level
- Change account password securely

---

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- React Icons
- Context API
- CSS

### Backend

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- CORS

---

## Project Structure

```text
Employee-Management-System/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── attendance/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── employee/
│   │   │   ├── leave/
│   │   │   └── reports/
│   │   │
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SashD14/Employee-Management-System.git
```

```bash
cd Employee-Management-System
```

---

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

Open another terminal:

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

Add your database configuration according to the variables used in:

```text
server/src/config/db.js
```

> Never upload your `.env` file or database credentials to GitHub.

---

## Run the Application

### Start the Backend

Inside the `server` folder:

```bash
npm start
```

Or use the development command configured in `package.json`:

```bash
npm run dev
```

### Start the Frontend

Inside the `client` folder:

```bash
npm run dev
```

The Vite development server will provide a local URL, usually:

```text
http://localhost:5173
```

---

## User Roles

The system supports role-based access.

- Admin
- HR
- Manager
- Employee

Different users can have different levels of access depending on their assigned role.

---

## Security

The application includes:

- JWT-based authentication
- Protected frontend routes
- Backend authentication middleware
- Role-based authorization
- Password hashing with bcrypt
- Secure password change functionality
- Environment variables for sensitive configuration

---

## Future Improvements

- Employee profile image upload
- Email notifications
- Forgot password functionality
- Advanced analytics
- PDF report generation
- Dark mode
- Employee self-service portal improvements
- Deployment to a production server

---

## License

This project is licensed under the MIT License.

---

## Author

**Sahil M Shedge**

GitHub: [SashD14](https://github.com/SashD14)

---

⭐ If you like this project, consider giving it a star on GitHub!