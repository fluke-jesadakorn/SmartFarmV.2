const cp = require('child_process');
(function () {
    cp.exec('pm2 delete node ssl', (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            cp.exec('pm2 /root/SmartFarmV.2/server.js')
        } else {
            console.log(stdout)
        }
    });
}())