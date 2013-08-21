var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy');

var options = {
  https: {
    key: fs.readFileSync('../fixtures/agent2-key.pem', 'utf8'),
    cert: fs.readFileSync('../fixtures/agent2-cert.pem', 'utf8')
  }
};

httpProxy.createServer(18000, 'localhost', options).listen(18001);

var responseLength = 243543;

var response = '';
for(var i=1; i <= responseLength - 3; i++) {
  response += i % 80 ? 'x' : '\n';
}
response += 'EOF';

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': responseLength
  });
  res.write(response);
  res.end();
}).listen(18000);
