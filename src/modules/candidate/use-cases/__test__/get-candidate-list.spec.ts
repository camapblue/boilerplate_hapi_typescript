import { Server, ServerInjectResponse } from '@hapi/hapi';
import { StatusCodes } from 'http-status-codes';
import plugins from '../../../../plugins';
import { config } from '../../../../common';
import {
  employeeJwtToken,
  getCandidateListResponseExample,
  paginationParams
} from '../../__test__/mock/example';
import { candidateController } from '../../candidate.controller';

let server: Server;

const mockFunction = jest.fn();
jest.mock('../../candidate.service', () => ({
  getList: () => mockFunction()
}));

describe('candidate.controller', () => {
  beforeAll(async () => {
    server = new Server();
    await server.register(plugins);
    server.route(candidateController);
  });

  beforeEach(() => {});

  afterEach(async () => {
    expect.hasAssertions();
    jest.resetAllMocks();
  });

  describe('#Get Candidate List', () => {
    it('Should call get service and response data', async () => {
      const pagination = paginationParams;
      mockFunction.mockResolvedValueOnce(getCandidateListResponseExample.data);
      const response: ServerInjectResponse = await server.inject({
        method: 'GET',
        headers: {
          authorization: employeeJwtToken
        },
        url:
          `/api/${config.API_VERSION}/candidates?page=` +
          pagination.page +
          '&limit=' +
          pagination.limit
      });
      expect(response.result).toEqual(getCandidateListResponseExample);
      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });
});
