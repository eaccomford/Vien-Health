"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("./user"));
var page_content_1 = __importDefault(require("./page-content"));
var router = express_1.Router();
router.use('/user', user_1.default);
router.use('/page-content', page_content_1.default);
exports.default = router;
