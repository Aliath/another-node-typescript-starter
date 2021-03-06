import {
  getRegisteredControllers,
  scanForControllers,
} from '@/utils/controllerManager';
import { errorHandler } from '@/utils/errorHandler';
import { json as bodyParserJSON } from 'body-parser';
import { Express, Router } from 'express';

export const serverBootstrap = async (expressInstance: Express) => {
  expressInstance.use(bodyParserJSON());

  const namespaceRouter = Router();
  await scanForControllers();
  Object.entries(getRegisteredControllers()).forEach(([path, handler]) => {
    namespaceRouter.use(path, handler);
  });
  expressInstance.use('/api/v1', namespaceRouter);
  expressInstance.use(errorHandler);
};
