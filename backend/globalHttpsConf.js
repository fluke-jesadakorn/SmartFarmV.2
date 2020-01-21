const { createServer } = require('https');
const fs = require('fs');
let https_options

if (process.env.NODE_ENV === 'production') {
    https_options = {
        key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
        cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
        ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
    }
} else if (process.NODE_ENV === 'development') {
    https_options = null;
}

module.exports = createServer(https_options, appFromExpress, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    console.log(`${serverType} Server Running On Port ${PORT}`);
})
    .listen(PORT, err => console.error(err))