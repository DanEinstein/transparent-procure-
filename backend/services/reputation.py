def calculate_county_reputation(tenders, payments, posts, county_name):
    """
    Calculates a 0-100 score for a county based on project success AND payment reliability.
    """
    score = 100
    
    # --- 1. PROJECT PENALTIES (Your Existing Logic) ---
    county_tenders = [t for t in tenders if t.get("county") == county_name]
    delayed_refs = {p.get("referenceId") for p in posts if p.get("status") == "delay_reported"}
    
    for project in county_tenders:
        if project.get("status") == "Stalled":
            score -= 10
        val = project.get("value", 0)
        bench = project.get("benchmark_value", 1)
        if (val / bench) > 1.5:
            score -= 15
        if project.get("id") in delayed_refs:
            score -= 10

    # --- 2. PAYMENT REPUTATION ALGORITHM ---
    # Match "Mombasa" to "Mombasa County Government"
    county_payments = [p for p in payments if county_name.lower() in p.get("entity_name", "").lower()]
    
    if not county_payments:
        return max(0, min(100, int(score)))

    total_invoices = len(county_payments)
    
    # Calculate how many were paid "on time" (e.g., within 60 days)
    on_time_count = len([
        p for p in county_payments 
        if p.get("status") == "Paid" and p.get("days_outstanding", 0) <= 60
    ])
    
    # Count how many are dangerously late
    chronic_count = len([
        p for p in county_payments 
        if p.get("status") == "Pending" and p.get("days_outstanding", 0) > 180
    ])
                
    # Metric A: % Paid on time
    on_time_percentage = (on_time_count / total_invoices) * 100
    if on_time_percentage < 50:
        score -= 15 # Penalty if they pay late more than half the time
        
    # Metric B: Chronic Pending Bills 
    score -= (chronic_count * 10) # 10 point deduction for EVERY chronic invoice
            
    return max(0, min(100, int(score)))

def calculate_contractor_score(tenders, posts, contractor_id):
    """
    Day 3 Logic: Applies the exact same risk math, but grouped by Contractor 
    to power the Registry page and blacklist warnings.
    """
    score = 100
    contractor_tenders = [t for t in tenders if t.get("contractor_id") == contractor_id]
    
    if not contractor_tenders:
        return 50 # Neutral trust for new/unknown contractors
        
    delayed_refs = {
        p.get("referenceId") for p in posts 
        if p.get("status") == "delay_reported"
    }
    
    for project in contractor_tenders:
        if project.get("status") == "Stalled":
            score -= 25 # Heavier penalty for contractors stalling
            
        val = project.get("value", 0)
        bench = project.get("benchmark_value", 1)
        if (val / bench) > 1.5:
            score -= 20
            
        if project.get("id") in delayed_refs:
            score -= 15
            
    return max(0, min(100, score))