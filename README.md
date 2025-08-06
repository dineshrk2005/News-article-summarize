# 🧠 NewsAI Summarizer

An AI-powered web application that fetches, categorizes, and summarizes news articles using natural language processing. The platform lets users explore daily news, get concise summaries, and manage summary history—all in an intuitive, modern interface.

## ✨ Features

- 🔍 Browse news by categories (Technology, Business, Science, World, etc.)
- 🧠 Summarize articles from URLs or pasted text
- 📚 View and manage summary history
- ⚡ Clean, responsive, and interactive UI
- 🧾 User authentication (Login/Signup)
- ✅ Built with React and AI-ready

---

## 🖼️ UI Screenshots

### 🔐 Login Page
![Login Page](https://github.com/dineshrk2005/News-article-summarize/blob/main/Web%20Image/Login%20Page.png?raw=true)

### 🗞️ Daily News
![Daily News](https://github.com/dineshrk2005/News-article-summarize/blob/main/Web%20Image/Daily%20News.png?raw=true)

### 🧠 Summarize Article
![News Summarizer](https://github.com/dineshrk2005/News-article-summarize/blob/main/Web%20Image/News%20Summarizer.png?raw=true)

### 📜 Summary History
![History Page](https://github.com/dineshrk2005/News-article-summarize/blob/main/Web%20Image/History%20Page.png?raw=true)

### 📰 All News
![All News Page](https://github.com/dineshrk2005/News-article-summarize/blob/main/Web%20Image/All%20News%20Page.png?raw=true)

---

## ⚙️ Tech Stack

- **Frontend**: React.js, HTML5, CSS3
- **Backend**: Flask (Python)
- **NLP Tools**: Newspaper3k, Sumy / NLTK
- **Database**: SQLite / MongoDB (based on implementation)
- **Authentication**: Flask-Login

---

## 🛠️ Installation

```bash
git clone https://github.com/dineshrk2005/News-article-summarize.git
cd News-article-summarize

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
