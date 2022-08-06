import { Lifecycle, Request, ResponseToolkit } from "@hapi/hapi";
import { ValidationError } from "joi";
import { ErrorList, ERROR_CODE, JoiValidationErrors } from "../common/errors";
import { ErrorDetails, AppError } from "./appError";
interface JoiValidationErrors {
  [index: string]: ERROR_CODE;
}

export const formatError = (error: Error) => {
  if ((error as ValidationError).isJoi) {
    const details = (error as ValidationError).details;
    const mappedDetails = details.reduce<ErrorDetails[]>(
      (acc, detail, index) => {
        if (index !== 0 && detail.path[0] === details[index - 1].path[0]) {
          return acc;
        }

        const constraint = detail.type.split(".").pop() || "";
        const errorCode =
          (JoiValidationErrors as JoiValidationErrors)[constraint] ||
          ERROR_CODE.INVALID_FIELD;
        const defaultError = ErrorList[errorCode];
        acc.push({
          message: detail.message || defaultError.message,
          code: errorCode,
          key: detail.path.join(".") as string,
        });

        return acc;
      },
      []
    );
    throw new AppError(ERROR_CODE.INVALID_REQUEST, mappedDetails);
  }

  throw error;
};

export const errorHandler: Lifecycle.Method = (
  _req: Request,
  res: ResponseToolkit,
  err?: Error
) => {
  if (!err) {
    return res.continue;
  }
  return formatError(err);
};
