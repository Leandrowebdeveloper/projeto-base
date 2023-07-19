"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreate = void 0;
const zod_1 = require("zod");
const helpers_1 = require("../../utilities/helpers");
exports.userCreate = zod_1.z.object({
    email: zod_1.z.string().nonempty('Email obrigatório.').email('Email não valido.'),
    slug: zod_1.z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: zod_1.z.string().nonempty('Nome obrigatório.'),
    password: zod_1.z.string()
        .nonempty('Senha obrigatório.')
        .min(8, 'Senha não pode ser menor que 8 caracters.')
        .max(32, 'Senha não pode ser menor que 32 caracters.')
        .transform((val) => (0, helpers_1.bcrypt)(val)),
});
