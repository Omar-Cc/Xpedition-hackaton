# app/api/v1/cv_builder.py
from fastapi import APIRouter, HTTPException
from app.schemas.cv import CVGenerateRequest, CVGenerateResponse
from app.services.cv_service import analyze_job, generate_cv

from app.schemas.cv_job_analyze import JobAnalysisRequest, JobAnalysisResponse

router = APIRouter(prefix="/cv", tags=["cv-builder"])


@router.post("/generate", response_model=CVGenerateResponse)
async def generate(request: CVGenerateRequest):
    try:
        return await generate_cv(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando CV: {str(e)}")
    
@router.post("/analyze-job", response_model=JobAnalysisResponse)
async def analyze(request: JobAnalysisRequest):
    try:
        return await analyze_job(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analizando oferta: {str(e)}")