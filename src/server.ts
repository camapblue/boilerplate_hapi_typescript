import * as Hapi from '@hapi/hapi';
import plugins from './plugins';
import routes from './routes';
import databases from './databases';
import { config, logger, errorHandler } from './common';

export const createServer = async () => {
  const server = Hapi.server({
    port: config.SERVER_PORT,
    host: config.SERVER_HOST,
    routes: {
      validate: {
        options: {
          abortEarly: false
        },
        failAction: errorHandler
      },
      cors: true
    }
  });

  await server.register(plugins);

  server.route(routes);

  return server;
};

const start = async () => {
  await databases.connect();

  const server = await createServer();

  await server.start();

  logger.info(`Server running on ${server.info.uri}`);

  return server;
};
start();
