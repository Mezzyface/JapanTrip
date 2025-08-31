// Generate embedded data file
const fs = require('fs');
const path = require('path');

const dataDir = './data';
const outputFile = './js/data-embedded.js';

let jsContent = '// Auto-generated embedded data\nconst ITINERARY_DATA = {\n';

// Read all JSON files
for (let i = 0; i <= 16; i++) {
    const paddedDay = i.toString().padStart(2, '0');
    const filePath = path.join(dataDir, `day-${paddedDay}.json`);
    
    if (fs.existsSync(filePath)) {
        const jsonContent = fs.readFileSync(filePath, 'utf8');
        try {
            // Validate JSON
            JSON.parse(jsonContent);
            jsContent += `  ${i}: ${jsonContent},\n`;
        } catch (error) {
            console.error(`Invalid JSON in ${filePath}:`, error.message);
        }
    }
}

jsContent += '};\n';

fs.writeFileSync(outputFile, jsContent);
console.log(`Generated ${outputFile} with embedded data`);
