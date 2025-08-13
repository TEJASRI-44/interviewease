## **🎯 InterviewEase – AI-Enhanced Interview Management Platform**

InterviewEase is a **full-stack interview management system** designed to simplify the recruitment process.  
It provides **live interview capabilities**, **AI-driven feedback**, **resume-based skill matching**, and **role-specific dashboards** — all in a **secure, scalable, and user-friendly environment**.

---

## 🚀 **Features**

### 🔹 **Live Video Interviews**
- Integrated **Jitsi API** for real-time video conferencing.
- Built-in **recording functionality** for later review.

### 🔹 **AI-Powered Evaluation**
- Connected a **Flask microservice** to deliver **AI-based feedback** on interview performance.

### 🔹 **Smart Resume Matching**
- Implemented **auto-apply logic** for internships by matching candidate resumes with job requirements.

### 🔹 **Secure User Management**
- Developed **Spring Boot REST APIs** for authentication and authorization.
- **Spring Security** integration for role-based access control.

### 🔹 **Role-Based Dashboards**
- **Candidate Dashboard** – Apply for opportunities, track applications, and attend interviews.
- **Interviewer Dashboard** – Schedule, conduct, and review interviews.

### 🔹 **Notifications**
- Email notifications for scheduling updates and interview reminders.

---

## 🛠 **Tech Stack**

**Backend**
- Java, **Spring Boot** (MVC, REST APIs)
- Spring Security
- Flask (AI microservice)

**Frontend**
- React.js (Role-based UI)

**Other Tools**
- **Jitsi API** – Live video conferencing
- **MySQL** – Database
- **SMTP** – Email notifications

---

## 📂 **Project Structure**
```bash
InterviewEase/
│── backend/             # Spring Boot backend (Java)
│── frontend/            # React.js frontend
│── ai-service/          # Flask AI microservice
│── docs/                # Documentation and diagrams
└── README.md            # Project documentation
```


##🔧 Installation & Setup
1️⃣ Clone the Repository
     ```bash
      Copy
      Edit
      git clone https://github.com/TEJASRI-44/InterviewEase.git
      cd InterviewEase```
2️⃣ Backend Setup (Spring Boot)
```bash
Copy
Edit
cd backend
mvn clean install
mvn spring-boot:run
```
3️⃣ AI Microservice Setup (Flask)
```bash
Copy
Edit
cd ai-service
pip install -r requirements.txt
python app.py
```
4️⃣ Frontend Setup (React.js)
```bash
Copy
Edit
cd frontend
npm install
npm start```
