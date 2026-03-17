import os
import google.generativeai as genai
from config import get_settings

def test_models():
    settings = get_settings()
    print(f"Using API Key: {settings.gemini_api_key[:4]}...{settings.gemini_api_key[-4:]}")
    genai.configure(api_key=settings.gemini_api_key)
    
    try:
        print("Listing models...")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
    except Exception as e:
        print(f"Error listing models: {type(e).__name__}: {str(e)}")

if __name__ == "__main__":
    test_models()
