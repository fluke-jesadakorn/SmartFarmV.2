const { createServer } = require('https');
const fs = require('fs');

module.exports = (PORT, appFromExpress, serverType) => {
    const https_options = {
        key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
        cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
        ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
    }

    var server = https.createServer(https_options, appFromExpress);

    server.listen(PORT, function () {
        console.log(`${serverType} Bot Server Running on : ` + server.address() + `${PORT}` );
    });
}