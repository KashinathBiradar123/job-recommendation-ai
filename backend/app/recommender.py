from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict
import json
import os


# --- Sample Job Dataset (embedded so no external files needed) ---
JOBS_DATA = [
    {
        "id": 1,
        "title": "Data Scientist",
        "company": "TechCorp Inc.",
        "location": "Remote",
        "salary": "$90,000 - $130,000",
        "experience": "2-5 years",
        "skills": ["Python", "Machine Learning", "TensorFlow", "SQL", "Pandas", "NumPy", "Scikit-learn", "Statistics"],
        "description": "Build and deploy ML models for business insights."
    },
    {
        "id": 2,
        "title": "Machine Learning Engineer",
        "company": "AI Innovations Ltd.",
        "location": "San Francisco, CA",
        "salary": "$120,000 - $180,000",
        "experience": "3-6 years",
        "skills": ["Python", "PyTorch", "TensorFlow", "Docker", "Kubernetes", "MLflow", "AWS", "REST"],
        "description": "Design scalable ML infrastructure and pipelines."
    },
    {
        "id": 3,
        "title": "Backend Developer",
        "company": "StartupXYZ",
        "location": "Remote",
        "salary": "$80,000 - $110,000",
        "experience": "1-3 years",
        "skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "SQL", "Git"],
        "description": "Build robust REST APIs and backend services."
    },
    {
        "id": 4,
        "title": "Full Stack Developer",
        "company": "WebAgency Co.",
        "location": "New York, NY",
        "salary": "$85,000 - $120,000",
        "experience": "2-4 years",
        "skills": ["JavaScript", "React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Git", "REST"],
        "description": "Build end-to-end web applications."
    },
    {
        "id": 5,
        "title": "Data Engineer",
        "company": "DataFlow Corp",
        "location": "Remote",
        "salary": "$100,000 - $140,000",
        "experience": "2-5 years",
        "skills": ["Python", "Apache Spark", "Kafka", "Airflow", "SQL", "AWS", "PostgreSQL", "ETL"],
        "description": "Design and maintain large-scale data pipelines."
    },
    {
        "id": 6,
        "title": "DevOps Engineer",
        "company": "CloudFirst Systems",
        "location": "Austin, TX",
        "salary": "$95,000 - $135,000",
        "experience": "2-5 years",
        "skills": ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "CI/CD", "Linux", "Python"],
        "description": "Manage infrastructure and deployment pipelines."
    },
    {
        "id": 7,
        "title": "Frontend Developer",
        "company": "DesignTech Studio",
        "location": "Remote",
        "salary": "$70,000 - $100,000",
        "experience": "1-3 years",
        "skills": ["JavaScript", "React", "TypeScript", "CSS", "Next.js", "Git", "Redux", "REST"],
        "description": "Build responsive and accessible web interfaces."
    },
    {
        "id": 8,
        "title": "NLP Engineer",
        "company": "LanguageAI",
        "location": "Boston, MA",
        "salary": "$110,000 - $160,000",
        "experience": "3-5 years",
        "skills": ["Python", "NLP", "BERT", "Transformers", "spaCy", "PyTorch", "Hugging Face", "SQL"],
        "description": "Build NLP models for text understanding and generation."
    },
    {
        "id": 9,
        "title": "Cloud Solutions Architect",
        "company": "Enterprise Cloud",
        "location": "Chicago, IL",
        "salary": "$130,000 - $180,000",
        "experience": "5-8 years",
        "skills": ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Docker", "Python", "System Design"],
        "description": "Design enterprise cloud architecture solutions."
    },
    {
        "id": 10,
        "title": "Software Engineer",
        "company": "BigTech Inc.",
        "location": "Seattle, WA",
        "salary": "$110,000 - $160,000",
        "experience": "2-5 years",
        "skills": ["Python", "Java", "SQL", "Git", "Docker", "REST", "Agile", "System Design"],
        "description": "Build scalable software systems."
    },
    {
        "id": 11,
        "title": "Android Developer",
        "company": "MobileFirst",
        "location": "Remote",
        "salary": "$85,000 - $120,000",
        "experience": "2-4 years",
        "skills": ["Kotlin", "Java", "Android", "REST", "SQL", "Git", "Docker"],
        "description": "Build native Android applications."
    },
    {
        "id": 12,
        "title": "iOS Developer",
        "company": "AppFactory",
        "location": "San Jose, CA",
        "salary": "$90,000 - $130,000",
        "experience": "2-4 years",
        "skills": ["Swift", "iOS", "Xcode", "REST", "Git", "SQL"],
        "description": "Build high-quality iOS applications."
    },
    {
        "id": 13,
        "title": "Security Engineer",
        "company": "SecureNet",
        "location": "Washington, DC",
        "salary": "$100,000 - $150,000",
        "experience": "3-6 years",
        "skills": ["Cybersecurity", "Python", "Linux", "Network Security", "AWS", "Docker", "OAuth"],
        "description": "Protect systems and data from security threats."
    },
    {
        "id": 14,
        "title": "Database Administrator",
        "company": "DataSystems Inc.",
        "location": "Remote",
        "salary": "$80,000 - $115,000",
        "experience": "2-5 years",
        "skills": ["SQL", "PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "Python"],
        "description": "Manage and optimize database systems."
    },
    {
        "id": 15,
        "title": "Research Scientist (AI)",
        "company": "AI Research Lab",
        "location": "Cambridge, MA",
        "salary": "$130,000 - $200,000",
        "experience": "PhD + 2 years",
        "skills": ["Python", "PyTorch", "Deep Learning", "NLP", "Machine Learning", "Research", "Mathematics", "Statistics"],
        "description": "Conduct cutting-edge AI/ML research."
    }
]


def recommend_jobs(user_skills: List[str], top_n: int = 5) -> List[Dict]:
    """
    Recommend jobs based on user skills using TF-IDF cosine similarity.
    """
    if not user_skills:
        return []

    user_skills_text = " ".join(user_skills)

    # Prepare job skill texts
    job_texts = [" ".join(job["skills"]) for job in JOBS_DATA]

    # Add user skills to corpus for vectorization
    all_texts = [user_skills_text] + job_texts

    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer(lowercase=True, stop_words=None)
    tfidf_matrix = vectorizer.fit_transform(all_texts)

    # Cosine similarity between user and all jobs
    user_vector = tfidf_matrix[0]
    job_vectors = tfidf_matrix[1:]
    similarities = cosine_similarity(user_vector, job_vectors).flatten()

    # Get top N job indices
    top_indices = similarities.argsort()[::-1][:top_n]

    results = []
    for idx in top_indices:
        job = JOBS_DATA[idx].copy()
        match_score = round(float(similarities[idx]) * 100, 1)
        job["match_score"] = match_score
        job["match_level"] = classify_match(match_score)
        results.append(job)

    return results


def classify_match(score: float) -> str:
    if score >= 75:
        return "Excellent"
    elif score >= 50:
        return "Good"
    elif score >= 25:
        return "Fair"
    else:
        return "Low"


def get_skill_gap(user_skills: List[str], top_jobs: List[Dict]) -> List[Dict]:
    """
    Compute skill gaps between user skills and top job requirements.
    """
    user_skills_set = set(s.lower() for s in user_skills)
    gaps = []

    for job in top_jobs:
        required = job.get("skills", [])
        missing = [s for s in required if s.lower() not in user_skills_set]
        matched = [s for s in required if s.lower() in user_skills_set]

        gaps.append({
            "job_title": job["title"],
            "company": job["company"],
            "match_score": job.get("match_score", 0),
            "required_skills": required,
            "matched_skills": matched,
            "missing_skills": missing,
            "gap_percentage": round(len(missing) / len(required) * 100) if required else 0
        })

    return gaps
