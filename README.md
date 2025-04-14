
# CareConnect – AI-Powered Healthcare Platform 🏥🤖

CareConnect is a full-stack AI-powered healthcare platform developed during AMU Hacks 4.0. It integrates a modern web stack and machine learning to connect patients, doctors, and hospitals through a secure and intelligent interface. It also features ML-based diagnostics to support medical professionals.

---

## 🚀 Features

- 🔒 Role-based authentication for Patients, Doctors, and Hospitals  
- 📅 Appointment scheduling and doctor-patient assignment  
- 🧑‍⚕️ Doctor dashboard for managing appointments and patient data  
- 🏥 Hospital dashboard for viewing doctor activities and patient load  
- 🧠 Machine Learning model for eye disease detection using image classification  
- 📁 Cloud storage using Cloudinary and MongoDB Atlas  
- ⚛️ Fully responsive UI built with React.js  
- 🧪 JWT-based secure authentication and session management  

---

## 🛠️ Tech Stack

### 🌐 Frontend
- React.js
- React Router
- Bootstrap
- Animate.css

### 🧠 Machine Learning
- Python
- TensorFlow
- Keras
- OpenCV
- Flask

### 🔧 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Cloudinary
- Bcrypt

---

## 📁 Project Structure

```
Bot_Coders_AMUHACKS4.0/
├── backend/           # Node.js Backend API
├── frontend/          # React Frontend
├── Machine/           # Python ML Models
└── README.md          # Documentation
```

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/prabhupachisia/Bot_Coders_AMUHACKS4.0.git
cd Bot_Coders_AMUHACKS4.0
```

---

### 2️⃣ Backend Setup (Node.js + Express)

```bash
cd backend
npm install
```

#### Create a `.env` file in the `backend/` directory with the following content:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRATION_MINUTES=60
JWT_REFRESH_EXPIRATION_DAYS=30
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10
CLOUD_API_SECRET=your_cloudinary_api_secret
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_NAME=your_cloudinary_cloud_name
```

> 🔐 **Important:** Do NOT share your real credentials. Keep `.env` in `.gitignore`.

#### Run the Backend Server

```bash
cd ../backend
npm install
npm start
```

Server will run at: `http://localhost:5000`

---

### 3️⃣ Frontend Setup (React.js)

```bash
cd ../frontend
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

---

### 4️⃣ Machine Learning Setup (Flask App)

```bash
cd ../Machine
```

#### Create Python Virtual Environment

```bash
python -m venv venv
```

#### Activate Virtual Environment

- **Windows**:
```bash
venv\Scripts\activate
```

- **macOS/Linux**:
```bash
source venv/bin/activate
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

> ⚠️ Ensure that `my_model.h5` is present in the `Machine/` directory before running.

#### Run the Flask App

```bash
python best.py
```

Flask server runs locally (e.g., `http://127.0.0.1:5001` or as printed in terminal)

---

## 🔐 Environment Variables – Explanation

| Variable                          | Description                                            |
|----------------------------------|--------------------------------------------------------|
| `PORT`                           | Port on which backend server runs                     |
| `MONGODB_URL`                    | Connection string for MongoDB Atlas                   |
| `JWT_SECRET`                     | Secret key for JWT token signing                      |
| `JWT_ACCESS_EXPIRATION_MINUTES` | Time before access token expires                      |
| `JWT_REFRESH_EXPIRATION_DAYS`   | Time before refresh token expires                     |
| `JWT_RESET_PASSWORD_EXPIRATION_MINUTES` | Reset token expiration                    |
| `JWT_VERIFY_EMAIL_EXPIRATION_MINUTES`  | Email verification token expiration         |
| `CLOUD_API_SECRET`              | Cloudinary API secret key                             |
| `CLOUD_API_KEY`                 | Cloudinary API key                                    |
| `CLOUD_NAME`                    | Cloudinary account name                               |

---

## 📦 Running All Modules Together

Open 3 terminals/tabs and run the following in parallel:

### Terminal 1 – Backend

```bash
cd backend
npm start
```

### Terminal 2 – Frontend

```bash
cd frontend
npm start
```

### Terminal 3 – Machine Learning Server

```bash
cd Machine
source venv/bin/activate   # Or venv\Scripts\activate on Windows
python best.py
```

---

## 📸 Demo

[> Video Demo](https://drive.google.com/uc?id=1_0hRvOGTrr9fJ-XSfk_p4kwzlbLfYaOm&export=download)


---

## 🔮 Future Scope

- 📹 Add real-time video consultation with WebRTC
- 🤖 Deploy more ML models (e.g., skin disease, brain scans)
- 📲 Create a mobile app version using React Native or Flutter
- 🔐 Blockchain integration for secure medical history
- 🧬 Symptom checker chatbot using NLP
- 🌍 Internationalization & language support

---

## 🤝 Contributing

We welcome community contributions! To get started:

```bash
1. Fork the repo
2. Create your feature branch: git checkout -b feature/FeatureName
3. Commit your changes: git commit -m "Add new feature"
4. Push to the branch: git push origin feature/FeatureName
5. Open a Pull Request 🚀
```

---

## 🧑‍💻 Team

### 👤 Prabhu Pachisia  
📧 Email: prabhupachisia@gmail.com  
🔗 [GitHub](https://github.com/prabhupachisia)  
🔗 [LinkedIn](https://www.linkedin.com/in/prabhu-pachisia-016804288/)  

---

### 👤 Shreyes Jaiswal  
📧 Email: shreyesjaiswal7@gmail.com  
🔗 [GitHub](https://github.com/shreyes-7)  
🔗 [LinkedIn](https://www.linkedin.com/in/shreyes07/)  

---

### 👤 Abhinav Pandey  
📧 Email: abhinavpandeydel42@gmail.com  
🔗 [GitHub](https://github.com/AbhinavPandey-afk)  
🔗 [LinkedIn](https://www.linkedin.com/in/abhinav-pandey-b0242428b/)  

---

### 👤 Tarun Eldho George  
📧 Email: taruneldho.george2023@vitstudent.ac.in
🔗 [GitHub](https://github.com/typeroo)  
🔗 [LinkedIn](https://www.linkedin.com/in/tarun-george-563260319/)  


---

## 📬 Contact

📧 Email: prabhupachisia@gmail.com 

🔗 GitHub: [https://github.com/prabhupachisia/Bot_Coders_AMUHACKS4.0](https://github.com/prabhupachisia/Bot_Coders_AMUHACKS4.0)

#AMUHACKS 4.0 #CSSAMU #AMU 