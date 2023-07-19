"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequisitionLimit = void 0;
const moment_1 = __importDefault(require("moment"));
class RequisitionLimit {
    static initialize(req, res, next) {
        if (this.check(req))
            return res.status(301).json({ requisitionLimit: RequisitionLimit.get(req) });
        this.start(req);
        this.limitBurst(req);
        next();
    }
    static get(req) {
        return req.session.requisitionLimit;
    }
    static check(req) {
        var _a;
        if ((_a = req.session.requisitionLimit) === null || _a === void 0 ? void 0 : _a.delay) {
            if (this.totalTime(req) >= this.time) {
                this.create(req);
                return false;
            }
            return true;
        }
        return false;
    }
    static start(req) {
        if (!req.session.requisitionLimit) {
            this.create(req);
        }
        else {
            req.session.requisitionLimit.count += 1;
        }
    }
    static create(req) {
        req.session.requisitionLimit = {
            count: 0,
            blocked: false,
            delay: null,
            time: (0, moment_1.default)(),
        };
    }
    static limitBurst(req) {
        var _a, _b;
        if (((_a = req.session.requisitionLimit) === null || _a === void 0 ? void 0 : _a.count) && ((_b = req.session.requisitionLimit) === null || _b === void 0 ? void 0 : _b.count) >= this.max) {
            req.session.requisitionLimit.blocked = true;
            req.session.requisitionLimit.delay = (0, moment_1.default)();
        }
    }
    static totalTime(req) {
        if (req.session.requisitionLimit) {
            const { time } = req.session.requisitionLimit;
            return time ? (0, moment_1.default)().diff(time, 'minutes') : 0;
        }
        return 0;
    }
}
exports.RequisitionLimit = RequisitionLimit;
RequisitionLimit.time = 5;
RequisitionLimit.max = 5;
