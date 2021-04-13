import { randomizer } from '@/helpers/randomizer';
import type { Request } from 'express';

export const getRandomNumber = (request: Request) => {
  const { from, to, includeMax } = request.query;

  return randomizer(+from, +to, !!includeMax);
};
