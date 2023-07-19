import { NextFunction, Request, Response } from 'express';
import moment, { Moment } from 'moment';

export interface _RequisitionLimit {
  count: number;
  delay: Moment | null;
  blocked: boolean;
  time: Moment | null;
}

export class RequisitionLimit {
  private static readonly time = 5;

  private static readonly max = 5;

  public static initialize(req: Request, res: Response, next: NextFunction) {
    if (this.check(req)) return res.status(301).json({ requisitionLimit: RequisitionLimit.get(req) });
    this.start(req);
    this.limitBurst(req);
    next();
  }

  public static get(req: Request): _RequisitionLimit | undefined {
    return req.session.requisitionLimit;
  }

  public static check(req: Request): boolean {
    if (req.session.requisitionLimit?.delay) {
      if (this.totalTime(req) >= this.time) {
        this.create(req);
        return false;
      }
      return true;
    }
    return false;
  }

  private static start(req: Request) {
    if (!req.session.requisitionLimit) {
      this.create(req);
    } else {
      req.session.requisitionLimit.count += 1;
    }
  }

  private static create(req: Request) {
    req.session.requisitionLimit = {
      count: 0,
      blocked: false,
      delay: null,
      time: moment(),
    };
  }

  private static limitBurst(req: Request) {
    if (req.session.requisitionLimit?.count && req.session.requisitionLimit?.count >= this.max) {
      req.session.requisitionLimit.blocked = true;
      req.session.requisitionLimit.delay = moment();
    }
  }

  private static totalTime(req: Request): number {
    if (req.session.requisitionLimit) {
      const { time } = req.session.requisitionLimit;
      return time ? moment().diff(time, 'minutes') : 0;
    }
    return 0;
  }
}
