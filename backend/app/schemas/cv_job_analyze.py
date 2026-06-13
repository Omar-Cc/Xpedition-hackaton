from pydantic import BaseModel
from .cv import StudentProfile

class SkillMatch(BaseModel):
    skill: str
    covered: bool


class JobAnalysisRequest(BaseModel):
    profile: StudentProfile
    job_description: str


class JobAnalysisResponse(BaseModel):
    keywords: list[str]
    skill_matches: list[SkillMatch]