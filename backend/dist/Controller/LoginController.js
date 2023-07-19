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
exports.LoginController = void 0;
const Login_1 = require("../Model/Login");
const utilities_1 = require("../utilities");
const RequisitionLimit_1 = require("../Middleware/RequisitionLimit");
class LoginController extends Login_1.Login {
    start(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _csrf = (0, utilities_1.generateCsrf)(req);
            return res.status(200).json({
                email: null,
                password: null,
                _csrf,
            });
        });
    }
    init(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = (0, utilities_1.getData)(req);
                const login = yield this.login(data);
                this.exit();
                if (login) {
                    const { password } = data;
                    const isPassword = (0, utilities_1.bcryptCompare)(password, login.password);
                    if (isPassword) {
                        const { createdAt, deleted, email, isAdmin, name, slug, state, updatedAt } = login;
                        const token = (0, utilities_1.generateToken)(email);
                        return res.status(200).json({ token, createdAt, deleted, email, isAdmin, name, slug, state, updatedAt });
                    }
                    return this._error(req, res);
                }
                return this._error(req, res);
            }
            catch (error) {
                return res.status(301).json({ error });
            }
        });
    }
    _error(req, res) {
        return res.status(301).json({ error: 'Email ou senha não é valido.', requisitionLimit: RequisitionLimit_1.RequisitionLimit.get(req) });
    }
}
exports.LoginController = LoginController;
