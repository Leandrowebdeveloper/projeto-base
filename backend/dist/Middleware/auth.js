"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isThisTokenValid = exports.getToken = exports.getHeadersAuthorization = exports.setUser = exports.getUser = exports.authGuard = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../Model/User");
const authGuard = (req, res, next) => {
    if (getUser(req))
        return next();
    const authorization = getHeadersAuthorization(req);
    const token = getToken(authorization);
    if (token) {
        const key = isThisTokenValid(token);
        if (typeof key !== 'string' && typeof key !== 'undefined') {
            const { email } = key;
            setUser(req, email);
            return next();
        }
        return res.status(403).json({ error: 'Não sera possível acessar o sistema.' });
    }
    return res.status(403).json({ error: 'Efetue login para acessar o sistema.' });
};
exports.authGuard = authGuard;
function getUser(req) {
    return req.session.auth;
}
exports.getUser = getUser;
function setUser(req, email) {
    const user = new User_1.User();
    user.findUnique(email).then(_user => (req.session.auth = _user));
}
exports.setUser = setUser;
function getHeadersAuthorization(req) {
    var _a;
    return (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
}
exports.getHeadersAuthorization = getHeadersAuthorization;
function getToken(token) {
    if (typeof token === 'string') {
        return token === null || token === void 0 ? void 0 : token.split(' ')[1];
    }
}
exports.getToken = getToken;
function isThisTokenValid(token) {
    try {
        if (token) {
            const token$ = token.replace(/\"/g, '');
            return (0, jsonwebtoken_1.verify)(token$, String(process.env.TOKEN_SECRET));
        }
    }
    catch (error) {
        return undefined;
    }
}
exports.isThisTokenValid = isThisTokenValid;
