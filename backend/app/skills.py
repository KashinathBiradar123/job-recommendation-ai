import re
from typing import List

# Comprehensive tech skills database
SKILLS_DATABASE = [
    # Programming Languages
    "Python", "Java", "JavaScript", "TypeScript", "C", "C++", "C#", "Go", "Rust",
    "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R", "MATLAB", "Perl", "Bash",
    "Shell", "PowerShell", "Dart", "Lua", "Haskell", "Elixir", "Erlang",

    # Web Frameworks & Libraries
    "React", "Angular", "Vue", "Next.js", "Nuxt.js", "Svelte", "Django",
    "Flask", "FastAPI", "Spring", "Spring Boot", "Express", "Node.js",
    "Laravel", "Rails", "ASP.NET", "Gatsby", "Redux", "GraphQL", "REST",
    "Tailwind", "Bootstrap", "jQuery", "Three.js",

    # Data Science & ML
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
    "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "XGBoost",
    "LightGBM", "CatBoost", "Hugging Face", "OpenCV", "NLTK", "spaCy",
    "Transformers", "BERT", "GPT", "LLM", "RAG", "LangChain",

    # Data Engineering & Analytics
    "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Power BI",
    "Tableau", "Excel", "Google Analytics", "Looker", "dbt",
    "Apache Spark", "Hadoop", "Kafka", "Airflow", "Flink", "Hive",
    "PySpark", "ETL", "Data Warehousing", "Data Pipelines",

    # Databases
    "SQL", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis",
    "Cassandra", "Elasticsearch", "DynamoDB", "Oracle", "SQL Server",
    "Neo4j", "InfluxDB", "Snowflake", "BigQuery", "Redshift",

    # Cloud & DevOps
    "AWS", "Azure", "GCP", "Google Cloud", "Docker", "Kubernetes",
    "Terraform", "Ansible", "Jenkins", "GitHub Actions", "CircleCI",
    "GitLab CI", "CI/CD", "Helm", "Prometheus", "Grafana", "Linux",
    "Nginx", "Apache", "Serverless",

    # Tools & Platforms
    "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence",
    "Slack", "Postman", "VS Code", "IntelliJ", "Eclipse",
    "Jupyter", "Colab", "MLflow", "Weights & Biases",

    # Soft Skills & Methodologies
    "Agile", "Scrum", "Kanban", "DevOps", "Microservices",
    "System Design", "API Design", "TDD", "BDD", "OOP", "Functional Programming",

    # Mobile
    "iOS", "Android", "React Native", "Flutter", "Xamarin",

    # Security
    "Cybersecurity", "Penetration Testing", "OWASP", "OAuth", "JWT",
    "SSL", "TLS", "Cryptography", "Network Security",
]

# Normalize skills for case-insensitive matching
SKILLS_LOWER = {s.lower(): s for s in SKILLS_DATABASE}


def extract_skills(text: str) -> List[str]:
    """
    Extract skills from resume text using keyword matching.
    Returns a deduplicated, sorted list of skills found.
    """
    if not text:
        return []

    found_skills = set()
    text_lower = text.lower()

    for skill_lower, skill_original in SKILLS_LOWER.items():
        # Use word boundary matching to avoid partial matches
        pattern = r'\b' + re.escape(skill_lower) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.add(skill_original)

    return sorted(list(found_skills))


def get_skill_categories(skills: List[str]) -> dict:
    """Categorize extracted skills."""
    categories = {
        "Languages": [],
        "Frameworks": [],
        "Data & ML": [],
        "Cloud & DevOps": [],
        "Databases": [],
        "Tools": [],
        "Other": []
    }

    lang_skills = {"Python", "Java", "JavaScript", "TypeScript", "C", "C++", "C#",
                   "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R"}
    framework_skills = {"React", "Angular", "Vue", "Next.js", "Django", "Flask",
                        "FastAPI", "Spring", "Express", "Node.js", "Laravel"}
    ml_skills = {"Machine Learning", "Deep Learning", "NLP", "TensorFlow", "PyTorch",
                 "Keras", "Scikit-learn", "Pandas", "NumPy", "XGBoost"}
    cloud_skills = {"AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform",
                    "Jenkins", "CI/CD", "Linux"}
    db_skills = {"SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch",
                 "DynamoDB", "Oracle", "Snowflake"}
    tool_skills = {"Git", "GitHub", "Jira", "Postman", "Jupyter", "VS Code"}

    for skill in skills:
        if skill in lang_skills:
            categories["Languages"].append(skill)
        elif skill in framework_skills:
            categories["Frameworks"].append(skill)
        elif skill in ml_skills:
            categories["Data & ML"].append(skill)
        elif skill in cloud_skills:
            categories["Cloud & DevOps"].append(skill)
        elif skill in db_skills:
            categories["Databases"].append(skill)
        elif skill in tool_skills:
            categories["Tools"].append(skill)
        else:
            categories["Other"].append(skill)

    return {k: v for k, v in categories.items() if v}
