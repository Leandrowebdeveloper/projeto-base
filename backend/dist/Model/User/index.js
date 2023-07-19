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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const client_1 = require("@prisma/client");
const utilities_1 = require("../../utilities");
const slugify_1 = __importDefault(require("slugify"));
const validator_1 = require("./validator");
const zod_1 = require("zod");
const __1 = require("..");
class User extends __1.Model {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = this.validatorCreate();
                this.createSlug(user);
                const result = yield db.user.create({
                    data: Object.assign({}, user),
                });
                return result;
            }
            catch (e) {
                return this.error(e);
            }
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.updateSlug(user);
                const result = yield this.db.user.update({
                    where: Object.assign({}, (0, utilities_1.filterIdentify)(id)),
                    data: Object.assign({}, user),
                });
                return result;
            }
            catch (e) {
                return this.error(e);
            }
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.user.findFirst({
                where: Object.assign({}, (0, utilities_1.filterIdentify)(id)),
            });
            return result;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.user.findMany();
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.user.delete({
                where: { id },
            });
            return result;
        });
    }
    validatorCreate() {
        return this.db.$extends({
            query: {
                user: {
                    create({ args, query }) {
                        args.data = validator_1.createValidator.parse(args.data);
                        return query(args);
                    },
                },
            },
        });
    }
    createSlug(user) {
        user.slug = (0, slugify_1.default)(`${user.name}-${(0, utilities_1.random)()}`, {
            lower: true,
        });
    }
    updateSlug(user) {
        if (!!user.slug) {
            const slug = user.slug.split('-').pop();
            user.slug = (0, slugify_1.default)(`${user.name}-${slug}`, {
                lower: true,
            });
        }
    }
    error(e) {
        if (e instanceof zod_1.ZodError) {
            return e.issues.map((item, i) => {
                return {
                    field: item.path[0],
                    message: item.message,
                };
            });
        }
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return { error: 'Um novo usuário não pode ser criado com este e-mail.' };
            }
        }
    }
}
exports.User = User;
