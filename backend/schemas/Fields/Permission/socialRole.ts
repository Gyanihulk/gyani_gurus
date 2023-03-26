import { checkbox } from '@keystone-6/core/fields'

export const socialRolePermissions = {
  canCreateSocialRole: checkbox({
    defaultValue: false,
    label: 'Create a new role',
  }),
  canEditSocialRole: checkbox({
    defaultValue: false,
    label: 'Edit a role',
  }),
  canDeleteSocialRole: checkbox({
    defaultValue: false,
    label: 'Delete a role',
  }),
}
