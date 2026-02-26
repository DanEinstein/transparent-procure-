from fastapi import APIRouter
from pydantic import BaseModel
import uuid
import json
from datetime import datetime

router = APIRouter()

# Defining the model WhistleBlow with its attributes
class WhistleBlow(BaseModel):
    project_ref: str
    description: str
    evidence_url: str | None = None

@router.post("/whistle-blower")
def submit_whistleblower(data: WhistleBlow):
    ref = str(uuid.uuid4())[:8]

    entry = {
        "ref": ref,
        "timestamp": datetime.utcnow().isoformat(),
        "project_ref": data.project_ref,
        "description": data.description,
        "evidence_url": data.evidence_url
    }

    with open("data/whistleblower_log.json", "a") as f:
        f.write(json.dumps(entry) + "\n")

    return {"ref_number": ref}
