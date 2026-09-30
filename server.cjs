const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = Number(process.env.PORT || 4173);
const file = path.join(__dirname, 'public', 'index.html');
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname !== '/' && pathname !== '/index.html' && !/^\/[a-z0-9._-]+\.html$/i.test(pathname)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Not found');
  }
  const servePath = pathname === '/' || pathname === '/index.html' ? file : path.join(__dirname, 'public', pathname);
  fs.readFile(servePath, (error, content) => {
    if (error) {
      res.writeHead(500);
      return res.end('Prototype unavailable');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(content);
  });
});
server.on('error', error => { console.error(error.message); process.exit(1); });
server.listen(port, '127.0.0.1', () => console.log(`上谷原型：http://127.0.0.1:${port}`));
