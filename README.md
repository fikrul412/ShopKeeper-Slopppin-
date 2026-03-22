### 🛍️ ShopKeeper-Slopppin — Setup Guide

A simple experiment using LangChain and Gemini to create an interactive AI shopkeeper that returns structured data.
<img width="1366" height="726" alt="image" src="https://github.com/user-attachments/assets/a05c762a-3f25-4173-ace6-615d77ba3ef6" />

---

## 1. BACKEND SETUP (Python)

1. Install the required libraries:
   ```bash
   pip install flask flask-cors langchain-google-genai pydantic python-dotenv
   ```

2. Set up your API key:  
   Create a file named `.env` in the server folder and add:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

3. Start the server:
   ```bash
   python main.py
   ```

---

## 2. FRONTEND SETUP (React + Vite)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

---

## 3. HOW TO USE

1. Open the web.
2. Enter your **Username** and a **Product** (e.g., Bread).
3. Click **Submit** to see the AI's flustered response and live stats.

---

## TECH STACK

- **Frontend:** React (Vite), TypeScript, Axios  
- **Backend:** Flask, LangChain, Google Gemini API  
- **Logic:** Pydantic for structured JSON parsing  

---

