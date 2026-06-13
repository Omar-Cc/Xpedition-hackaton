import json
from app.core.ai_client import client
from app.core.config import settings
#CV-Generator
from app.prompts.cv_prompts import CV_SYSTEM_PROMPT, CV_USER_PROMPT_TEMPLATE
from app.schemas.cv import CVGenerateRequest, CVGenerateResponse
# CV-Analyzer
from app.schemas.cv_job_analyze import JobAnalysisRequest, JobAnalysisResponse
from app.prompts.cv_analyze_prompt import JOB_ANALYSIS_USER_PROMPT_TEMPLATE, JOB_ANALYSIS_SYSTEM_PROMPT

async def generate_cv(request: CVGenerateRequest) -> CVGenerateResponse:
    profile_json = request.profile.model_dump_json(indent=2)

    user_prompt = CV_USER_PROMPT_TEMPLATE.format(
        profile_json=profile_json,
        job_description=request.job_description,
    )

    response = await client.chat.completions.create(
        model=settings.model_name,
        messages=[
            {"role": "system", "content": CV_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},  # fuerza JSON válido
        temperature=0.7,
        max_tokens=2000,
    )

    raw_text = response.choices[0].message.content
    data = json.loads(raw_text)
    return CVGenerateResponse(**data)

async def analyze_job(request: JobAnalysisRequest) -> JobAnalysisResponse:
    profile_json = request.profile.model_dump_json(indent=2)

    user_prompt = JOB_ANALYSIS_USER_PROMPT_TEMPLATE.format(
        profile_json=profile_json,
        job_description=request.job_description,
    )

    response = await client.chat.completions.create(
        model=settings.model_name,
        messages=[
            {"role": "system", "content": JOB_ANALYSIS_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},
        temperature=0.5,
        max_tokens=800,
    )

    data = json.loads(response.choices[0].message.content)
    return JobAnalysisResponse(**data)