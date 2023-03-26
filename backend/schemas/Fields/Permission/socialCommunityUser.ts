import { checkbox } from '@keystone-6/core/fields'

export const socialCommunityUserPermissions = {
  canaddUserToCommunity: checkbox({
    defaultValue: false,
    label: 'Add a user to a community',
  }),
  caneditUserCommunityInformation: checkbox({
    defaultValue: false,
    label: 'Edit a user community informations',
  }),
  canRemoveUserFromCommunity: checkbox({
    defaultValue: false,
    label: 'Remove a user from a community',
  }),
  canMuteUserInCommunity: checkbox({
    defaultValue: false,
    label: 'Mute a user in a community',
  }),
  canBanUserInCommunity: checkbox({
    defaultValue: false,
    label: 'Ban a user from a community',
  }),

}
