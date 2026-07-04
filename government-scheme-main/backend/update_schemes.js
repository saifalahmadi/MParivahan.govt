const fs = require('fs');
const path = require('path');

const karnatakaSchemes = JSON.parse(fs.readFileSync(path.join(__dirname, 'karnataka_schemes.json'), 'utf8'));

function updateFile(filename) {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
        let existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        // Filter out any existing versions of these schemes to avoid duplicates
        const existingNames = new Set(existing.map(s => s.scheme_name));
        const newSchemes = karnatakaSchemes.filter(s => !existingNames.has(s.scheme_name));
        
        const updated = [...newSchemes, ...existing];
        fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
        console.log(`Updated ${filename} with ${newSchemes.length} new schemes.`);
    } else {
        console.log(`${filename} does not exist. Creating it.`);
        fs.writeFileSync(filePath, JSON.stringify(karnatakaSchemes, null, 2));
    }
}

updateFile('schemes_enhanced.json');
updateFile('schemes.json');
