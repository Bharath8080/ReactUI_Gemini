# 🚀 ReactUI_Gemini — AI Chat Interface

An interactive AI Chat Application built with **React (Vite)** for the frontend and **FastAPI** for the backend, powered by **Google Gemini 2.5 Flash LLM** with Google Search grounding.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python)

---

## 🧩 Tech Stack

### 🔹 Frontend
- **React** (Vite)
- **Axios** for API requests
- Environment variables via `.env`
- Deployed on **Vercel**

### 🔹 Backend
- **FastAPI**
- **google-genai** SDK
- **Uvicorn** ASGI server
- **Python-dotenv** for environment management
- Deployed on **Render**

---

## 📦 Folder Structure

```
ReactUI_Gemini/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Bharath8080/ReactUI_Gemini.git
cd ReactUI_Gemini
```

---

## 🧠 Backend Setup (FastAPI + Gemini)

### 2️⃣ Navigate to Backend Folder

```bash
cd backend
```

### 3️⃣ Create and Activate Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

### 4️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 5️⃣ Create `.env` File

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

> **Note:** Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 6️⃣ Run Backend Locally

```bash
uvicorn main:app --reload
```

Backend will run on 👉 **http://127.0.0.1:8000**

### 7️⃣ Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Create a **New Web Service**
3. Connect your GitHub repository → select `backend` folder
4. Configure settings:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 10000`
   - **Environment Variables:** `GEMINI_API_KEY=your_key`
5. Deploy and copy the live backend URL (e.g., `https://reactui-gemini-1.onrender.com`)

---

## 💻 Frontend Setup (React + Vite)

### 8️⃣ Navigate to Frontend Folder

```bash
cd ../frontend
```

### 9️⃣ Install Dependencies

```bash
npm install
```

### 🔟 Create `.env` File

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=https://reactui-gemini-1.onrender.com
```

### 1️⃣1️⃣ Run Frontend Locally

```bash
npm run dev
```

Frontend will run on 👉 **http://localhost:5173**

### 1️⃣2️⃣ Deploy Frontend on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Import Project** and connect your GitHub repository
3. Configure settings:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Add Environment Variable:
   - `VITE_API_URL=https://reactui-gemini-1.onrender.com`
5. Deploy 🚀

---

## 🌐 Live URLs

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend  | Vercel   | [https://react-ui-gemini.vercel.app](https://react-ui-gemini.vercel.app) |
| Backend   | Render   | [https://reactui-gemini-1.onrender.com](https://reactui-gemini-1.onrender.com) |

---

## 🧩 Features

✅ Conversational UI powered by **Gemini 2.5 Flash LLM**  
✅ Real-time chat with backend API  
✅ **Google Search grounding** for accurate information  
✅ Fully responsive design  
✅ Seamless deployment workflow  
✅ Environment-based configuration  

---

## 📜 Environment Variables Summary

| Variable | Description | Location |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | `backend/.env` |
| `VITE_API_URL` | Backend Render URL | `frontend/.env` |

---

## 🧪 Testing

### Backend API Test

Test the backend endpoint using curl:

```bash
curl -X POST https://reactui-gemini-1.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello Gemini!"}'
```

### Expected Response

```json
{
  "response": "Hello! How can I assist you today?"
}
```

---

## 🛠️ Development Scripts

### Backend

```bash
# Run in development mode
uvicorn main:app --reload

# Run in production
uvicorn main:app --host 0.0.0.0 --port 10000
```

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Bharath**  
GitHub: [@Bharath8080](https://github.com/Bharath8080)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for the powerful LLM
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent backend framework
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) for the modern frontend stack
- [Vercel](https://vercel.com/) and [Render](https://render.com/) for seamless deployment

---

## 📞 Support

If you encounter any issues or have questions:

- Open an [Issue](https://github.com/Bharath8080/ReactUI_Gemini/issues)
- Contact: [Your Email/Social]

---

<div align="center">
  
**⭐ Star this repo if you found it helpful!**

Made with ❤️ by Bharath

</div>
