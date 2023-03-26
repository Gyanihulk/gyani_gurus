import { checkbox } from '@keystone-6/core/fields'

export const socialChannelPermissions = {
  canEditChannel: checkbox({
    defaultValue: false,
    label: 'Edit a channel',
  }),
  canSetRateLimit: checkbox({
    defaultValue: false,
    label: 'Set the rate limit',
  }),
  canMuteChannel: checkbox({
    defaultValue: false,
    label: 'Mute a channel',
  }),
  canCloseChannel: checkbox({
    defaultValue: false,
    label: 'Close a channel',
  }),
}
