import { PrismaClient } from '@prisma/client';

export class Model {
  private _db!: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  protected get db(): PrismaClient {
    return this._db;
  }

  private set db(value: PrismaClient) {
    this._db = value;
  }

  protected async exit() {
    await this.db.$disconnect();
  }

  protected static get user() {
    return new PrismaClient().user;
  }
}
