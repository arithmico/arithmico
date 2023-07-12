import { GetFeatureFlagsForVersionTagController } from './get-feature-flags-for-version-tag/get-feature-flags-for-version-tag.controller';
import { GetFeatureFlagsForVersionTagHandler } from './get-feature-flags-for-version-tag/get-feature-flags-for-version-tag.handler';
import { GetVersionTagByIdController } from './get-version-tag-by-id/get-version-tag-by-id.controller';
import { GetVersionTagByIdHandler } from './get-version-tag-by-id/get-version-tag-by-id.handler';
import { GetVersionTagsController } from './get-version-tags/get-version-tags.controller';
import { GetVersionTagsHandler } from './get-version-tags/get-version-tags.handler';

export const queryHandlers = [
  GetVersionTagsHandler,
  GetVersionTagByIdHandler,
  GetFeatureFlagsForVersionTagHandler,
];

export const queryControllers = [
  GetVersionTagsController,
  GetVersionTagByIdController,
  GetFeatureFlagsForVersionTagController,
];
