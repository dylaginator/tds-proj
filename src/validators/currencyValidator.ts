import {z} from 'zod';

export const currencyValidator = z.object({
  id: z.number(),
  name: z.string(),
  short_code: z.string(),
  code: z.string(),
  precision: z.number(),
  subunit: z.number(),
  symbol: z.string(),
  symbol_first: z.boolean(),
  decimal_mark: z.string(),
  thousands_separator: z.string(),
});