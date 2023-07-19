import { Request, Response } from 'express';
import { generateCsrf, getData, getQuery, objectEmpty } from '../utilities';
import { User } from '../Model/User';
import { User as _User } from '@prisma/client';

export class UserController extends User {
  public async edit(req: Request, res: Response) {
    const { id }: Required<Pick<_User, 'id'>> = getQuery<Required<Pick<_User, 'id'>>>(req);
    const _csrf = generateCsrf(req);
    if (id) {
      const user = await this.readOne(id);
      this.exit();
      if (user) return res.status(200).json({ ...user, _csrf });
      return res.status(200).json({ error: 'Usuário não foi existe' });
    }
    return res.status(200).json({
      email: null,
      password: null,
      name: null,
      slug: null,
      _csrf,
    });
  }

  public async findAll(req: Request, res: Response) {
    try {
      const user = await this.readAll();
      this.exit();

      if (user) return res.status(200).json(user);
      return res.status(301).json({ error: 'Não foi possivel listar usuários.' });
    } catch (error) {
      return res.status(301).json({ error: 'Um erro inesperado ocorreu. Tente novamente.' });
    }
  }

  public async findOne(req: Request, res: Response) {
    try {
      const { id }: Required<Pick<_User, 'id'>> = getQuery<Required<Pick<_User, 'id'>>>(req);

      if (objectEmpty({ id })) {
        return res.status(301).json({ error: 'Não e permitido campos vazios.' });
      }

      const user = await this.readOne(id);
      this.exit();

      if (user) return res.status(200).json(user);
      return res.status(200).json({ error: 'Não foi possivel listar usuários.' });
    } catch (error) {
      return res.status(301).json({ error: 'Um erro inesperado ocorreu. Tente novamente.' });
    }
  }

  public async inset(req: Request, res: Response) {
    try {
      const data: _User = getData<_User>(req);

      const user = await this.create(data);
      this.exit();

      if (user) return res.status(200).json(user);
      return res.status(200).json({ error: 'Não foi possivel cadastrar usuários.' });
    } catch (error) {
      return res.status(301).json({ error });
    }
  }

  public async modernize(req: Request, res: Response) {
    try {
      let id!: string | number;
      const data: _User = getData<_User>(req);

      if (objectEmpty(data)) {
        return res.status(301).json({ error: 'Não e permitido campos vazios.' });
      }

      if (data.id) {
        id = data.id;
      } else {
        id = data.slug;
      }

      const user = await this.readOne(id);

      if (user) {
        this.setSlug(data, user.slug);
        const update = await this.update(id, data);
        this.exit();
        return res.status(200).json(update);
      }

      this.exit();
      return res.status(301).json({ error: 'Não foi possivel editar usuários.' });
    } catch (error) {
      return res.status(301).json({ error });
    }
  }

  private setSlug(data: _User, slug: string) {
    if (data.name) data.slug = slug;
  }
}
