from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()

# Define request body
class ChatRequest(BaseModel):
    message: str

# Initialize FastAPI
app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace * with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY")) 

# ✅ Add Google Search grounding tool
grounding_tool = types.Tool(
    google_search=types.GoogleSearch()
)

config = types.GenerateContentConfig(
    tools=[grounding_tool]
)

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        if not req.message:
            raise HTTPException(status_code=400, detail="Message field is required")

        # Generate content using Gemini
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=req.message,
            config=config,
        )

        return {"reply": response.text}

    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
