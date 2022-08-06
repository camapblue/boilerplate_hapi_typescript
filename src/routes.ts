import { ServerRoute } from '@hapi/hapi';
import { CandidateRoutes } from './modules/candidate';
import { MockDataRoutes } from './modules/mock-data';

const pingRoute: ServerRoute = {
  method: 'GET',
  path: `/ping`,
  options: {
    auth: false,
    description: 'To test connection to the server',
    tags: ['api'],
    handler: async () => {
      return 'Pong';
    }
  }
};

const routes: ServerRoute[] = [
  pingRoute,
  ...CandidateRoutes,
  ...MockDataRoutes
];

export default routes;
