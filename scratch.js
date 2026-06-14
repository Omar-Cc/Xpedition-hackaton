const fs = require('fs');
let content = fs.readFileSync('frontend/app/(empleabilidad)/job-match/page.tsx', 'utf8');
content = content.replace(/matchPercent:\s*\d+,/g, () => 'matchPercent: ' + (Math.floor(Math.random() * (85 - 70 + 1)) + 70) + ',');
fs.writeFileSync('frontend/app/(empleabilidad)/job-match/page.tsx', content);
