import { ServerRoute } from '@hapi/hapi';
import { candidateController } from './candidate.controller';

export const CandidateRoutes: ServerRoute[] = [...candidateController];
