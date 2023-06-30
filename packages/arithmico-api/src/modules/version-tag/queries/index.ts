import { GetVersionTagsController } from './get-version-tags/get-version-tags.controller';
import { GetVersionTagsHandler } from './get-version-tags/get-version-tags.handler';

export const queryHandlers = [GetVersionTagsHandler];
export const queryControllers = [GetVersionTagsController];
