"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home = (0, express_1.Router)();
home.get('', (req, res) => {
    res.json({ message: 'Page Home' });
});
exports.default = home;
