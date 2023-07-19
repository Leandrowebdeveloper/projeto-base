import { Prisma, User as _User } from '@prisma/client';
import { filterIdentify, random } from '../../utilities';
import slugify from 'slugify';
import { createValidator } from './validator';
import { ZodError } from 'zod';
import { Model } from '..';

export class User extends Model {
  protected async create(user: _User) {
    try {
      const db = this.validatorCreate();
      this.createSlug(user);
      const result = await db.user.create({
        data: { ...user },
      });
      return result;
    } catch (e) {
      return this.error(e);
    }
  }

  protected async update(id: unknown, user: _User) {
    try {
      this.updateSlug(user);
      const result = await this.db.user.update({
        where: { ...filterIdentify(id) },
        data: { ...user },
      });
      return result;
    } catch (e) {
      return this.error(e);
    }
  }

  protected async readOne(id: unknown) {
    const result = await this.db.user.findFirst({
      where: { ...filterIdentify(id) },
    });
    return result;
  }

  protected async readAll() {
    const result = await this.db.user.findMany();
    return result;
  }

  protected async delete(id: number) {
    const result = await this.db.user.delete({
      where: { id },
    });
    return result;
  }

  private validatorCreate() {
    return this.db.$extends({
      query: {
        user: {
          create({ args, query }) {
            args.data = createValidator.parse(args.data);
            return query(args);
          },
        },
      },
    });
  }

  private createSlug(user: _User) {
    user.slug = slugify(`${user.name}-${random()}`, {
      lower: true,
    });
  }

  private updateSlug(user: _User) {
    if (!!user.slug) {
      const slug = user.slug.split('-').pop();
      user.slug = slugify(`${user.name}-${slug}`, {
        lower: true,
      });
    }
  }

  protected error(e: any) {
    if (e instanceof ZodError) {
      return e.issues.map((item, i) => {
        return {
          field: item.path[0],
          message: item.message,
        };
      });
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return { error: 'Um novo usuário não pode ser criado com este e-mail.' };
      }
    }
  }
}
