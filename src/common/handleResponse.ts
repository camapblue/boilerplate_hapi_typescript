import { Plugin, Request, ResponseToolkit, Server } from "@hapi/hapi";
import { AppError } from "./appError";
import { HttpResponse } from "./httpResponse";
import { logger } from "./logger";

const documentPathRegex = /\/(documentation|swagger\.json|swaggerui\/(.*))$/;

const handleHapiResponse = (
  hapiRequest: Request,
  hapiResponse: ResponseToolkit
) => {
  // ignore method options or document ui path
  if (
    hapiRequest.method === "options" ||
    documentPathRegex.test(hapiRequest.url.pathname)
  ) {
    return hapiResponse.continue;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const httpResponse = new HttpResponse<any>();
  const responseData = hapiResponse.request.response;

  if (responseData instanceof Error) {
    // parse raw error not coming from server handler, ex: joi validation
    if (!responseData.isServer) {
      httpResponse.fail(
        {
          message: responseData.output.payload.message,
          code: responseData.output.payload.statusCode,
        },
        responseData.output.statusCode
      );
    }

    logger.error(responseData.message, responseData);
    if (responseData instanceof AppError) {
      const errors = responseData.getErrors();
      httpResponse.fail(
        {
          message: errors.message,
          code: errors.code,
          errors: errors.errors,
        },
        errors.statusCode
      );
    } else {
      httpResponse.fail(
        {
          message: responseData.output.payload.message,
          code: responseData.output.payload.statusCode,
        },
        responseData.output.statusCode
      );
    }
  } else {
    httpResponse.success(responseData.source, responseData.statusCode);
  }
  return hapiResponse
    .response(httpResponse.getBody())
    .code(httpResponse.getStatusCode());
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResponseWrapper: Plugin<any> = {
  name: "responseWrapper",
  version: "1.0.0",
  register: (server: Server) => {
    server.ext("onPreResponse", handleHapiResponse);
  },
  once: true,
};
