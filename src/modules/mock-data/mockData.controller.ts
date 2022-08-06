import { ServerRoute } from '@hapi/hapi';
import { getCandidateList } from './use-cases/get-candidate-list';

export const mockDataController: ServerRoute[] = [
  getCandidateList,
];
