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
exports.Login = void 0;
const User_1 = require("../User");
const validator_1 = require("./validator");
class Login extends User_1.User {
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = this.validator();
                const { email } = user;
                const login = yield db.user.findUnique({
                    where: { email },
                });
                return login;
            }
            catch (error) {
                this.error(error);
            }
        });
    }
    validator() {
        return this.db.$extends({
            query: {
                user: {
                    create({ args, query }) {
                        args.data = validator_1.loginValidator.parse(args.data);
                        return query(args);
                    },
                },
            },
        });
    }
}
exports.Login = Login;
