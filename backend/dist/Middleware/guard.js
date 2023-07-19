"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = void 0;
function guard(req, res, next) {
    if (req)
        return next();
    return res.status(403).json({ error: 'Efetue login para acessar o sistema.' });
}
exports.guard = guard;
