🚀 ReactUI_Gemini — AI Chat Interface using Gemini LLM

An interactive AI Chat Application built using React (Vite) for the frontend and FastAPI for the backend, powered by Google Gemini 2.5 Flash LLM with Google Search grounding.

🧩 Tech Stack
🔹 Frontend

React (Vite)

Axios

Environment variables via .env

Deployed on Vercel

🔹 Backend

FastAPI

google-genai SDK

Uvicorn

Python-dotenv

Deployed on Render

📦 Folder Structure
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

⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/Bharath8080/ReactUI_Gemini.git
cd ReactUI_Gemini

🧠 Backend Setup (FastAPI + Gemini)
2️⃣ Navigate to Backend Folder
cd backend

3️⃣ Create and Activate Virtual Environment
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # macOS / Linux

4️⃣ Install Dependencies
pip install -r requirements.txt

5️⃣ Create .env File
GEMINI_API_KEY=your_google_gemini_api_key

6️⃣ Run Backend Locally
uvicorn main:app --reload


Backend will run on
👉 http://127.0.0.1:8000

7️⃣ Deploy Backend on Render

Go to Render Dashboard

Create a New Web Service

Connect GitHub repo → select backend

Set:

Build Command: pip install -r requirements.txt

Start Command: uvicorn main:app --host 0.0.0.0 --port 10000

Environment Variables: GEMINI_API_KEY=your_key

Deploy → copy the live backend URL (e.g., https://reactui-gemini-1.onrender.com)

💻 Frontend Setup (React + Vite)
8️⃣ Navigate to Frontend Folder
cd frontend

9️⃣ Install Dependencies
npm install

🔟 Create .env File
VITE_API_URL=https://reactui-gemini-1.onrender.com

1️⃣1️⃣ Run Frontend Locally
npm run dev


Frontend will run on
👉 http://localhost:5173

1️⃣2️⃣ Deploy Frontend on Vercel

Go to Vercel Dashboard

Import GitHub Repo

Set:

Framework Preset: Other

Build Command: npm run build

Output Directory: dist

Install Command: npm install

Environment Variables:
VITE_API_URL=https://reactui-gemini-1.onrender.com

Deploy 🚀

🌐 Live URLs
Component	Platform	URL
Frontend	Vercel	https://react-ui-gemini.vercel.app

Backend	Render	https://reactui-gemini-1.onrender.com
🧩 Features

✅ Conversational UI powered by Gemini LLM
✅ Real-time chat with backend API
✅ Google Search grounding for accurate information
✅ Fully responsive design
✅ Seamless deployment workflow

📜 Environment Variables Summary
Variable	Description	Location
GEMINI_API_KEY	Google Gemini API key	Backend .env
VITE_API_URL	Backend Render URL	Frontend .env
🧪 Testing API Endpoint
Backend Test
curl -X POST https://reactui-gemini-1.onrender.com/chat \
-H "Content-Type: application/json" \
-d '{"message":"Hello Gemini!"}'
