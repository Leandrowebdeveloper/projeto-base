import { z } from 'zod';
import { bcrypt } from '../../utilities';

export const createValidator = z.object({
  email: z.string().nonempty('Email obrigatório.').email('Email não valido.'),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().nonempty('Nome obrigatório.'),
  password: z
    .string()
    .nonempty('Senha obrigatório.')
    .min(8, 'Senha não pode ser menor que 8 caracters.')
    .max(32, 'Senha não pode ser menor que 32 caracters.')
    .transform(val => bcrypt(val)),
});
