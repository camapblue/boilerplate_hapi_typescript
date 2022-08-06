import Joi from 'joi';
export const headerValidator = Joi.object({
  applicationmode: Joi.string().optional()
}).options({ allowUnknown: true });

export const queryValidator = Joi.object({
  name: Joi.string(),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1)
}).label('CandidateQuery');
