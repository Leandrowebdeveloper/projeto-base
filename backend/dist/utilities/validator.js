"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superstruct_1 = require("superstruct");
const isemail_1 = __importDefault(require("isemail"));
// Runtime validation
const Signup = (0, superstruct_1.object)({
    email: (0, superstruct_1.refine)((0, superstruct_1.string)(), 'email', (v) => isemail_1.default.validate(v)),
    // password is between 7 and 30 characters long
    password: (0, superstruct_1.size)((0, superstruct_1.string)(), 7, 30),
    // first name is between 2 and 50 characters long
    name: (0, superstruct_1.size)((0, superstruct_1.string)(), 2, 200),
});
