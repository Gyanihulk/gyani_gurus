import { checkbox } from '@keystone-6/core/fields'

export const cmsUserPermissions = {
  canCreateUser: checkbox({
    defaultValue: false,
    label: 'Create user',
  }),
  canReadUser: checkbox({
    defaultValue: false,
    label: 'View user',
  }),
  canUpdateUser: checkbox({
    defaultValue: false,
    label: 'Update user',
  }),
  canDeleteUser: checkbox({
    defaultValue: false,
    label: 'Delete user',
  }),
}
