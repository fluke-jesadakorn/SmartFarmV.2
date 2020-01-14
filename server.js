// const express = require('express');
// const next = require('next');
// // const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const https = require('https');
// const fs = require('fs');
// const appSSL = express();
// const appNonSSL = express();
// const portSSL = process.env.PORT || 443;

// let https_options = {
//   key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
//   ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
// };

// let serverSSL = https.createServer(https_options, appSSL);

// appNonSSL.get("*", (req, res) => {
//   res.status(301).redirect('https://nbiot.werapun.com');
// })

// appNonSSL.listen(80, () => {
//   console.log('http ready for redirect to https')
// })

// appSSL.get('/', (req, res) => {
//   res.end("successfull SSL")
// })

// app.prepare().then(() => {
//   const service = express()
//   service.all('*', (req, res) => {
//     return handle(req, res)
//   })
// })

const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let https_options = {
  key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
  cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
  ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});