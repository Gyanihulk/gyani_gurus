import { checkbox } from '@keystone-6/core/fields'

export const cmsSavedPermissions = {
  canCreateSaved: checkbox({
    defaultValue: false,
    label: 'Create Saved',
  }),
  canReadSaved: checkbox({
    defaultValue: false,
    label: 'View Saved',
  }),
  canUpdateSaved: checkbox({
    defaultValue: false,
    label: 'Update Saved',
  }),
  canDeleteSaved: checkbox({
    defaultValue: false,
    label: 'Delete Saved',
  }),
}
