"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequisitionLimit = void 0;
const moment_1 = __importDefault(require("moment"));
class RequisitionLimit {
    static create(req) {
        if (!req.session.requisitionLimit) {
            req.session.requisitionLimit = {
                count: 0,
                blocked: false,
                delay: null,
                time: (0, moment_1.default)(),
            };
        }
    }
    static limit(req) {
        if (req.session.requisitionLimit) {
            req.session.requisitionLimit.count += 1;
        }
    }
    static start(req, res, next) {
        this.create(req);
        this.limit(req);
        next();
    }
    static limitBurst(req) {
        var _a, _b;
        if (((_a = req.session.requisitionLimit) === null || _a === void 0 ? void 0 : _a.count) && ((_b = req.session.requisitionLimit) === null || _b === void 0 ? void 0 : _b.count) >= this.max) {
            req.session.requisitionLimit.blocked = true;
            req.session.requisitionLimit.delay = (0, moment_1.default)();
            console.log(this.totalTime(req));
        }
    }
    static totalTime(req) {
        if (req.session.requisitionLimit) {
            const { time } = req.session.requisitionLimit;
            return time ? (0, moment_1.default)().diff(time, 'minutes') : 0;
        }
    }
}
exports.RequisitionLimit = RequisitionLimit;
RequisitionLimit.time = 5;
RequisitionLimit.max = 5;
