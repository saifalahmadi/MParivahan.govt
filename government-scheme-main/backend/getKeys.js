const fs = require('fs');
const data = JSON.parse(fs.readFileSync('schemes.json'));
let snippet = "KEYS: " + Object.keys(data[0]).join(', ') + "\n\n";
snippet += JSON.stringify(data[0], null, 2).substring(0, 500);
fs.writeFileSync('keys.txt', snippet);
