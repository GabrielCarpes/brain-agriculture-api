import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  API_PREFIX: z.string().min(1),
  API_PORT: z.coerce.number().default(3000),
  NAME: z.coerce.string().default("0.0.1"),
  VERSION: z.coerce.string().default("brain_agriculture_api"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
