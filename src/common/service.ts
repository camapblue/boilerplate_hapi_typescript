type SuccessResult<SuccessData> = {
  data: SuccessData;
};
type ErrorResult<ErrorCode, ErrorData> = {
  message: string;
  code: ErrorCode;
  key?: string;
  data?: ErrorData;
};

export type ServiceResult<
  SuccessData = null,
  ErrorCode extends string = never,
  ErrorData = null
> = SuccessResult<SuccessData> | ErrorResult<ErrorCode, ErrorData>;

export const ServiceResult = {
  isError<A, B extends string, C>(
    data: ServiceResult<A, B, C>
  ): data is ErrorResult<B, C> {
    return "code" in data;
  },
  isSuccess<A, B extends string, C>(
    data: ServiceResult<A, B, C>
  ): data is SuccessResult<A> {
    return !("code" in data);
  },
};
