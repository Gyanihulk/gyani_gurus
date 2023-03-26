import { checkbox } from '@keystone-6/core/fields'

export const cmsRolePermissions = {
  canCreateRole: checkbox({
    defaultValue: false,
    label: 'Create Role',
  }),
  canReadRole: checkbox({
    defaultValue: false,
    label: 'View Role',
  }),
  canUpdateRole: checkbox({
    defaultValue: false,
    label: 'Update Role',
  }),
  canDeleteRole: checkbox({
    defaultValue: false,
    label: 'Delete Role',
  }),
}
