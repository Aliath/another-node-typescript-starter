import { paramCase } from 'change-case';
import type { Router } from 'express';
import { promises as fs } from 'fs';
import { resolve as pathResolve } from 'path';

import logger from './logger';

type RegisterControllerParams = {
  path: string;
  handler: Router;
};

const registeredControllers = new Map();

export const registerController = ({
  path,
  handler,
}: RegisterControllerParams) => {
  if (registeredControllers.has(path)) {
    logger.error(`Controller ${path} will be overrided!`);
  }

  logger.info(`Controller ${path} has been registered!`);
  registeredControllers.set(path, handler);
};

export const scanForControllers = async (path = '../api/controllers') => {
  const controllersDirectory = pathResolve(__dirname, path);

  const filenames = await fs.readdir(controllersDirectory);
  const filteredFilenames = filenames.filter((name) => name.endsWith('.ts'));

  for (const controllerPath of filteredFilenames) {
    const { default: controllerHandler } = await import(
      pathResolve(controllersDirectory, controllerPath)
    );

    const transformedPath = '/' + paramCase(controllerPath.replace('.ts', ''));
    registerController({
      path: transformedPath,
      handler: controllerHandler,
    });
  }
};

export const getRegisteredControllers = (): Record<string, Router> => {
  return Object.fromEntries(registeredControllers);
};
