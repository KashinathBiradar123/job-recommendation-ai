from typing import List, Dict


# Pre-built question bank per skill/domain
QUESTION_BANK = {
    "Python": [
        "What are Python decorators and how do you use them?",
        "Explain the difference between a list and a tuple in Python.",
        "What is the GIL (Global Interpreter Lock) and how does it affect multithreading?",
        "How does memory management work in Python?",
        "What are generators and when would you use them over lists?",
    ],
    "Machine Learning": [
        "Explain the bias-variance tradeoff.",
        "What is the difference between bagging and boosting?",
        "How do you handle class imbalance in a dataset?",
        "Explain overfitting and how you would prevent it.",
        "What is cross-validation and why is it important?",
    ],
    "Deep Learning": [
        "Explain how backpropagation works.",
        "What is vanishing gradient and how do you solve it?",
        "Explain the architecture of a Convolutional Neural Network.",
        "What is the difference between RNN, LSTM, and GRU?",
        "How do Transformer models work?",
    ],
    "SQL": [
        "What is the difference between INNER JOIN and LEFT JOIN?",
        "Explain database normalization (1NF, 2NF, 3NF).",
        "How do you optimize a slow SQL query?",
        "What is an index and when should you use one?",
        "What is the difference between WHERE and HAVING clauses?",
    ],
    "Docker": [
        "What is the difference between a Docker image and a container?",
        "How do Docker volumes work?",
        "What is Docker Compose and when would you use it?",
        "Explain the concept of a multi-stage Docker build.",
        "How do you debug a running Docker container?",
    ],
    "AWS": [
        "What is the difference between EC2 and Lambda?",
        "Explain S3 storage classes.",
        "What is VPC and why is it important?",
        "How does auto-scaling work in AWS?",
        "What is the difference between SQS and SNS?",
    ],
    "React": [
        "What is the Virtual DOM and how does React use it?",
        "Explain the difference between useState and useReducer.",
        "What are React hooks and why were they introduced?",
        "How does the useEffect hook work?",
        "What is prop drilling and how can you avoid it?",
    ],
    "JavaScript": [
        "Explain event bubbling and capturing.",
        "What is the difference between var, let, and const?",
        "What are Promises and how do they work?",
        "Explain the concept of closures.",
        "What is the difference between == and ===?",
    ],
    "System Design": [
        "How would you design a URL shortener like bit.ly?",
        "Explain the CAP theorem.",
        "What is horizontal vs vertical scaling?",
        "How would you design a distributed cache?",
        "What is eventual consistency?",
    ],
}

# Generic HR questions for all candidates
HR_QUESTIONS = [
    "Tell me about yourself and your background.",
    "Why are you interested in this role?",
    "Describe a challenging project you worked on and how you overcame the difficulties.",
    "Where do you see yourself in 5 years?",
    "How do you handle working under pressure or tight deadlines?",
    "Tell me about a time you disagreed with a team member. How did you resolve it?",
    "What are your greatest strengths and areas for improvement?",
]


def generate_interview_questions(skills: List[str]) -> Dict:
    """
    Generate relevant interview questions based on extracted skills.
    """
    technical_questions = []
    covered_skills = []

    for skill in skills:
        if skill in QUESTION_BANK:
            questions = QUESTION_BANK[skill][:3]  # Take top 3 per skill
            for q in questions:
                technical_questions.append({
                    "skill": skill,
                    "question": q,
                    "type": "Technical"
                })
            covered_skills.append(skill)

    # If no matching skills found, return general questions
    if not technical_questions:
        technical_questions = [
            {"skill": "General", "question": "Explain a project where you applied your technical skills.", "type": "Technical"},
            {"skill": "General", "question": "What technologies are you most comfortable with?", "type": "Technical"},
            {"skill": "General", "question": "How do you stay updated with the latest trends in technology?", "type": "Technical"},
        ]

    hr_questions_formatted = [
        {"skill": "HR", "question": q, "type": "Behavioral"}
        for q in HR_QUESTIONS
    ]

    return {
        "technical": technical_questions,
        "behavioral": hr_questions_formatted,
        "covered_skills": covered_skills,
        "total_questions": len(technical_questions) + len(hr_questions_formatted)
    }
