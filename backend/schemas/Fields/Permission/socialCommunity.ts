import { checkbox } from '@keystone-6/core/fields'

export const socialCommunityPermissions = {
  canEditCommunity: checkbox({
    defaultValue: false,
    label: 'Edit a Community',
  }),
  canDeleteCommunity: checkbox({
    defaultValue: false,
    label: 'Delete a Community',
  }),
}
