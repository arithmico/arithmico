import { GetHealthController } from './get-health/get-health.controller';
import { GetHealthHandler } from './get-health/get-health.handler';

export const queryHandlers = [GetHealthHandler];
export const queryControllers = [GetHealthController];
