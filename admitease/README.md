# AdmitEase 🎓
### Lucknow's Premier Admission Consulting Platform

AdmitEase is a full-stack MERN web application for college admission consulting. It helps students explore colleges in Lucknow and submit enquiries for expert admission guidance.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS + React Router
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (Admin only)

---

## 📁 Project Structure

```
admitease/
├── server/              # Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/      # JWT auth
│   ├── index.js         # Entry point
│   └── seed.js          # Seed 10 Lucknow colleges + admin
│
└── client/              # React frontend (Vite)
    └── src/
        ├── components/  # Navbar, Footer, CollegeCard, EnquiryModal
        ├── context/     # AuthContext (JWT)
        ├── pages/       # Home, Colleges, CollegeDetail, AdminLogin, AdminDashboard
        └── utils/       # Axios API instance
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js >= 18
- MongoDB (local or MongoDB Atlas)

---

### 1. Clone & Setup Server

```bash
cd server
npm install

# Copy and edit env
cp .env.example .env
# Edit MONGODB_URI, JWT_SECRET as needed

# Seed database (10 Lucknow colleges + admin account)
npm run seed

# Start server
npm run dev
```
Server runs on: http://localhost:5000

---

### 2. Setup Client

```bash
cd client
npm install

# Start frontend
npm run dev
```
Frontend runs on: http://localhost:5173

---

## 🔑 Admin Access

After running seed:
- **URL**: http://localhost:5173/admin/login
- **Email**: admin@admitease.in
- **Password**: Admin@123

---

## 📡 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/colleges | List all colleges (supports filters) |
| GET | /api/colleges/:slug | Get college by slug |
| POST | /api/leads | Submit enquiry |

### Admin (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/admin/login | Admin login |
| GET | /api/leads | View all leads |
| PUT | /api/leads/:id/status | Update lead status |
| POST | /api/colleges | Add college |
| PUT | /api/colleges/:id | Update college |
| DELETE | /api/colleges/:id | Delete college |

---

## 🏫 Seeded Colleges (Lucknow)

1. Babu Banarasi Das University (BBDU)
2. Integral University
3. University of Lucknow
4. IIM Lucknow
5. BBDNIIT Lucknow
6. Amity University Lucknow
7. KIET Lucknow
8. Shri Ramswaroop Memorial University
9. ERA University (Medical)
10. Lucknow Institute of Technology

---

## ✨ Features

### Student-Facing
- 🏠 Hero section with search + quick course filters
- 🏫 College listing with filters (course, fees, affiliation)
- 📋 Detailed college pages (no direct contact shown)
- 📬 Enquiry form modal (connected to MongoDB)

### Admin Dashboard
- 📊 Stats overview (leads, conversions, colleges)
- 📋 Lead management with status updates
- ➕ Add / Edit / Delete colleges
- 🔐 JWT-protected routes

---

## 🎨 Design Highlights
- Playfair Display + DM Sans typography
- Blue gradient hero with animated elements
- Card hover effects and smooth transitions
- Fully responsive mobile design
- Professional EdTech color palette
