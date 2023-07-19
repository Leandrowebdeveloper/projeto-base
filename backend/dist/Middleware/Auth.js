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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const Model_1 = require("../Model");
class Auth extends Model_1.Model {
    static guard(req, res, next) {
        if (this.getUser(req))
            return next();
        const authorization = this.getHeadersAuthorization(req);
        const token = this.getToken(authorization);
        if (token) {
            const key = this.isThisTokenValid(token);
            if (typeof key !== 'string' && typeof key !== 'undefined') {
                const { email } = key;
                this.setUser(req, email);
                return next();
            }
            return res.status(403).json({ error: 'Não sera possível acessar o sistema.' });
        }
        return res.status(403).json({ error: 'Efetue login para acessar o sistema.' });
    }
    static initialize(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = this.getHeadersAuthorization(req);
            const token = this.getToken(authorization);
            if (token) {
                const key = this.isThisTokenValid(token);
                if (typeof key !== 'string' && typeof key !== 'undefined') {
                    const { email } = key;
                    const auth = (yield this.user.findUnique({ where: { email } }));
                    return res.status(200).json(auth);
                }
                return res.status(200).json(null);
            }
            return res.status(200).json(null);
        });
    }
    static getUser(req) {
        return req.session.auth;
    }
    static setUser(req, email) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.auth = (yield this.user.findUnique({ where: { email } }));
        });
    }
    static getHeadersAuthorization(req) {
        var _a;
        return (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    }
    static getToken(token) {
        if (typeof token === 'string') {
            return token === null || token === void 0 ? void 0 : token.split(' ')[1];
        }
    }
    static isThisTokenValid(token) {
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
}
exports.Auth = Auth;
