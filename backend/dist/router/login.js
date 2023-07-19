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
const express_1 = require("express");
const LoginController_1 = require("../Controller/LoginController");
const RequisitionLimit_1 = require("../Middleware/RequisitionLimit");
const login = (0, express_1.Router)();
const loginController = new LoginController_1.LoginController();
login.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield loginController.start(req, res); }));
login.post('', (req, res, next) => RequisitionLimit_1.RequisitionLimit.initialize(req, res, next), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield loginController.init(req, res); }));
exports.default = login;
