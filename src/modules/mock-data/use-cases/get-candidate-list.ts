import { candidateListMock } from '../mocks/candidate';
import { config } from '../../../common';

export const getCandidateList = {
  method: 'GET',
  path: `/mock/api/${config.API_VERSION}/candidates`,
  options: {
    description: 'Get candidates list',
    tags: ['api', 'mock'],
    handler: async () => {
      return candidateListMock;
    }
  }
};
