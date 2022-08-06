import Joi from "joi";
import { SortOrder } from "mongoose";

export const mockDataValidator = Joi.object({
  "x-mock-data": Joi.string().optional(),
})
  .default("false")
  .options({ allowUnknown: true });

export const GET_LIST_DEFAULT_LIMIT = 25;
export const GET_LIST_DEFAULT_PAGE = 1;
export const GET_LIST_DEFAULT_SORT_FIELD = "createdAt";
export const GET_LIST_DEFAULT_SORT_TYPE: SortOrder = 1;
