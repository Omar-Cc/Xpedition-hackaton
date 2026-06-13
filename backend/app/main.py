# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import cv_builder

app = FastAPI(title="EmpléaUTP API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # tu frontend Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cv_builder.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"status": "ok", "service": "EmpléaUTP API"}