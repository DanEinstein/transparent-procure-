def calculate_county_reputation(tenders, payments, posts, county_name):
    """
    Day 3 Logic: Dynamically calculates a 0-100 score for a county.
    Upgraded to include Citizen Oversight penalties.
    """
    score = 100
    county_tenders = [t for t in tenders if t.get("county") == county_name]
    
    if not county_tenders:
        return 100 # High trust for clean slates
        
    # Create a fast lookup for projects with citizen-reported delays
    delayed_refs = {
        p.get("referenceId") for p in posts 
        if p.get("status") == "delay_reported"
    }
    
    for project in county_tenders:
        # 1. Penalty for official stalled projects (Your existing logic)
        if project.get("status") == "Stalled":
            score -= 20
        
        # 2. Penalty for extreme price anomalies (Your existing logic)
        val = project.get("value", 0)
        bench = project.get("benchmark_value", 1)
        if (val / bench) > 1.5:
            score -= 15
            
        # 3. NEW: Penalty for crowdsourced citizen flags
        if project.get("id") in delayed_refs:
            score -= 10
            
    return max(0, min(100, score))


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