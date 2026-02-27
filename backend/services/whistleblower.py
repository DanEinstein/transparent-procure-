import json
import os
import uuid
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG_FILE = os.path.join(BASE_DIR, "data", "whistle_blower_logs.json")

def save_report(report_data: dict):
    """
    Saves a whistle-blower report anonymously.
    Required fields: project_ref, description, evidence_url (optional)
    """
    # Generate a unique reference number for the citizen to track 
    ref_number = f"TP-{uuid.uuid4().hex[:8].upper()}"
    
    # Structure the entry - NO PII allowed [cite: 48, 57]
    new_entry = {
        "ref_number": ref_number,
        "timestamp": datetime.now(datetime.timezone.utc).isoformat(),
        "project_ref": report_data.get("project_ref"),
        "description": report_data.get("description"),
        "evidence_url": report_data.get("evidence_url"),
        "is_demo_data": True
    }

    # Load existing data, append, and save 
    try:
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, "r+") as f:
                data = json.load(f)
                data.append(new_entry)
                f.seek(0)
                json.dump(data, f, indent=4)
        else:
            with open(LOG_FILE, "w") as f:
                json.dump([new_entry], f, indent=4)
                
        return {"ref_number": ref_number}
    except Exception as e:
        print(f"Error saving report: {e}")
        return None