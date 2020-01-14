// const express = require('express')
// const next = require('next')

// const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {
//   const server = express()
//   server.all('*', (req, res) => {
//     return handle(req, res)
//   })

//   server.listen(port, err => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`)

//   })
// })

var https = require('https');
var fs = require('fs');
var express = require('express');

var https_options = {
  key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
  cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
  ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
};

var appSSL = express();
var appNonSSL = express();
var port = process.env.PORT || 443;
var server = https.createServer(https_options, appSSL);

appNonSSL.get("*", (req, res) => {
  res.status(301).redirect('https://nbiot.werapun.com');

})

appNonSSL.post("*"), (req, res)=> {
  console.log("Pulled")
}

appNonSSL.listen(80, () => {
  console.log('http ready for redirect to https')
})

appSSL.get('/', (req, res) => {
  res.end("successfull SSL")
})

server.listen(port, function () {
  console.log('Hello IREALLYHOST listening on port ' + server.address().port);
});