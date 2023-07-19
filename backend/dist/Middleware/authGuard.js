"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = void 0;
function guard(req, res, next) {
    console.log(req.session);
    next();
    // return res.status(401).json({ error: 'Acesso não permitido.' });
}
exports.guard = guard;
