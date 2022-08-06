import { IPaginationParams } from '../../common/pagination';
import { Candidate } from './candidate.interface';
import { CandidateModel } from './candidate.model';

export const getAll = async () => {
  const candidates = await CandidateModel.find();
  return candidates;
};

export const countByParameter = async (
  filter: Record<string, unknown>
): Promise<number> => {
  return CandidateModel.count(filter).exec();
};

export const getList = async (
  filter: Record<string, unknown>,
  paginationParams: IPaginationParams
): Promise<Candidate[]> => {
  const { limit, offset, sortField, sortType } = paginationParams;
  return CandidateModel.find(filter)
    .limit(limit)
    .skip(offset)
    .sort({ [sortField]: sortType })
    .exec();
};
