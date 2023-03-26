import { checkbox } from '@keystone-6/core/fields'

export const socialUserPermissions = {
  canEditSocialUser: checkbox({
    defaultValue: false,
    label: 'Edit user',
  }),
  canAssignRoleToSocialUser: checkbox({
    defaultValue: false,
    label: 'Assign role to user',
  }),
  canBanSocialUser: checkbox({
    defaultValue: false,
    label: 'Ban a user globally',
  })
}
