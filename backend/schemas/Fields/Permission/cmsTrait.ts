import { checkbox } from '@keystone-6/core/fields'

export const cmsTraitPermissions = {
  canCreateTrait: checkbox({
    defaultValue: false,
    label: 'Create Trait',
  }),
  canReadTrait: checkbox({
    defaultValue: false,
    label: 'View Trait',
  }),
  canUpdateTrait: checkbox({
    defaultValue: false,
    label: 'Update Trait',
  }),
  canDeleteTrait: checkbox({
    defaultValue: false,
    label: 'Delete Trait',
  }),
}
