"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
class Initialize extends app_1.App {
    constructor() {
        super();
        this.start();
    }
    start() {
        this.config.listen(2000, () => 'http://localhost:2000');
    }
}
(function () {
    new Initialize();
})();
