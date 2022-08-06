import { SortOrder } from "mongoose";

export interface IPaginationParams {
  limit: number;
  offset: number;
  page: number;
  sortType: SortOrder;
  sortField: string;
}

export interface IPagination {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface ICommonFilter extends IPaginationParams {
  name?: string;
}

export interface IDepartmentFilter extends ICommonFilter {
  companyId: string;
}

export interface IPositionFilter extends ICommonFilter {
  departmentId: string;
}

export interface ICommonFilterRequest extends Request {
  query: ICommonFilter;
}

export interface IDepartmentFilterRequest extends Request {
  query: IDepartmentFilter;
}

export interface IPositionFilterRequest extends Request {
  query: IPositionFilter;
}

export interface IResponseList<T> {
  items: T;
  pagination: IPagination;
}
