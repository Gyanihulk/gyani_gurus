import { checkbox } from '@keystone-6/core/fields'

export const cmsSettingPermissions = {
  canCreateSetting: checkbox({
    defaultValue: false,
    label: 'Create Setting',
  }),
  canReadSetting: checkbox({
    defaultValue: false,
    label: 'View Setting',
  }),
  canUpdateSetting: checkbox({
    defaultValue: false,
    label: 'Update Setting',
  }),
  canDeleteSetting: checkbox({
    defaultValue: false,
    label: 'Delete Setting',
  }),
}
