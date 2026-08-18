import { log } from './handeler/console-handeler';
import http from 'http';
import fs from 'fs';
import path from 'path';

import { setupWebSocket } from './websocket';

log(1, 'Starting Web Server...');

const PORT = 3000;
const publicPath = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {

  if (req.url === '/') {
        const indexPath = path.join(publicPath, 'index.html');
        log(4, `Serving index.html`);
        fs.readFile(indexPath, (err, data) => {
            if (err) {
                log(2, `Error reading index.html: ${err.message}`);
                res.writeHead(500);
                res.end('Internal Server Error');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
        return;
    }

    // CSS
    if (req.url === '/css/style.css') {
        const cssPath = path.join(
            publicPath,
            'css',
            'style.css'
        );

        fs.readFile(cssPath, (error, data) => {
            if (error) {
                log(2, `Error reading CSS file: ${error.message}`);
                res.writeHead(404);
                res.end('CSS not found.');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/css'
            });

            res.end(data);
        });

        return;
    }

    // JavaScript
    if (req.url === '/js/app.js') {
        const jsPath = path.join(
            publicPath,
            'js',
            'app.js'
        );

        fs.readFile(jsPath, (error, data) => {
            if (error) {
                log(2, `Error reading JavaScript file: ${error.message}`);
                res.writeHead(404);
                res.end('JavaScript not found.');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'application/javascript'
            });

            res.end(data);
        });

        return;
    }
    if (req.url === '/api/status') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        log(4, 'Serving API status');

        res.end(JSON.stringify({
            running: true
        }));

        return;
    }

    res.writeHead(404);
    res.end('Not found');
});

setupWebSocket(server);

server.listen(PORT, '127.0.0.1', () => {
    log(4, `Server running on port ${PORT}`);
});