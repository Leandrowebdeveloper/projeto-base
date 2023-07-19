"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.filterIdentify = exports.random = exports.bcryptCompare = exports.bcrypt = exports.generateCsrf = exports.objectEmpty = exports.empty = exports.getQuery = exports.getParams = exports.getData = void 0;
const bcryptjs_1 = require("bcryptjs");
const randomstring_1 = __importDefault(require("randomstring"));
const jsonwebtoken_1 = require("jsonwebtoken");
function getData(req) {
    req === null || req === void 0 ? true : delete req.body._csrf;
    return req === null || req === void 0 ? void 0 : req.body;
}
exports.getData = getData;
function getParams(req) {
    return req === null || req === void 0 ? void 0 : req.params;
}
exports.getParams = getParams;
function getQuery(req) {
    return req === null || req === void 0 ? void 0 : req.query;
}
exports.getQuery = getQuery;
function empty(data) {
    return (Object.prototype.toString.call(data) === '[object Undefined]' ||
        Object.prototype.toString.call(data) === '[object Null]');
}
exports.empty = empty;
function objectEmpty(object) {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            if (object[key] === '' || empty(object[key])) {
                return true;
            }
        }
    }
    return false;
}
exports.objectEmpty = objectEmpty;
function generateCsrf(req) {
    return req.csrfToken();
}
exports.generateCsrf = generateCsrf;
function bcrypt(data) {
    const salt = (0, bcryptjs_1.genSaltSync)(10);
    return (0, bcryptjs_1.hashSync)(data, salt);
}
exports.bcrypt = bcrypt;
function bcryptCompare(passwordRequest, passwordDB) {
    return (0, bcryptjs_1.compareSync)(passwordRequest, passwordDB);
}
exports.bcryptCompare = bcryptCompare;
function random() {
    return randomstring_1.default.generate({
        length: 12,
        charset: 'alphanumeric',
    });
}
exports.random = random;
function filterIdentify(id) {
    if (isNaN(id))
        return { slug: String(id) };
    return { id: Number(id) };
}
exports.filterIdentify = filterIdentify;
function generateToken(email) {
    return (0, jsonwebtoken_1.sign)({ email }, String(process.env.TOKEN_SECRET), {
        expiresIn: 1000 * 60 * 60 * 24 * 30 * 2,
    });
}
exports.generateToken = generateToken;
