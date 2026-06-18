# 🚀 CareerGenie AI

An AI-powered job recommendation platform that analyzes resumes, matches jobs, detects skill gaps, and generates interview questions.

## ✨ Features

- **Resume Upload** — Drag & drop PDF resume upload
- **Smart Job Matching** — TF-IDF cosine similarity matches your skills to 15+ job roles with a % match score
- **Skill Gap Analyzer** — See exactly which skills you're missing for each role
- **Interview Prep** — Personalized technical + behavioral interview questions

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Python, FastAPI |
| ML/NLP | scikit-learn, TF-IDF, cosine similarity |
| Resume Parsing | pdfplumber, PyPDF2 |
| Frontend | React 18, React Router |
| Styling | Pure CSS (no framework needed) |

---

## 🚀 Quick Start

### Prerequisites

- Python 3.9+ ([download](https://python.org))
- Node.js 18+ ([download](https://nodejs.org))

---

### Option 1: Manual Setup (Recommended for VS Code)

**Step 1 — Backend**

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend
python main.py
```

Backend runs at: http://localhost:8000

**Step 2 — Frontend**

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend opens at: http://localhost:3000

---

### Option 2: Setup Scripts

**Windows:**
```
Double-click setup_windows.bat
```

**Mac/Linux:**
```bash
chmod +x setup_mac_linux.sh
./setup_mac_linux.sh
```

---

## 📁 Project Structure

```
careergenie-ai/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── app/
│   │   ├── parser.py        # PDF resume parsing
│   │   ├── skills.py        # Skill extraction (100+ skills)
│   │   ├── recommender.py   # TF-IDF job matching engine
│   │   └── interview.py     # Interview question generator
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── RecommendJobs.js
│   │   │   ├── SkillGap.js
│   │   │   └── InterviewPrep.js
│   │   └── components/
│   │       ├── Navbar.js
│   │       └── UploadZone.js
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/upload_resume` | Parse resume & extract skills |
| POST | `/recommend_jobs` | Get top job matches |
| POST | `/skill_gap` | Analyze skill gaps |
| POST | `/interview_questions` | Generate interview questions |

Test the API at: http://localhost:8000/docs (Swagger UI auto-generated)

---

## 🎯 How It Works

1. **Resume Parsing** — `pdfplumber` extracts raw text from your PDF
2. **Skill Extraction** — Keyword matching against a 100+ skill database
3. **Job Matching** — TF-IDF vectorization + cosine similarity scores each job
4. **Skill Gap** — Set difference between your skills and required job skills
5. **Interview Prep** — Curated question bank mapped to your detected skills

---

## 🔧 VS Code Tips

1. Install the **Python** extension for backend
2. Install **ES7+ React** extension for frontend
3. Use the built-in terminal split view to run both servers side by side
4. The API docs at `http://localhost:8000/docs` let you test endpoints directly

---

## 🚀 Next Steps to Expand

- Add **Sentence Transformers** for semantic skill matching (smarter than keyword matching)
- Connect a real **job dataset** from Kaggle/LinkedIn
- Add **PostgreSQL** database to store user sessions
- Integrate **OpenAI API** for richer interview question generation
- Deploy to **Render** or **Railway** (free tier)
