import { getRandomNumber } from '@/api/services/randomNumberService';
import { Router } from 'express';

const exampleController = Router();

exampleController.get('/', (request, response) => {
  response.json({ value: getRandomNumber(request) });
});

export default exampleController;
