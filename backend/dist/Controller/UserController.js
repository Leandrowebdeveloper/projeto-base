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
exports.UserController = void 0;
const utilities_1 = require("../utilities");
const User_1 = require("../Model/User");
class UserController extends User_1.User {
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = (0, utilities_1.getQuery)(req);
            const _csrf = (0, utilities_1.generateCsrf)(req);
            if (id) {
                const user = yield this.readOne(id);
                this.exit();
                if (user)
                    return res.status(200).json(Object.assign(Object.assign({}, user), { _csrf }));
                return res.status(200).json({ error: 'Usuário não foi existe' });
            }
            return res.status(200).json({
                email: null,
                password: null,
                name: null,
                slug: null,
                _csrf,
            });
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.readAll();
                this.exit();
                if (user)
                    return res.status(200).json(user);
                return res.status(301).json({ error: 'Não foi possivel listar usuários.' });
            }
            catch (error) {
                return res.status(301).json({ error: 'Um erro inesperado ocorreu. Tente novamente.' });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = (0, utilities_1.getQuery)(req);
                if ((0, utilities_1.objectEmpty)({ id })) {
                    return res.status(301).json({ error: 'Não e permitido campos vazios.' });
                }
                const user = yield this.readOne(id);
                this.exit();
                if (user)
                    return res.status(200).json(user);
                return res.status(200).json({ error: 'Não foi possivel listar usuários.' });
            }
            catch (error) {
                return res.status(301).json({ error: 'Um erro inesperado ocorreu. Tente novamente.' });
            }
        });
    }
    inset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = (0, utilities_1.getData)(req);
                const user = yield this.create(data);
                this.exit();
                if (user)
                    return res.status(200).json(user);
                return res.status(200).json({ error: 'Não foi possivel cadastrar usuários.' });
            }
            catch (error) {
                return res.status(301).json({ error });
            }
        });
    }
    modernize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id;
                const data = (0, utilities_1.getData)(req);
                if ((0, utilities_1.objectEmpty)(data)) {
                    return res.status(301).json({ error: 'Não e permitido campos vazios.' });
                }
                if (data.id) {
                    id = data.id;
                }
                else {
                    id = data.slug;
                }
                const user = yield this.readOne(id);
                if (user) {
                    this.setSlug(data, user.slug);
                    const update = yield this.update(id, data);
                    this.exit();
                    return res.status(200).json(update);
                }
                this.exit();
                return res.status(301).json({ error: 'Não foi possivel editar usuários.' });
            }
            catch (error) {
                return res.status(301).json({ error });
            }
        });
    }
    setSlug(data, slug) {
        if (data.name)
            data.slug = slug;
    }
}
exports.UserController = UserController;
