import { randomizer } from '@/helpers/randomizer';
import { number, object, boolean, validate } from '@typeofweb/schema';
import type { Request } from 'express';

export const getRandomNumber = (request: Request) => {
  const randomNumberParamsSchema = object({
    from: number(),
    to: number(),
    includeMax: boolean(),
  });
  const randomNumberValidator = validate(randomNumberParamsSchema);
  const randomNumberParams = randomNumberValidator(request.query);

  return randomizer(
    randomNumberParams.from,
    randomNumberParams.to,
    randomNumberParams.includeMax,
  );
};
