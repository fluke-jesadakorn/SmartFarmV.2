const { createServer } = require('https');
const fs = require('fs');
let https_options
module.exports = (PORT, appFromExpress, serverType) => {
    if (process.env.NODE_ENV === 'production') {
        https_options = {
            key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
            cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
            ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
        }
    }else if (process.NODE_ENV === 'development') {
        https_options = null;
    }

    createServer(https_options, appFromExpress, serverType, (req, res) => {
        console.log(`${serverType} Server Running On Port ${PORT}`);
    })
        .listen(PORT, err => console.error(err))
}