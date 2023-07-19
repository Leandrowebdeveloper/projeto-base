import { z } from 'zod';

export const loginValidator = z.object({
  email: z.string().nonempty('Email obrigatório.').email('Email não valido.'),
  slug: z.never(),
  name: z.never(),
  password: z.string().nonempty('Senha obrigatório.'),
});
