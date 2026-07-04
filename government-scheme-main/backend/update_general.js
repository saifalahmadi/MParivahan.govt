const fs = require('fs');
const path = require('path');

const generalSchemes = JSON.parse(fs.readFileSync(path.join(__dirname, 'general_schemes.json'), 'utf8'));

function updateFile(filename) {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
        let existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // 1. Add new general schemes if not present
        const existingNames = new Set(existing.map(s => (s.scheme_name || s.name)));
        const newSchemes = generalSchemes.filter(s => !existingNames.has(s.scheme_name));
        
        // 2. Tag specific Karnataka schemes as "General Category Scheme"
        const targetKarnataka = ["State Scholarship Portal (SSP)", "Fee Reimbursement Scheme", "Sanchi Honnamma Scholarship", "Yuva Nidhi Scheme", "Gruha Lakshmi Scheme", "Gruha Jyoti Scheme", "Shakti Scheme", "Udyogini Scheme"];
        
        existing = existing.map(s => {
            if (targetKarnataka.includes(s.scheme_name)) {
                return { ...s, schemeCategory: "General Category Scheme" };
            }
            return s;
        });

        const updated = [...newSchemes, ...existing];
        fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
        console.log(`Updated ${filename} with ${newSchemes.length} new schemes and updated categories.`);
    }
}

updateFile('schemes_enhanced.json');
updateFile('schemes.json');
