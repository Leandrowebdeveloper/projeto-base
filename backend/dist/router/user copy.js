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
const UserController_1 = require("../Controller/UserController");
const Auth_1 = require("../Middleware/Auth");
const user = (0, express_1.Router)();
const userController = new UserController_1.UserController();
user.get('', (req, res, next) => Auth_1.Auth.guard(req, res, next), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController.findAll(req, res); }));
user.get('/edit', (req, res, next) => Auth_1.Auth.guard(req, res, next), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController.edit(req, res); }));
user.post('', (req, res, next) => Auth_1.Auth.guard(req, res, next), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController.inset(req, res); }));
user.patch('', (req, res, next) => Auth_1.Auth.guard(req, res, next), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController.modernize(req, res); }));
exports.default = user;
