#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.md': 'text/markdown',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Parse URL
  const parsedUrl = url.parse(req.url);
  
  // Extract path from parsed URL
  let pathname = `.${parsedUrl.pathname}`;
  
  // If path ends with '/', append 'index.html'
  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }
  
  // Resolve the file path
  const filePath = path.resolve(pathname);
  
  // Get the file extension
  const ext = path.extname(filePath);
  
  // Maps file extension to MIME type
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Read file from file system
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file is not found, return 404
      if (err.code === 'ENOENT') {
        console.log(`File ${filePath} not found`);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<h1>404 Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
        return;
      }
      
      // For all other errors, return 500
      console.error(`Error reading file ${filePath}:`, err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h1>500 Internal Server Error</h1><p>Error reading file: ${err.code}</p>`);
      return;
    }
    
    // If the file is found, set Content-Type and send the data
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`View the course at http://localhost:${PORT}/react-native-course/`);
  console.log(`View the first module at http://localhost:${PORT}/react-native-course/modules/01-react-native-fundamentals/`);
  console.log('Press Ctrl+C to stop the server');
});
