import { StatusCodes } from "http-status-codes";
import { ERROR_CODE } from "./errors";

export interface IErrorDetail {
  message: string;
  key: string;
  code: string;
}

export interface IError<ErrorEnumType> {
  code: ErrorEnumType | number;
  message: string;
  businessCode?: string;
  errors?: IErrorDetail[];
  statusCode?: StatusCodes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalData?: any;
}

export interface IHttpResponseBody {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IAdditionalData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export class ResponseBase<DataType, ErrorEnumType> {
  private body: IHttpResponseBody;
  private statusCode: StatusCodes;
  constructor() {
    this.body = {};
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
  success(data: DataType, statusCode: StatusCodes = StatusCodes.OK): void {
    this.body = data;
    this.statusCode = statusCode;
  }

  fail(
    error: IError<ErrorEnumType>,
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    additionalData?: IAdditionalData
  ): void {
    this.body.error = error;
    this.statusCode = statusCode;
    if (additionalData) {
      this.body.additionalData = additionalData;
    }
  }

  getBody(): IHttpResponseBody {
    return this.body;
  }

  getError(): IError<ErrorEnumType> | undefined {
    return this.body.error;
  }

  getStatusCode(): StatusCodes {
    return this.statusCode;
  }
}

export class HttpResponse<T> extends ResponseBase<T, ERROR_CODE> {
  constructor() {
    super();
  }
}
