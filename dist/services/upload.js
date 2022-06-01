"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var multer = require("multer");
var GridFsStorage = require("multer-gridfs-storage");
var storage = new GridFsStorage({
    url: "mongodb://localhost:27017/bezkoder_files_db",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: function (req, file) {
        var match = ["image/png", "image/jpeg", "image/jpg"];
        if (match.indexOf(file.mimetype) === -1) {
            var filename = Date.now() + "-bezkoder-" + file.originalname;
            return filename;
        }
        return {
            bucketName: "photos",
            filename: Date.now() + "-bezkoder-" + file.originalname
        };
    }
});
var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
