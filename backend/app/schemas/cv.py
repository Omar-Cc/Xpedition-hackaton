# app/schemas/cv.py
from pydantic import BaseModel
from typing import Optional

class Education(BaseModel):
    institution: str
    degree: str
    start_date: str
    end_date: Optional[str] = None


class Experience(BaseModel):
    company: str
    role: str
    start_date: str
    end_date: Optional[str] = None
    description: str


class StudentProfile(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    career: str
    cycle: int
    education: list[Education]
    experience: list[Experience] = []
    skills: list[str] = []
    languages: list[str] = []


class CVGenerateRequest(BaseModel):
    profile: StudentProfile
    job_description: str  # texto de la vacante a la que postula


class CVSection(BaseModel):
    title: str
    content: str


class CVGenerateResponse(BaseModel):
    summary: str
    sections: list[CVSection]
    matched_keywords: list[str]
    suggestions: list[str]