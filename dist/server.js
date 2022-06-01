"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config/config"));
var body_parser_1 = __importDefault(require("body-parser"));
var logging_1 = __importDefault(require("config/logging"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var index_1 = __importDefault(require("routes/index"));
var cors = require("cors");
// import * as cors from 'cors' // try this
var NAMESPACE = 'Server';
var app = express_1.default();
app.use(cors());
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then(function (result) {
    logging_1.default.info(NAMESPACE, 'Mongo Connected');
})
    .catch(function (error) {
    logging_1.default.error(NAMESPACE, error.message, error);
});
/** Log the request */
app.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        /** Log the res */
        logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
/** Parse the body of the request */
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
function createServer() {
    app.get("/", function (req, res, next) {
        res.send('hello word');
    });
    app.use(index_1.default);
    return app;
}
exports.default = createServer;
