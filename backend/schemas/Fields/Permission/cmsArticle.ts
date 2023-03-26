import { checkbox } from '@keystone-6/core/fields'

export const cmsArticlePermissions = {
  canCreateArticle: checkbox({
    defaultValue: false,
    label: 'Create Article',
  }),
  canReadArticle: checkbox({
    defaultValue: false,
    label: 'View Article',
  }),
  canUpdateArticle: checkbox({
    defaultValue: false,
    label: 'Update Article',
  }),
  canDeleteArticle: checkbox({
    defaultValue: false,
    label: 'Delete Article',
  }),
}
