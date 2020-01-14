const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const express = require('express');
const appNonSSL = express();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const lineServ = require('./backend/lineServ');
lineServ();
appNonSSL.get('*', (req, res) => {
  res.status(301).redirect(`https://nbiot.werapun.com${req.params['0']}`) // redirect to url request
  // console.log(req.params['0']);
})

appNonSSL.listen(80, () => {
  console.log('HTTP ready for redirect to https')
})

let https_options = {
  key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
  cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
  ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
};

app.prepare().then(() => {
  createServer(https_options, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});