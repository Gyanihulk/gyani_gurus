import { checkbox } from '@keystone-6/core/fields'

export const cmsGlobalPermissions = {
  canCreateGlobal: checkbox({
    defaultValue: false,
    label: 'Create Global',
  }),
  canReadGlobal: checkbox({
    defaultValue: false,
    label: 'View Global',
  }),
  canUpdateGlobal: checkbox({
    defaultValue: false,
    label: 'Update Global',
  }),
  canDeleteGlobal: checkbox({
    defaultValue: false,
    label: 'Delete Global',
  }),
}
