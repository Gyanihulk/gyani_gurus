import { checkbox } from '@keystone-6/core/fields'

export const marketStorePermissions = {
  canCreateStore: checkbox({
    defaultValue: false,
    label: 'Create Store',
  }),
  canReadStore: checkbox({
    defaultValue: false,
    label: 'View Store',
  }),
  canUpdateStore: checkbox({
    defaultValue: false,
    label: 'Update Store',
  }),
  canDeleteStore: checkbox({
    defaultValue: false,
    label: 'Delete Store',
  }),
}
