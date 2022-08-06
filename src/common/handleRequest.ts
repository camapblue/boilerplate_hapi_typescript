import * as Boom from "@hapi/boom";
import {
  Plugin,
  Request,
  ResponseToolkit,
  Server,
  ServerAuthScheme,
} from "@hapi/hapi";
import * as jwt from "jsonwebtoken";
import { AppRole } from './enum';

const handleHapiRequest = async (
  hapiRequest: Request,
  hapiResponse: ResponseToolkit
) => {
  if (
    hapiRequest.headers["content-type"] &&
    hapiRequest.headers["content-type"].includes("application/json")
  ) {
    hapiRequest.headers["content-type"] = "application/json";
  }
  // HapiSwagger only pick 'x-forwarded-host' header and ignore port so need this fix
  // ../../node_modules/hapi-swagger/lib/builder.js - internals.getHost()
  const xForwardedHost = hapiRequest.headers["x-forwarded-host"] || null;
  const xForwardedPort = hapiRequest.headers["x-forwarded-port"] || null;
  const xReferer = hapiRequest.headers["referer"] || null;
  if (xForwardedHost && xForwardedHost.indexOf(":") < 0 && xForwardedPort) {
    hapiRequest.headers[
      "x-forwarded-host"
    ] = `${xForwardedHost}:${xForwardedPort}`;
  }
  if (xReferer && xReferer.startsWith("https://")) {
    hapiRequest.headers["x-forwarded-proto"] = "https";
  }
  if (
    hapiRequest.headers["x-mock-data"] &&
    hapiRequest.headers["x-mock-data"] === "true"
  ) {
    hapiRequest.setUrl(`/mock${hapiRequest.path}`);
  }

  return hapiResponse.continue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RequestWrapper: Plugin<any> = {
  name: "requestWrapper",
  version: "1.0.0",
  register: (server: Server) => {
    server.ext("onRequest", handleHapiRequest);

    server.auth.scheme("custom", authScheme);
    server.auth.strategy("default", "custom");
    server.auth.default("default");
  },
  once: true,
};

const authScheme: ServerAuthScheme = () => {
  return {
    authenticate: async (request, h) => {
      const authorization = request.raw.req.headers["authorization"];
      if (!authorization) {
        throw Boom.unauthorized("Authorization Token not found", "custom");
      }

      const token = authorization.replace(/^Bearer\s+/, "");
      const data = jwt.decode(token, { complete: true });
      if (
        typeof data?.payload !== "object" ||
        typeof data.payload.username !== "string"
      ) {
        throw Boom.unauthorized("Authorization token is not valid", "custom");
      }

      const user = {
        email: 'dummy@mail.com'
      }

      return h.authenticated({
        credentials: { user, scope: [AppRole.Employee] },
      });
    },
  };
};
