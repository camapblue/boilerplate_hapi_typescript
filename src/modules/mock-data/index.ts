import { ServerRoute } from '@hapi/hapi';
import { mockDataController } from './mockData.controller';

export const MockDataRoutes: ServerRoute[] = [...mockDataController];
