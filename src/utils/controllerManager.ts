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

const availableExtensions = ['.ts', '.js'];
let registeredControllers: RegisteredController[] = [];

const stripExtensions = (fileName: string) => {
  return availableExtensions.reduce(
    (fileName, extension) => fileName.replace(extension, ''),
    fileName,
  );
};

export const scanForControllers = async (path = '../api/controllers') => {
  const controllersDirectory = pathResolve(__dirname, path);

  const filenames = readDirRecursive(controllersDirectory);
  const filteredFilenames = filenames.filter((name) =>
    availableExtensions.some((extension) => name.endsWith(extension)),
  );

  for (const controllerPath of filteredFilenames) {
    const { default: controllerHandler } = await import(
      pathResolve(controllersDirectory, controllerPath)
    );

    const transformedPath =
      '/' +
      controllerPath
        .split('/')
        .map((fileName) => paramCase(stripExtensions(fileName)))
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
