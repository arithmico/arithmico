import { GetMySecurityAttributesController } from './get-my-security-attributes/get-my-security-attributes.controller';
import { GetMySecurityAttributesHandler } from './get-my-security-attributes/get-my-security-attributes.handler';

export const queryHandlers = [GetMySecurityAttributesHandler];
export const queryControllers = [GetMySecurityAttributesController];
