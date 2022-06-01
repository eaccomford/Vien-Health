"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};
var MONGO_USERNAME = process.env.MONGO_USERNAME || 'mongo';
var MONGO_PASSWORD = process.env.MONGO_PASSWORD || '@cc0mf0rd';
var MONGO_HOST = process.env.MONGO_URL || "localhost";
var MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    // url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
    url: "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=mongo&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true"
};
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER_PORT = process.env.SERVER_PORT || 1337;
var SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "someIssuereName";
var SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
var SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "PAAKowAc@@!liketaTaht";
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};
var config = {
    mongo: MONGO,
    server: SERVER
};
exports.default = config;
