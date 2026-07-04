import kagglehub
import pandas as pd
import json
import os

print("Downloading dataset from Kaggle...")
path = kagglehub.dataset_download("hamtaghanbaripour/empowering-women")

print(f"Dataset downloaded to: {path}")

# Find the CSV file in the downloaded path
csv_files = [f for f in os.listdir(path) if f.endswith('.csv')]
if not csv_files:
    print("No CSV file found in the dataset!")
else:
    csv_path = os.path.join(path, csv_files[0])
    print(f"Reading CSV: {csv_path}")
    df = pd.read_csv(csv_path)
    
    # Save a sample to our backend directory for processing
    output_path = os.path.join(os.getcwd(), 'backend', 'women_empowerment.json')
    
    # Convert to JSON format compatible with our app
    schemes = []
    for idx, row in df.iterrows():
        # Map CSV columns to our schema (adjust based on common Kaggle structures)
        # Note: I'll refine this once I see the first 5 records
        scheme = {
            "id": f"women_{idx}",
            "scheme_name": row.get('Title', row.get('Scheme Name', f"Scheme {idx}")),
            "details": row.get('Description', row.get('Details', '')),
            "benefits": row.get('Benefits', ''),
            "eligibility": row.get('Eligibility', ''),
            "is_central": True, # Assume central for now
            "level": "central",
            "schemeCategory": "Women Empowerment",
            "gender": "female",
            "tags": "Women, Empowerment, Kaggle"
        }
        schemes.append(scheme)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(schemes, f, indent=2)
        
    print(f"Successfully converted {len(schemes)} schemes to {output_path}")
    print("First 5 records preview:")
    print(df.head())
