# This script expands the tender dataset to include all 47 Kenyan counties by duplicating existing records and modifying them.
# It ensures that the API can provide data for every county, which is essential for testing and demonstrating the application's features.


import json
import random

# All 47 Kenyan Counties
all_counties = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta", "Garissa", "Wajir", 
    "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", "Embu", "Kitui", "Machakos", 
    "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot", 
    "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", 
    "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", 
    "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
]

def expand_tenders():
    with open("data/tender.json", "r") as f:
        tenders = json.load(f)

    existing_counties = {t.get("county") for t in tenders}
    missing_counties = [c for c in all_counties if c not in existing_counties]
    
    # Use existing tenders as templates
    templates = tenders.copy()
    
    for county in missing_counties:
        # Pick a random template
        template = random.choice(templates).copy()
        
        # Modify it for the new county
        template["county"] = county
        # Generate a new fake ID based on the county
        prefix = county[:3].upper()
        template["id"] = f"{prefix}-{random.randint(100, 999)}"
        template["title"] = f"{template['category']} Project - {county}"
        
        tenders.append(template)
        
    with open("data/tender.json", "w") as f:
        json.dump(tenders, f, indent=2)
        
    print(f"Success! Expanded dataset from {len(existing_counties)} to {len(all_counties)} counties. Total records: {len(tenders)}")

if __name__ == "__main__":
    expand_tenders()