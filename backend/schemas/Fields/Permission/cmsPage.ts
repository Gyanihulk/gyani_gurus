import { checkbox } from '@keystone-6/core/fields'

export const cmsPagePermissions = {
  canCreatePage: checkbox({
    defaultValue: false,
    label: 'Create Page',
  }),
  canReadPage: checkbox({
    defaultValue: false,
    label: 'View Page',
  }),
  canUpdatePage: checkbox({
    defaultValue: false,
    label: 'Update Page',
  }),
  canDeletePage: checkbox({
    defaultValue: false,
    label: 'Delete Page',
  }),
}
