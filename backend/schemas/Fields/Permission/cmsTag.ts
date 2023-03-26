import { checkbox } from '@keystone-6/core/fields'

export const cmsTagPermissions = {
  canCreateTag: checkbox({
    defaultValue: false,
    label: 'Create Tag',
  }),
  canReadTag: checkbox({
    defaultValue: false,
    label: 'View Tag',
  }),
  canUpdateTag: checkbox({
    defaultValue: false,
    label: 'Update Tag',
  }),
  canDeleteTag: checkbox({
    defaultValue: false,
    label: 'Delete Tag',
  }),
}

