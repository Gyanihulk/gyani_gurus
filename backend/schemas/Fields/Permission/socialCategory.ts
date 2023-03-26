import { checkbox } from '@keystone-6/core/fields'

export const socialCategoryPermissions = {
  canCreateSocialCategory: checkbox({
    defaultValue: false,
    label: 'Edit a channel',
  }),
  canUpdateSocialCategory: checkbox({
    defaultValue: false,
    label: 'Set the rate limit',
  }),
  canDeleteSocialCategory: checkbox({
    defaultValue: false,
    label: 'Mute a channel',
  }),
}
