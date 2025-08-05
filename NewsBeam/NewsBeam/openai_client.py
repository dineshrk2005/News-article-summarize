import os
from openai import OpenAI
from google_ai_client import summarize_article_with_google

# the newest OpenAI model is "gpt-4o" which was released May 13, 2024.
# do not change this unless explicitly requested by the user
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
openai = OpenAI(api_key=OPENAI_API_KEY)


def summarize_article(text):
    """
    Summarize the given article text using AI models.
    First tries OpenAI's GPT-4o, then falls back to Google's Gemini if needed.
    Returns a concise summary while maintaining key points.
    """
    # Try OpenAI first
    try:
        prompt = f"""Please provide a clear, concise summary of the following article. 
        Focus on the main points, key facts, and important conclusions. 
        Keep the summary informative but significantly shorter than the original:

        {text}"""
        
        response = openai.chat.completions.create(
            model="gpt-4o",  # the newest OpenAI model is "gpt-4o"
            messages=[
                {
                    "role": "system", 
                    "content": "You are an expert news summarizer. Create clear, concise summaries that capture the essential information while being much shorter than the original text."
                },
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )
        content = response.choices[0].message.content
        return content.strip() if content is not None else ""
    
    except Exception as openai_error:
        error_msg = str(openai_error)
        
        # If OpenAI fails due to quota/billing, try Google AI as backup
        if "429" in error_msg or "quota" in error_msg.lower():
            try:
                print("OpenAI quota exceeded, trying Google AI...")
                result = summarize_article_with_google(text)
                return f"[Powered by Google AI] {result}"
            except Exception as google_error:
                raise Exception(f"Both AI services failed. OpenAI: quota exceeded. Google: {str(google_error)}")
        
        elif "401" in error_msg or "unauthorized" in error_msg.lower():
            raise Exception("Invalid OpenAI API key. Please check your API key settings.")
        else:
            # For other OpenAI errors, try Google AI as backup
            try:
                print(f"OpenAI error ({error_msg}), trying Google AI...")
                result = summarize_article_with_google(text)
                return f"[Powered by Google AI] {result}"
            except Exception as google_error:
                raise Exception(f"Both AI services failed. OpenAI: {error_msg}. Google: {str(google_error)}")
