import { Candidate } from './candidate.interface';
import * as CandidateRepository from './candidate.repository';
import {
  ICommonFilter,
  IPagination,
  IPaginationParams,
  IResponseList
} from '../../common/pagination';
import {
  GET_LIST_DEFAULT_LIMIT,
  GET_LIST_DEFAULT_PAGE,
  GET_LIST_DEFAULT_SORT_TYPE
} from '../../common/constant';
export const getAllCandidates = async (): Promise<Candidate[]> => {
  const candidates = await CandidateRepository.getAll();
  return candidates;
};

export const setFilterList = (
  filter: ICommonFilter
): Record<string, unknown> => {
  const search: Record<string, unknown> = {};
  if (filter.name) {
    search.$or = [{ name: { $regex: filter.name, $options: 'i' } }];
  }
  return search;
};

export const getPaginationParams = (
  parameter: ICommonFilter
): ICommonFilter => {
  const limit = parameter.limit ? parameter.limit : GET_LIST_DEFAULT_LIMIT;

  const page = parameter.page ? parameter.page : GET_LIST_DEFAULT_PAGE;

  const offset = (page - 1) * limit;

  const sortType = GET_LIST_DEFAULT_SORT_TYPE;

  const sortField = parameter.sortField || 'name';

  const paginationParams: ICommonFilter = {
    limit,
    offset,
    page,
    sortField,
    sortType
  };

  return paginationParams;
};

export const getList = async (
  filter: ICommonFilter
): Promise<IResponseList<Candidate[]>> => {
  const paginationParams: IPaginationParams = getPaginationParams(filter);
  const queryParams = setFilterList(filter);

  const [items, totalItems]: [Candidate[], number] = await Promise.all([
    CandidateRepository.getList(queryParams, paginationParams),
    CandidateRepository.countByParameter(queryParams)
  ]);
  const pagination: IPagination = {
    totalItems,
    page: paginationParams.page,
    totalPages: Math.ceil(Number(totalItems) / paginationParams.limit),
    limit: paginationParams.limit
  };
  const result: IResponseList<Candidate[]> = {
    items,
    pagination
  };
  return result;
};
