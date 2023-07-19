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
exports.InitializeController = void 0;
const Auth_1 = require("../Middleware/Auth");
class InitializeController {
    initialize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = Auth_1.Auth.getUser(req);
                console.log(auth);
                if (auth) {
                    return res.status(200).json(auth);
                }
                return res.status(200).json(null);
            }
            catch (error) {
                return res.status(301).json({ error: 'Um erro inesperado ocorreu. Tente novamente.' });
            }
        });
    }
}
exports.InitializeController = InitializeController;
