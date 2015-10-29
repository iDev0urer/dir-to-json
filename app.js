"use strict";
const fs = require('fs');
const mime = require('mime');
const path = require('path');

function DirToJson() {
    // Map of extension -> mime type
    this.types = Object.create(null);

    // Map of mime type -> extension
    this.extensions = Object.create(null);
}

DirToJson.prototype.init = function() {

};

DirToJson.prototype.run = function(directory) {
    let json = [];
    const files = fs.readdirSync(directory);
    for (let file of files) {
        var chunk = {
            mime: mime.lookup(directory + file),
            path: path.resolve(directory) + "/" + file,
            name: file
        };
        json.push(chunk);
    }

    return json;
};

var dirToJson = new DirToJson();
dirToJson.DirToJson = DirToJson;

module.exports = dirToJson;