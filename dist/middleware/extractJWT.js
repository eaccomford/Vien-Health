"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config/config"));
var logging_1 = __importDefault(require("config/logging"));
var user_1 = __importDefault(require("../models/user"));
var NAMESPACE = "Auth";
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var extractJWT = function (req, res, next) {
    var _a;
    logging_1.default.info(NAMESPACE, "validating token");
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, function (error, decoded) {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error: error,
                });
            }
            else {
                // check that user is not logged out
                user_1.default.find({ _id: decoded.id, status: 0 })
                    .exec()
                    .then(function (users) {
                    if (users.length > 0) {
                        res.locals.jwt = decoded;
                        next();
                    }
                    else {
                        logging_1.default.info(NAMESPACE, "validation faile, user logged out");
                        return res.status(401).json({
                            message: "Validation Failed",
                        });
                    }
                });
            }
        });
    }
    else {
        logging_1.default.info(NAMESPACE, "validating token");
        return res.status(401).json({
            message: "Validation Failed",
        });
    }
};
exports.default = extractJWT;
