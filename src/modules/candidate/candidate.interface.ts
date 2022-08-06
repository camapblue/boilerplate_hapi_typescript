import Joi from 'joi';
import { getCandidateListResponseExample } from './__test__/mock/example';

export interface Candidate {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export const getCandidateListResponse = Joi.object({
  data: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required()
  })
})
  .example(getCandidateListResponseExample)
  .label('CandidateListResponse');
