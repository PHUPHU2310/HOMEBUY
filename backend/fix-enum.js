const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data/sampleProperties.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content
  .replace(/type:\s*'House'/g, "type: 'house'")
  .replace(/type:\s*'Apartment'/g, "type: 'apartment'")
  .replace(/type:\s*'Land'/g, "type: 'land'")
  .replace(/type:\s*'Commercial'/g, "type: 'commercial'")
  .replace(/status:\s*'Available'/g, "status: 'available'")
  .replace(/status:\s*'Rented'/g, "status: 'rented'");

fs.writeFileSync(filePath, content);
console.log('✅ Fixed enum values in sampleProperties.js');
