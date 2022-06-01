"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pageContent_1 = __importDefault(require("../controllers/pageContent"));
var extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
var multer_1 = __importDefault(require("multer"));
var router = express_1.Router();
// @route Get /auth
// @desc Athenticate a user
// @access Public
var UPLOAD_PATH = 'uploads';
var upload = multer_1.default({ dest: UPLOAD_PATH + "/" });
router.post('/profile', upload.single('file'), pageContent_1.default.profile);
router.get('/pages', extractJWT_1.default, pageContent_1.default.getPages);
router.post('/store', pageContent_1.default.store);
exports.default = router;
