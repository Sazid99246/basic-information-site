const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '';

    switch (req.url) {
        case '/':
            filePath = 'index.html';
            break;
        case '/about':
            filePath = 'about.html';
            break;
        case '/contact-me':
            filePath = 'contact-me.html';
            break;
        default:
            filePath = '404.html';
            break;
    }

    const absolutePath = path.join(__dirname, filePath);

    fs.readFile(absolutePath, (err, content) => {
        if (err) {
            // Handle error (e.g., file not found even if we mapped it)
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        } else {
            // Success
            if (filePath === '404.html') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
            }
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});