const http = require('http'); // no need to npm install because it comes with it
const fs = require('fs');

const hostname = '127.0.0.1'; // using local host
const port = 3000;

fs.readFile('index.html', (err, html) => {
    if(err) {
        throw err;
    }

    const server = http.createServer((req, res) => { // putting in request and response for the parameters
        res.statusCode = 200; // need to make a status code and 200 bascially means that its okay
        res.setHeader('Content-type', 'text/html');
        res.write(html);
        res.end();
    });
    
    server.listen(port, hostname, () => {
        console.log('Server stated on port ' +port);
    })
});


