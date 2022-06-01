"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config/config"));
var logging_1 = __importDefault(require("config/logging"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var NAMESPACE = 'Auth';
var signJWT = function (user, callback) {
    var timeSinchEpock = new Date().getTime();
    var expireTime = timeSinchEpock + Number(config_1.default.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expireTime / 1000);
    logging_1.default.info(NAMESPACE, "Attempting to sign token for " + user.username);
    try {
        jsonwebtoken_1.default.sign({
            username: user.username,
            id: user._id
        }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, function (error, token) {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};
exports.default = signJWT;
