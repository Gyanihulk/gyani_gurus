import { checkbox } from '@keystone-6/core/fields'

export const cmsEventPermissions = {
  canCreateEvent: checkbox({
    defaultValue: false,
    label: 'Create Event',
  }),
  canReadEvent: checkbox({
    defaultValue: false,
    label: 'View Event',
  }),
  canUpdateEvent: checkbox({
    defaultValue: false,
    label: 'Update Event',
  }),
  canDeleteEvent: checkbox({
    defaultValue: false,
    label: 'Delete Event',
  }),
}
