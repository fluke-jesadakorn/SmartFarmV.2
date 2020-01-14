const cp = require('child_process');
(async function () {
    await cp.exec('pm2 delete node server', (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            
        } else {
            console.log(stdout)
        }
    });
    await cp.exec('pm2 start node /root/SmartFarmV.2/server.js', (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            
        } else {
            console.log(stdout)
        }
    })
}())