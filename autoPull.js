const cp = require('child_process');
(function () {
    cp.exec('pm2 delete node server', (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            
        } else {
            console.log(stdout)
        }
    });
    cp.exec('pm2 start node /root/SmartFarmV.2/server.js', (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            
        } else {
            console.log(stdout)
        }
    })
}())