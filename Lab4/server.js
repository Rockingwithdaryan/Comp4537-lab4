const http = require('http');
const url = require('url');
const path = require('path');
const Utils = require('./modules/utils');
const FileManager = require('./modules/fileManager');
const messages = require('./lang/en/en.json');

const BASE_PATH = '/COMP4537/labs/3';
const DEFAULT_FILE = 'file.txt';

class Server {
    constructor(port) {
        this.port = port;
        this.fileManager = new FileManager(path.join(__dirname, 'data'));
        require('fs').mkdirSync(this.fileManager.baseDir, { recursive: true });
    }

    send(res, status, body, contentType = 'text/html') {
        res.writeHead(status, { 'Content-Type': `${contentType}; charset=utf-8` });
        res.end(body);
    }

    handleGetDate(res, query) {
        if (!query.name) {
            return this.send(res, 400, messages.missingName);
        }
        this.send(res, 200, Utils.getGreeting(query.name));
    }

    handleWriteFile(res, query) {
        if (!query.text) {
            return this.send(res, 400, messages.missingText);
        }
        this.fileManager.append(DEFAULT_FILE, query.text, (err) => {
            if (err) {
                return this.send(res, 500, err.message, 'text/plain');
            }
            this.send(res, 200, Utils.format(messages.appended, query.text, DEFAULT_FILE), 'text/plain');
        });
    }

    handleReadFile(res, fileName) {
        this.fileManager.read(fileName, (err, data) => {
            if (err) {
                return this.send(res, 404, Utils.format(messages.fileNotFound, fileName), 'text/plain');
            }
            this.send(res, 200, data, 'text/plain');
        });
    }

    route(req, res) {
        const parsed = url.parse(req.url, true);
        const pathname = parsed.pathname.replace(/\/+$/, '');

        if (req.method !== 'GET') {
            return this.send(res, 405, 'Method Not Allowed', 'text/plain');
        }
        if (pathname === `${BASE_PATH}/getDate`) {
            return this.handleGetDate(res, parsed.query);
        }
        if (pathname === `${BASE_PATH}/writeFile`) {
            return this.handleWriteFile(res, parsed.query);
        }
        if (pathname.startsWith(`${BASE_PATH}/readFile/`)) {
            const fileName = decodeURIComponent(pathname.slice(`${BASE_PATH}/readFile/`.length));
            return this.handleReadFile(res, fileName);
        }
        this.send(res, 404, messages.notFound, 'text/plain');
    }

    start() {
        http.createServer((req, res) => this.route(req, res))
            .listen(this.port, () => console.log(`Server listening on port ${this.port}`));
    }
}

new Server(process.env.PORT || 8080).start();
