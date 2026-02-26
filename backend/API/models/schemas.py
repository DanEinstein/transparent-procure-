# Here I'll be creating the models(Entities) for the API including their attributes too

from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# Now the models
class RiskFlag(BaseModel):
    type: str
    severity: str

class ContractorBase(BaseModel):
    id: int
    name: str
    kra_pin: str
    registration_number: str
    registration_date: date
    risk_flags: List[RiskFlag] = []
    tender_count: int

class Tender(BaseModel):
    id: int
    title: str
    value: float
    county: str
    status: str

class ContractorProfile(BaseModel):
    profile: ContractorBase
    tenders: list[Tender]
    reputation_score: int
    overburden: bool

