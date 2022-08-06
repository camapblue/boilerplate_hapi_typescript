import { queryValidator } from '../candidate.validator';

import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { StatusCodes } from 'http-status-codes';
import { AppRole, response, config } from '../../../common';
import { mockDataValidator } from '../../../common/constant';
import { getCandidateListResponse } from '../candidate.interface';
import * as CandidateService from '../candidate.service';
import { ICommonFilterRequest } from '../../../common/pagination';

export const getCandidateList: ServerRoute = {
  method: 'GET',
  path: `/api/${config.API_VERSION}/candidates`,
  options: {
    auth: {
      scope: [AppRole.Employee]
    },
    description: 'Get candidates list',
    tags: ['api', 'candidate'],
    validate: {
      headers: mockDataValidator,
      query: queryValidator
    },
    handler: async (request: ICommonFilterRequest, h: ResponseToolkit) => {
      const candidates = await CandidateService.getList(request.query);
      return h
        .response(response.success({ ...candidates }))
        .code(StatusCodes.OK);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          [StatusCodes.OK]: {
            description: 'Get successfully',
            schema: getCandidateListResponse
          }
        }
      }
    }
  }
};
