from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os

from app.parser import parse_resume
from app.skills import extract_skills
from app.recommender import recommend_jobs, get_skill_gap
from app.interview import generate_interview_questions

app = FastAPI(
    title="CareerGenie AI",
    description="AI-powered job recommendation platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "CareerGenie AI is running 🚀"}


@app.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    """Upload a resume PDF and extract skills."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    contents = await file.read()
    text = parse_resume(contents)

    if not text:
        raise HTTPException(status_code=422, detail="Could not extract text from PDF.")

    skills = extract_skills(text)

    return {
        "filename": file.filename,
        "extracted_text_preview": text[:500],
        "skills": skills,
        "skill_count": len(skills)
    }


@app.post("/recommend_jobs")
async def recommend_jobs_endpoint(file: UploadFile = File(...)):
    """Upload resume and get job recommendations."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    contents = await file.read()
    text = parse_resume(contents)
    skills = extract_skills(text)
    recommendations = recommend_jobs(skills)

    return {
        "skills": skills,
        "recommendations": recommendations
    }


@app.post("/skill_gap")
async def skill_gap_endpoint(file: UploadFile = File(...)):
    """Analyze skill gaps for top job matches."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    contents = await file.read()
    text = parse_resume(contents)
    skills = extract_skills(text)
    recommendations = recommend_jobs(skills)
    gaps = get_skill_gap(skills, recommendations[:3])

    return {
        "user_skills": skills,
        "top_jobs": recommendations[:3],
        "skill_gaps": gaps
    }


@app.post("/interview_questions")
async def interview_questions_endpoint(file: UploadFile = File(...)):
    """Generate interview questions based on resume."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    contents = await file.read()
    text = parse_resume(contents)
    skills = extract_skills(text)
    questions = generate_interview_questions(skills)

    return {
        "skills": skills,
        "questions": questions
    }


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
