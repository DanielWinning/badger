const args = process.argv;
const tag = args[2];
const fs = require('fs');

let packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
packageJson.version = `${tag}`;

const updatedJson = JSON.stringify(packageJson, null, 2);

fs.writeFileSync('./package.json', updatedJson, 'utf8');