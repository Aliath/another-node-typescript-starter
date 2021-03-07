import { config } from '@/utils/config';
import logger from '@/utils/logger';
import { paramCase } from 'change-case';
import type { Router } from 'express';
import readDirRecursive from 'fs-readdir-recursive';
import { resolve as pathResolve } from 'path';

type RegisteredController = {
  path: string;
  handler: Router;
};

let registeredControllers: RegisteredController[] = [];

export const scanForControllers = async (path = '../api/controllers') => {
  const controllersDirectory = pathResolve(__dirname, path);

  const filenames = readDirRecursive(controllersDirectory);
  const filteredFilenames = filenames.filter((name) => name.endsWith('.ts'));

  for (const controllerPath of filteredFilenames) {
    const { default: controllerHandler } = await import(
      pathResolve(controllersDirectory, controllerPath)
    );

    const transformedPath =
      '/' +
      controllerPath
        .split('/')
        .map((item) => paramCase(item.replace('.ts', '')))
        .join('/');

    registeredControllers = registeredControllers.concat({
      path: transformedPath,
      handler: controllerHandler,
    });

    logger.info(
      `Controller for path ${config.apiNamespace}${transformedPath} has been registered!`,
    );
  }
};

export const getRegisteredControllers = () => {
  return [...registeredControllers];
};
