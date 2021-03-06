import { serverBootstrap } from '@/bootstraps/serverBootstrap';
import { logger, config } from '@/utils';
import express from 'express';

(async () => {
  const expressInstance = express();
  await serverBootstrap(expressInstance);

  expressInstance.listen(config.serverPort, () => {
    logger.info(`Server started at port :${config.serverPort}`);
  });
})();
