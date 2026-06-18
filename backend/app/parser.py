import io
import pdfplumber
import PyPDF2
import re


def parse_resume(file_bytes: bytes) -> str:
    """
    Extract text from a PDF resume.
    Tries pdfplumber first (better for formatted PDFs),
    falls back to PyPDF2.
    """
    text = ""

    # Method 1: pdfplumber
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        if text.strip():
            return clean_text(text)
    except Exception as e:
        print(f"pdfplumber failed: {e}")

    # Method 2: PyPDF2 fallback
    try:
        reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        if text.strip():
            return clean_text(text)
    except Exception as e:
        print(f"PyPDF2 failed: {e}")

    return ""


def clean_text(text: str) -> str:
    """Clean extracted resume text."""
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove special characters but keep alphanumeric and common punctuation
    text = re.sub(r'[^\w\s\.\,\+\#\-\/\@]', ' ', text)
    return text.strip()
