import { checkbox } from '@keystone-6/core/fields'

export const cmsPetsPermissions = {
  canUpdatePets: checkbox({
    defaultValue: false,
    label: 'Update Pets',
  }),
  canDeletePets: checkbox({
    defaultValue: false,
    label: 'Delete Pets',
  }),
}
