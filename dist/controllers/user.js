"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("config/logging"));
require("dotenv/config");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = __importDefault(require("../models/user"));
var signJWT_1 = __importDefault(require("../services/signJWT"));
var NAMESPACE = "User";
var validateToken = function (req, res, next) {
    logging_1.default.info(NAMESPACE, "Success, User granted access");
    return res.status(200).json({
        message: 'Successfully Athorized'
    });
};
var register = function (req, res, next) {
    // no validation yet
    var _a = req.body, firstname = _a.firstname, lastname = _a.lastname, username = _a.username, password = _a.password;
    user_1.default.find({ username: username }).exec()
        .then(function (users) {
        if (users.length > 0) {
            logging_1.default.info(NAMESPACE, "Err, username is already taken");
            return res.status(401).json({
                message: 'username is already taken',
                username: username
            });
        }
        else {
            bcryptjs_1.default.hash(password, 3, function (hashError, hash) {
                if (hashError) {
                    return res.status(500).json({
                        message: hashError.message,
                        error: hashError
                    });
                }
                var _user = new user_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: hash
                });
                return _user.save()
                    .then(function (result) {
                    return res.status(201).json({
                        book: result
                    });
                })
                    .catch(function (error) {
                    return res.status(500).json({
                        message: error.message,
                        error: error
                    });
                });
            });
        }
    });
};
var login = function (req, res, next) {
    // validate request
    var _a = req.body, username = _a.username, password = _a.password;
    user_1.default.find({ username: username }).exec()
        .then(function (users) {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'Unauthorised login'
            });
        }
        bcryptjs_1.default.compare(password, users[0].password, function (_, err) {
            console.log('errrrr');
            console.log(err);
            if (!err) {
                logging_1.default.error(NAMESPACE, 'wrong username or password', err);
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
            else {
                signJWT_1.default(users[0], function (_error, token) {
                    if (_error) {
                        logging_1.default.error(NAMESPACE, 'SignJWT Error', err);
                        return res.status(401).json({
                            message: 'Unauthorised - token not signed for user', error: _error
                        });
                    }
                    else if (token) {
                        // update user status
                        console.log('updating reecord', users[0].id);
                        try {
                            var filter = { _id: users[0].id };
                            var update = { $set: { status: 0 } };
                            var user = user_1.default.findOneAndUpdate(filter, update, {
                                returnOriginal: true
                            }, function (error, result) {
                                console.log('error---');
                                console.log(result);
                            });
                            // return success if status is set to 0 (on)
                            return res.status(200).json({
                                message: 'success',
                                token: token,
                                user: users[0]
                            });
                        }
                        catch (error) {
                            return res.status(201).json({ error: error });
                        }
                    }
                });
            }
        });
    }).catch(function (error) {
        return res.status(500).json({
            message: error.message, error: error
        });
    });
};
var getAllUsers = function (req, res, next) {
    user_1.default.find()
        .select('-password')
        .exec()
        .then(function (users) {
        return res.status(200).json({
            users: users,
            count: users.length
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
var logoutUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, update, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filter = { _id: req.body.id };
                update = { status: 1 };
                return [4 /*yield*/, user_1.default.findOneAndUpdate(filter, update, {
                        returnOriginal: true
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({ success: 'user logged out' })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(401).json({ "Error": error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { validateToken: validateToken, register: register, login: login, getAllUsers: getAllUsers, logoutUser: logoutUser };
