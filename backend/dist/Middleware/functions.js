"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_404 = exports.configCookie = exports.verifyCsrf = void 0;
exports.verifyCsrf = ((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN')
        return next(err);
    return res.status(403).send('Acesso negado.');
});
exports.configCookie = {
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
};
const error_404 = (req, res) => {
    res.status(404).json({ error: 'Erro 404 página não encontrada.' });
};
exports.error_404 = error_404;
