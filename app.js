"use strict";

const fs = require('fs');
const mime = require('mime');
const path = require('path');

class DirToJson {
    constructor() {
        // Map of extension -> mime type
        this.types = Object.create(null);

        // Map of mime type -> extension
        this.extensions = Object.create(null);

        // Resulting Object
        this.result = Object.create(null);
    }

    run(directory) {
        let json = [];
        const files = fs.readdirSync(directory);
        
        for (let file of files) {
            var chunk = {
                mime: mime.lookup(directory + file),
                path: path.resolve(directory) + "/" + file,
                name: file,
                type: 'file'
            };
            if (this.isDirectory(chunk.path)) {
                let dirJson = this.run(chunk.path);
                chunk.subtree = dirJson;
                chunk.type = 'directory';
            }
            json.push(chunk);
        }

        return json;
    }

    isDirectory(pth) {
        return fs.lstatSync(pth).isDirectory();
    }

}

var dirToJson = new DirToJson();
dirToJson.DirToJson = DirToJson;

module.exports = dirToJson;