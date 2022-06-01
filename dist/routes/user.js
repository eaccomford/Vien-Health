"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("../controllers/user"));
var extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
var router = express_1.Router();
// @route Get /auth
// @desc Athenticate a user
// @access Public
router.get('/users', extractJWT_1.default, user_1.default.getAllUsers);
router.put('/logout', user_1.default.logoutUser);
router.post('/login', user_1.default.login);
router.post('/register', user_1.default.register);
router.get('/validate', extractJWT_1.default, user_1.default.validateToken);
exports.default = router;
