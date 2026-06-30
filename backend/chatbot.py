import os
from dotenv import load_dotenv
from google import genai
from prompts import SYSTEM_PROMPT

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_response(message):
    prompt = SYSTEM_PROMPT + "\nUser: " + message

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text