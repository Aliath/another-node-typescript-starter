import { serverBootstrap } from '@/bootstraps/serverBootstrap';
import { config } from '@/utils/config';
import { logger } from '@/utils/logger';
import express from 'express';

(async () => {
  const expressInstance = express();
  await serverBootstrap(expressInstance);

  expressInstance.listen(config.serverPort, () => {
    logger.info(`Server started at port :${config.serverPort}`);
  });
})();
