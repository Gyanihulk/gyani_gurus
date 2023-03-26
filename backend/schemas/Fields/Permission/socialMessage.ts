import { checkbox } from '@keystone-6/core/fields'

export const socialMessagePermissions = {
  canEditMessage: checkbox({
    defaultValue: false,
    label: 'Edit a message',
  }),
  canDeleteMessage: checkbox({
    defaultValue: false,
    label: 'Delete a message',
  }),
}
