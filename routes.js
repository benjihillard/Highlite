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
exports.__esModule = true;
var http = require('http');
var url = require('url');
var express = require('express');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var path = require('path');
var sessions = require('express-session');
var multer = require('multer');
var fs = require('fs');
var session;
var spanify_1 = require("./spanify");
var span = new spanify_1.spanify();
var upload = multer({
    dest: __dirname + "/uploads/"
});
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        var _this = this;
        this.server = express();
        this.port = 8080;
        this.router = express.Router();
        this.theDatabase = db;
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.server.use('/', express.static('./login'));
        this.server.use('/read', express.static('./read'));
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
        this.server.use(sessions({
            secret: '*&^*^TFtgi67rf56f56^Rir56',
            resave: false,
            saveUninitialized: true
        }));
        this.server.use('/', this.router);
        //getJSON ----------------------------------------------------------------
        this.router.post('/read/getJSON', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fs.readFileSync(__dirname + '/uploads/span.json', 'utf8')];
                        case 1:
                            obj = _a.sent();
                            if (obj !== null || obj !== undefined) {
                                res.send(JSON.parse(obj));
                            }
                            else {
                                res.sendStatus(400);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
        //------------------------------------------------------------------------------
        // Logout ----------------------------------------------------------------
        this.router.post('/logout', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    session = undefined;
                    if (session === undefined) {
                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(400);
                    }
                    return [2 /*return*/];
                });
            });
        });
        //------------------------------------------------------------------------------
        // get Sessions ----------------------------------------------------------------
        this.router.post('/getSession', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log(session);
                    if (session === undefined) {
                        res.sendStatus(201);
                    }
                    else {
                        res.send(session.uniqueID);
                    }
                    return [2 /*return*/];
                });
            });
        });
        //------------------------------------------------------------------------------
        // file drop -------------------------------------------------------------------
        this.router.post('/filedrop', upload.single("file"), function (req, res) {
            var tempPath = req.file.path;
            var targetPath = path.join(__dirname, "./uploads/sample.pdf");
            if (path.extname(req.file.originalname).toLowerCase() === ".pdf") {
                fs.rename(tempPath, targetPath, function (err) {
                    console.log('file stored');
                    span.spanify(__dirname + "/uploads/sample.pdf");
                    console.log('file spanned');
                });
                res.sendStatus(200);
            }
            else {
                fs.unlink(tempPath, function (err) {
                    res.status(400);
                });
            }
        });
        //------------------------------------------------------------------------------
        //logging in -------------------------------------------------------------------
        this.router.post('/login', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = req.body.user;
                            return [4 /*yield*/, db.isFound(user)];
                        case 1:
                            if (_a.sent()) {
                                session = req.session;
                                session.uniqueID = req.body.user;
                                res.sendStatus(200);
                            }
                            else {
                                res.sendStatus(400);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
        //------------------------------------------------------------------------------
        //signUp------------------------------------------------------------------------
        this.router.post('/signup', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, _b, setting, settingJSON;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            user = req.body.user;
                            _b = (_a = console).log;
                            return [4 /*yield*/, db.isFound(user)];
                        case 1:
                            _b.apply(_a, [_c.sent()]);
                            return [4 /*yield*/, db.isFound(user)];
                        case 2:
                            if (!_c.sent()) return [3 /*break*/, 3];
                            res.sendStatus(400);
                            return [3 /*break*/, 5];
                        case 3:
                            setting = {
                                'fontFamily': 'Faustina, serif',
                                'highlightColor': '#11b7ee',
                                'backgroundColor': '#ebdecb',
                                'fontColor': '#000000',
                                'fontSize': '22',
                                'letterSpacing': '2',
                                'wordSpacing': '5',
                                'lineHeight': '45'
                            };
                            settingJSON = JSON.stringify(setting);
                            return [4 /*yield*/, db.put({ 'user': user, 'setting': settingJSON })];
                        case 4:
                            _c.sent();
                            session = req.session;
                            session.uniqueID = req.body.user;
                            res.sendStatus(200);
                            _c.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        });
        //------------------------------------------------------------------------------
        // save settings----------------------------------------------------------------
        this.router.post("/read/settingSave", function (req, res) {
            if (session === undefined) {
                res.sendStatus(400);
            }
            else {
                db.update(session.uniqueID, JSON.stringify(req.body));
            }
        });
        //------------------------------------------------------------------------------
        // get settings-----------------------------------------------------------------
        this.router.post("/read/settingGet", function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var setting, setting;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(session === undefined)) return [3 /*break*/, 1];
                            setting = {
                                'fontFamily': '"Roboto Slab", serif',
                                'highlightColor': '#f5e256',
                                'backgroundColor': '#c0c0c0',
                                'fontColor': '#242222',
                                'fontSize': '34',
                                'letterSpacing': '4',
                                'wordSpacing': '7',
                                'lineHeight': '45'
                            };
                            res.send(JSON.stringify(setting));
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, db.get({ 'user': session.uniqueID })];
                        case 2:
                            setting = _a.sent();
                            res.send(setting.setting);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        //------------------------------------------------------------------------------
        //everything else
        this.router.post('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ "result": "command-not-found" }));
                return [2 /*return*/];
            });
        }); });
    }
    //------------------------------------------------------------------------------
    //listen------------------------------------------------------------------------
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    return MyServer;
}());
exports.MyServer = MyServer;
//------------------------------------------------------------------------------
