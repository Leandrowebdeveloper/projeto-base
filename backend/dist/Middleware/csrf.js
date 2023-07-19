"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCsrf = void 0;
exports.verifyCsrf = ((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN')
        return next(err);
    return res.status(403).send('Acesso negado.');
});
