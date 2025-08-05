import os
import google.generativeai as genai

# Configure Google AI with API key
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
    # Initialize the Gemini model
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None

def summarize_article_with_google(text):
    """
    Summarize the given article text using Google's Gemini AI model.
    Returns a concise summary while maintaining key points.
    """
    if not model:
        raise Exception("Google AI not configured. Please check your GOOGLE_API_KEY.")
    
    try:
        prompt = f"""Please provide a clear, concise summary of the following article. 
        Focus on the main points, key facts, and important conclusions. 
        Keep the summary informative but significantly shorter than the original:

        {text}"""
        
        response = model.generate_content(prompt)
        return response.text.strip() if response.text else ""
    
    except Exception as e:
        error_msg = str(e)
        if "quota" in error_msg.lower() or "limit" in error_msg.lower():
            raise Exception("Google AI API quota exceeded. Please check your usage limits.")
        elif "api_key" in error_msg.lower() or "unauthorized" in error_msg.lower():
            raise Exception("Invalid Google API key. Please check your API key settings.")
        else:
            raise Exception(f"Failed to summarize with Google AI: {error_msg}")