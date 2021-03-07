import { config } from '@/utils/config';
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
  getRegisteredControllers().forEach(({ path, handler }) => {
    namespaceRouter.use(path, handler);
  });

  expressInstance.use(config.apiNamespace, namespaceRouter);
  expressInstance.use(errorHandler);
};
