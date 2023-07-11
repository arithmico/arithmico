import { GetVersionTagByIdController } from './get-version-tag-by-id/get-version-tag-by-id.controller';
import { GetVersionTagByIdHandler } from './get-version-tag-by-id/get-version-tag-by-id.handler';
import { GetVersionTagsController } from './get-version-tags/get-version-tags.controller';
import { GetVersionTagsHandler } from './get-version-tags/get-version-tags.handler';

export const queryHandlers = [GetVersionTagsHandler, GetVersionTagByIdHandler];

export const queryControllers = [
  GetVersionTagsController,
  GetVersionTagByIdController,
];
