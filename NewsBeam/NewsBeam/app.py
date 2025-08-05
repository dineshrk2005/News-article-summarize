import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
from urllib.parse import urlparse
import traceback

from web_scraper import get_website_text_content
from openai_client import summarize_article

# Configure logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

def is_valid_url(url):
    """Check if the provided string is a valid URL"""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

def clean_text(text):
    """Clean and validate text input"""
    if not text:
        return None
    text = text.strip()
    if len(text) < 10:
        return None
    return text

@app.route('/', methods=['GET', 'POST'])
def index():
    """Main page with input form"""
    if request.method == 'POST':
        try:
            input_type = request.form.get('input_type')
            
            if input_type == 'url':
                url = request.form.get('url', '').strip()
                
                if not url:
                    flash('Please enter a valid URL', 'error')
                    return render_template('index.html')
                
                if not is_valid_url(url):
                    flash('Please enter a valid URL (including http:// or https://)', 'error')
                    return render_template('index.html')
                
                # Extract article content from URL
                try:
                    article_content = get_website_text_content(url)
                    if not article_content or len(article_content.strip()) < 50:
                        flash('Could not extract meaningful content from this URL. Please try a different article.', 'error')
                        return render_template('index.html')
                    
                    original_text = article_content
                    source = url
                    
                except Exception as e:
                    logging.error(f"Error extracting content from URL {url}: {str(e)}")
                    flash('Failed to extract content from the provided URL. Please check the URL and try again.', 'error')
                    return render_template('index.html')
            
            elif input_type == 'text':
                text_input = request.form.get('text_input', '')
                cleaned_text = clean_text(text_input)
                
                if not cleaned_text:
                    flash('Please enter at least 10 characters of text to summarize', 'error')
                    return render_template('index.html')
                
                original_text = cleaned_text
                source = 'Direct text input'
            
            else:
                flash('Please select either URL or text input', 'error')
                return render_template('index.html')
            
            # Generate summary using OpenAI
            try:
                summary = summarize_article(original_text)
                if not summary:
                    flash('Failed to generate summary. Please try again.', 'error')
                    return render_template('index.html')
                
                return render_template('result.html', 
                                     original_text=original_text,
                                     summary=summary,
                                     source=source,
                                     word_count_original=len(original_text.split()),
                                     word_count_summary=len(summary.split()))
                
            except Exception as e:
                logging.error(f"Error generating summary: {str(e)}")
                error_message = str(e)
                if "quota exceeded" in error_message.lower():
                    flash('OpenAI API quota exceeded. Please add credits at platform.openai.com/billing', 'error')
                elif "invalid" in error_message.lower() and "api key" in error_message.lower():
                    flash('Invalid OpenAI API key. Please check your API key in the secrets.', 'error')
                else:
                    flash(f'Failed to generate summary: {error_message}', 'error')
                return render_template('index.html')
                
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            logging.error(traceback.format_exc())
            flash('An unexpected error occurred. Please try again.', 'error')
            return render_template('index.html')
    
    return render_template('index.html')

@app.route('/new')
def new_summary():
    """Route to start a new summary"""
    return redirect(url_for('index'))

@app.route('/demo')
def demo():
    """Demo page showing sample summary results"""
    return render_template('demo.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
