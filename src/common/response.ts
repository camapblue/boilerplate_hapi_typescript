import Joi from "joi";
import { StatusCodes } from "http-status-codes";

export type SuccessResponse = {
  data: unknown;
};

export type ErrorResponse = {
  error: {
    message: string;
    code: StatusCodes;
    errors: Array<{
      message: string;
      code: string;
      key?: string;
      data?: unknown;
    }>;
  };
};

export type Response = SuccessResponse | ErrorResponse;

export const response = {
  success: <T = unknown>(data: T): SuccessResponse => ({
    data,
  }),
  fail: ({
    message,
    code,
    key,
    data,
    statusCodes,
  }: {
    message: string;
    code: string;
    key?: string;
    data?: unknown;
    statusCodes?: StatusCodes;
  }): ErrorResponse => ({
    error: {
      message,
      code: statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
      errors: [
        {
          message,
          code,
          key,
          data,
        },
      ],
    },
  }),
};

export const responseSuccessSchema = (data: Joi.SchemaLike) =>
  Joi.object({
    data,
  });

export const responseErrorSchema = ({
  messages,
  codes,
  data,
}: {
  messages?: string[];
  codes?: string[];
  data?: Joi.SchemaLike;
} = {}) =>
  Joi.object<ErrorResponse, true>({
    error: Joi.object({
      message: Joi.string().required(),
      code: Joi.string().required(),
      errors: Joi.array().items(
        Joi.object({
          message: messages ? Joi.valid(...messages) : Joi.string().required(),
          code: codes ? Joi.valid(...codes) : Joi.string().required(),
          key: Joi.string(),
          ...(data ? { data } : {}),
        })
      ),
    }),
  });
