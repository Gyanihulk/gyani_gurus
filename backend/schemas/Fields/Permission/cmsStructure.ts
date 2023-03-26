import { checkbox } from '@keystone-6/core/fields'

export const cmsStructurePermissions = {
  canCreateStructure: checkbox({
    defaultValue: false,
    label: 'Create Structure',
  }),
  canReadStructure: checkbox({
    defaultValue: false,
    label: 'View Structure',
  }),
  canUpdateStructure: checkbox({
    defaultValue: false,
    label: 'Update Structure',
  }),
  canDeleteStructure: checkbox({
    defaultValue: false,
    label: 'Delete Structure',
  }),
}
