const fs = require('fs');
const path = require('path');

class FileManager {
    constructor(baseDir) {
        this.baseDir = baseDir;
    }

    // Only allow plain file names so users can't read outside baseDir
    resolve(fileName) {
        return path.join(this.baseDir, path.basename(fileName));
    }

    append(fileName, text, callback) {
        fs.appendFile(this.resolve(fileName), text + '\n', 'utf8', callback);
    }

    read(fileName, callback) {
        fs.readFile(this.resolve(fileName), 'utf8', callback);
    }
}

module.exports = FileManager;
