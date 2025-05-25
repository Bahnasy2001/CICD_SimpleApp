const http = require('http');
http.createServer((req, res) => {
    res.write("Hello from Jenkins deployed app!");
    res.end();
}).listen(8082);