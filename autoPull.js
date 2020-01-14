const cp = require('child_process');
const express = require('express');
const app = express();
const port = 90;

app.post('/onPush',(req, res)=>{
    console.log(req);
    res.status(200).end("Thank You For Sending");
})
app.listen(port,()=>{
    console.log(`git auto pull running on port ${port}`);
});

// (function () {
//     cp.exec('pm2 delete node server', (err, stdout, stderr) => {
//         if (err) {
//             console.log(err);
//             startServer();

//         } else {
//             console.log(stdout);
//             startServer();
//         }
//     });
// }())

// startServer = () => {
//     cp.exec('pm2 start /root/SmartFarmV.2/server.js', (err, stdout, stderr) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(stdout);
//         }
//     })
// }