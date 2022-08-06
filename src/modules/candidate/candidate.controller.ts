import { ServerRoute } from '@hapi/hapi';
import { getCandidateList } from './use-cases/get-candidate-list';

export const candidateController: ServerRoute[] = [getCandidateList];
