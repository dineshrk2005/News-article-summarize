# AI News Summarizer

## Overview

This is a Flask-based web application that provides AI-powered article summarization services. Users can input either a URL or raw text content, and the application will extract the main content and generate concise summaries using OpenAI's GPT-4o model. The application features a dark-themed Bootstrap interface with options for both URL scraping and direct text input.

## Recent Changes

**August 2025 - Dual AI Integration & Enhanced Features:**
- **Dual AI Support**: Added Google Gemini as backup when OpenAI quota is exceeded
- **Automatic Fallback**: System seamlessly switches between OpenAI GPT-4o and Google Gemini
- **Demo Mode**: Added sample summary page to showcase functionality
- **Enhanced Error Handling**: Intelligent error messaging for API quota and authentication issues
- **Billing Integration**: Direct links and instructions for OpenAI platform billing
- **Improved UX**: Actionable error messages and helpful user guidance

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Flask with Jinja2 templating
- **UI Framework**: Bootstrap 5 with dark theme
- **Styling**: Custom CSS enhancements over Bootstrap base
- **Icons**: Font Awesome 6.0 for visual elements
- **Theme**: Consistent dark theme across all pages with primary/success/info color scheme

### Backend Architecture
- **Web Framework**: Flask with session management
- **Routing**: Single-page application with form-based interactions
- **Error Handling**: Flash message system for user feedback
- **Input Validation**: URL validation using urlparse and text content validation
- **Modular Design**: Separated concerns with dedicated modules for web scraping and AI processing

### Content Processing Pipeline
- **Web Scraping**: Trafilatura library for clean text extraction from URLs
- **Text Processing**: Content cleaning and validation before AI processing
- **AI Summarization**: OpenAI GPT-4o model with structured prompts for consistent summary quality
- **Response Handling**: Comprehensive error handling with user-friendly messaging

### Application Structure
- **Entry Point**: main.py imports Flask app
- **Core Logic**: app.py handles routing, validation, and request processing
- **Web Scraping Module**: web_scraper.py manages URL content extraction
- **AI Integration**: openai_client.py handles OpenAI API communication
- **Templates**: HTML templates with embedded Flask templating for dynamic content
- **Static Assets**: CSS styling and potential future JavaScript enhancements

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for text summarization with temperature control and token limits
- **Authentication**: Environment variable-based API key management

### Web Scraping
- **Trafilatura**: Python library for extracting main text content from web pages
- **URL Processing**: Built-in urllib.parse for URL validation

### Frontend Dependencies
- **Bootstrap 5**: CDN-hosted CSS framework with dark theme variant
- **Font Awesome 6.0**: CDN-hosted icon library for UI enhancements

### Python Libraries
- **Flask**: Web framework with templating and session management
- **OpenAI**: Official Python client for OpenAI API integration
- **Trafilatura**: Web content extraction and cleaning
- **Standard Library**: urllib.parse, os, logging for core functionality

### Environment Configuration
- **OpenAI API Key**: Required environment variable for AI functionality
- **Session Secret**: Configurable secret key for Flask sessions with development fallback