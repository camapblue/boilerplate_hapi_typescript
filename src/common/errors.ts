import { StatusCodes } from "http-status-codes";

const MONGO_ERROR = "MongoError";
enum MONGO_ERROR_CODE {
  DUPLICATED_KEY = 11000,
}

enum ERROR_CODE {
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  DUPLICATED_KEY = "DUPLICATED_KEY",
  FIELD_REQUIRED = "FIELD_REQUIRED",
  INVALID_REQUEST = "INVALID_REQUEST",
  INVALID_FIELD = "INVALID_FIELD",
}

// customized error message for joi
const JoiValidationErrors = {
  required: ERROR_CODE.FIELD_REQUIRED,
};

const ErrorList = {
  // Common Errors
  [ERROR_CODE.NOT_FOUND]: {
    statusCode: StatusCodes.NOT_FOUND,
    message: "Not Found",
    code: StatusCodes.NOT_FOUND,
  },
  [ERROR_CODE.INTERNAL_ERROR]: {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal Error",
    code: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  [ERROR_CODE.INVALID_REQUEST]: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Request format incorrect",
    code: StatusCodes.BAD_REQUEST,
  },
  [ERROR_CODE.INVALID_FIELD]: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "This field does not have the correct format.",
    code: StatusCodes.BAD_REQUEST,
  },
  [ERROR_CODE.FIELD_REQUIRED]: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "This field is required.",
    code: 50003,
  },
  [ERROR_CODE.DUPLICATED_KEY]: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Key Mongo Id is Duplicated",
    code: 50001,
  },
};

export {
  ERROR_CODE,
  ErrorList,
  JoiValidationErrors,
  MONGO_ERROR,
  MONGO_ERROR_CODE,
};
