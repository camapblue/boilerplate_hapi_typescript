import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import * as Package from '../package.json';
import { RequestWrapper } from './common/handleRequest';
import { ResponseWrapper } from './common/handleResponse';
import { config } from './common';

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: Package.name,
    version: Package.version
  },
  grouping: 'tags',
  swaggerUIPath: `/${config.API_VERSION}/swaggerui/`,
  documentationPath: `/${config.API_VERSION}/documentation`,
  jsonPath: `/${config.API_VERSION}/swagger.json`,
  securityDefinitions: {
    accessToken: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ accessToken: [] }]
};

const plugins = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
  {
    plugin: RequestWrapper
  },
  {
    plugin: ResponseWrapper
  }
];

export default plugins;
