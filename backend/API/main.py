from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import search, contractor, whistleblower, stalled

app = FastAPI(title="TransparentProcure API", version="1.o")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"],
)

app.include_router(search.router, prefix="/api")
app.include_router(contractor.router, prefix="/api")
app.include_router(whistleblower.router, prefix="/api")
app.include_router(stalled.router, prefix="/api")

@app.get("/")
def root():
    return {"status": "TransparentProcure API is running"}