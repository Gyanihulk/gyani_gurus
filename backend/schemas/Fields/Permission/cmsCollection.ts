import { checkbox } from '@keystone-6/core/fields'

export const cmsCollectionPermissions = {
  canCreateCollection: checkbox({
    defaultValue: false,
    label: 'Create Collection',
  }),
  canReadCollection: checkbox({
    defaultValue: false,
    label: 'View Collection',
  }),
  canUpdateCollection: checkbox({
    defaultValue: false,
    label: 'Update Collection',
  }),
  canDeleteCollection: checkbox({
    defaultValue: false,
    label: 'Delete Collection',
  }),
}

