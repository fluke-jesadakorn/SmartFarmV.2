const fs = require('fs');
const config = fs.readFileSync('config.json','utf8');
const json = JSON.parse(config)
console.log(json)

// fs.writeFileSync('config.js',`[{
//     test: {
//         hello:1
//     }
// }]`)