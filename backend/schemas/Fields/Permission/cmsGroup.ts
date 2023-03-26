import { checkbox } from '@keystone-6/core/fields'

export const cmsGroupsPermissions = {
  canUpdateGroups: checkbox({
    defaultValue: false,
    label: 'Update Groups',
  }),
  canDeleteGroups: checkbox({
    defaultValue: false,
    label: 'Delete Groups',
  }),
}
