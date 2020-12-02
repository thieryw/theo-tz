"use strict";
exports.__esModule = true;
var fs = require("fs");
var myArgs = (function () {
    var out = [];
    process.argv.forEach(function (arg, index) {
        if (index < 2) {
            return;
        }
        out.push(arg);
    });
    return out;
})();
var files = fs.readdirSync("" + myArgs[0]);
var tsFiles = [];
files.forEach(function (file) {
    if (!file.endsWith(".jpg")) {
        return;
    }
    tsFiles.push(file);
});
var newFileContent = (function () {
    var out = "";
    tsFiles.forEach(function (file, index) {
        out = out.concat("\nimport img" + index + " from \"./" + file + "\";");
    });
    out = out.concat("\n export const images = [");
    tsFiles.forEach(function (file, index) {
        if (index === tsFiles.length - 1) {
            out = out.concat("img" + index + "];");
            return;
        }
        out = out.concat("img" + index + ",");
    });
    return out;
})();
fs.writeFileSync("" + myArgs[0] + (myArgs[1] ? myArgs[1] : "images") + ".ts", "" + newFileContent);
