"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = void 0;
function guard(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.auth)
        return next();
    return res.status(403).json({ error: 'Efetue login para acessar o sistema.' });
}
exports.guard = guard;
