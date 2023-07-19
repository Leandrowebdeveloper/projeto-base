"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const zod_1 = require("zod");
exports.loginValidator = zod_1.z.object({
    email: zod_1.z.string().nonempty('Email obrigatório.').email('Email não valido.'),
    slug: zod_1.z.never(),
    name: zod_1.z.never(),
    password: zod_1.z.string().nonempty('Senha obrigatório.'),
});
