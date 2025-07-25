from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import base64
import os
from dotenv import load_dotenv

app = FastAPI()

# ✅ CORS so frontend at Vite (localhost:5173) can access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Request model
class PromptRequest(BaseModel):
    prompt: str

# 🔹 ClipDrop API key (you should hide this later using dotenv or env vars)
load_dotenv()  # Load environment variables from .env file
CLIPDROP_API_KEY = os.getenv("CLIPDROP_API_KEY")

@app.post("/generate-visual-aid")
async def generate_visual_aid(data: PromptRequest):
    headers = {
        "x-api-key": CLIPDROP_API_KEY,
    }

    payload = {
        "prompt": data.prompt,
    }

    try:
        response = requests.post(
            "https://clipdrop-api.co/text-to-image/v1",
            headers=headers,
            json=payload
        )

        print("ClipDrop response status:", response.status_code)

        # If image is returned successfully
        if response.status_code == 200 and response.headers["Content-Type"].startswith("image"):
            image_base64 = base64.b64encode(response.content).decode("utf-8")
            return {"image": image_base64}
        else:
            # Print and return error details
            print("ClipDrop error:", response.text)
            return {"error": f"ClipDrop API error: {response.status_code} - {response.text}"}

    except Exception as e:
        print("Exception occurred:", str(e))
        return {"error": f"Exception: {str(e)}"}
