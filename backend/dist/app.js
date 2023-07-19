"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("dotenv/config");
const express_1 = __importStar(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const csurf_1 = __importDefault(require("csurf"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = require("path");
const home_1 = __importDefault(require("./router/home"));
const user_1 = __importDefault(require("./router/user"));
const login_1 = __importDefault(require("./router/login"));
const initialize_1 = __importDefault(require("./router/initialize"));
const functions_1 = require("./Middleware/functions");
class App {
    constructor() {
        this.expire = 1000 * 60 * 60 * 24 * 30 * 2;
        this.config = (0, express_1.default)();
        this.middleware();
        this.router();
    }
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
    }
    middleware() {
        this.config.use('/', express_1.default.static((0, path_1.join)(__dirname, 'public')));
        this.config.use((0, cors_1.default)());
        this.config.use((0, morgan_1.default)('dev'));
        this.config.set('trust proxy', 1);
        this.config.use((0, cookie_parser_1.default)());
        this.config.use((0, express_1.urlencoded)({ extended: false }));
        this.config.use((0, helmet_1.default)());
        this.config.use((0, express_1.json)());
        this.config.use((0, express_session_1.default)(functions_1.configCookie));
        this.config.use((0, csurf_1.default)({ cookie: true }));
        this.config.use(functions_1.verifyCsrf);
    }
    router() {
        const api = '/api';
        this.config.use(`${api}/initialize`, initialize_1.default);
        this.config.use(`${api}/`, home_1.default);
        this.config.use(`${api}/login`, login_1.default);
        this.config.use(`${api}/users`, user_1.default);
        this.config.all('*', functions_1.error_404);
    }
}
exports.App = App;
