# InterviewEase

A full-stack web application built to simplify and enhance the interview process for both **candidates** and **interviewers**. Built using **React.js**, **Spring Boot**, **MySQL**, and **JWT-based authentication**, this platform offers a seamless experience for scheduling, conducting, and managing interviews in real-time.



---

## 🚀 Features

### 👨‍💻 Candidate Portal

- 📝 Register/Login securely using JWT authentication
- 📋 Update and manage your profile & resume
- 📅 View scheduled interviews
- 🎥 Attend video interviews in real-time
- 🧑‍💼 Connect with interviewers instantly
- 🔒 Role-based access control (secured via Spring Security)

### 🧑‍⚖️ Interviewer Portal

- 🔐 Secure login with JWT
- 📊 Dashboard to view all registered candidates
- 👀 Review candidate profiles and resumes
- 📅 Schedule interviews with date/time slots
- 🟢 Start and conduct video interviews
- 💬 Access interview chat & whiteboard area
- 📁 Record and save interview sessions (future enhancement)

---

## 🛠 Tech Stack

| Frontend         | Backend        | Database | Auth         | Real-time |
|------------------|----------------|----------|--------------|-----------|
| React.js         | Spring Boot    | MySQL    | Spring Security + JWT | WebRTC (for video) |

---

## 📂 Project Structure

```bash
InterviewEase/
├── frontend/             # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── backend/              # Spring Boot Backend
│   └── src/main/java/
│       └── com/interviewease/
│           ├── controller/
│           ├── model/
│           ├── repository/
│           ├── service/
│           └── security/
├── database/             # MySQL Scripts
├── .env                  # API keys and environment variables
├── README.md
🔑 How Authentication Works
JWT (JSON Web Tokens) used for both Candidate and Interviewer roles

Role-based access to endpoints using Spring Security

Tokens are stored in localStorage and used in Authorization headers

⚙️ Installation & Setup
1️⃣ Clone the Repo
bash
Copy
Edit
git clone https://github.com/TEJASRI-44/interviewease.git
cd interviewease
2️⃣ Backend Setup (Spring Boot)
bash
Copy
Edit
cd backend
./mvnw spring-boot:run
# Ensure MySQL is running and update application.properties accordingly
3️⃣ Frontend Setup (React)
bash
Copy
Edit
cd frontend
npm install
npm start


🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

📄 License
MIT License © Tejasri Bathini
