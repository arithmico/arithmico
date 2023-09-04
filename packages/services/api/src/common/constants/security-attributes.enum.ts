export enum SecurityAttribute {
  // security policies
  SecurityPoliciesWrite = 'security-policies:write',
  SecurityPoliciesRead = 'security-policies:read',

  // users
  UsersRead = 'users:read',
  UsersWrite = 'users:write',

  // user groups
  UserGroupsWrite = 'user-groups:write',
  UserGroupsRead = 'user-groups:read',

  // version tags
  VersionTagsRead = 'version-tags:read',
  VersionTagsWrite = 'veresion-tags:write',

  // feature flags
  FeatureFlagsRead = 'feature-flags:read',
  FeatureFlagsWrite = 'feature-flags:write',

  // configuration
  ConfigurationsRead = 'configurations:read',
  ConfigurationsWrite = 'configurations:write',

  // configuration revision
  ConfigurationRevisionsRead = 'configurations:revisions:read',
  ConfigurationRevisionsWrite = 'configurations:revisions:write',

  // build job
  BuildJobWrite = 'build-jobs:write',
  BuildJobRead = 'build-jobs:read',
}
