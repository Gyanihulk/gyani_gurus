import { checkbox } from '@keystone-6/core/fields'

export const cmsAssetPermissions = {
  canCreateAsset: checkbox({
    defaultValue: false,
    label: 'Create Asset',
  }),
  canReadAsset: checkbox({
    defaultValue: false,
    label: 'View Asset',
  }),
  canUpdateAsset: checkbox({
    defaultValue: false,
    label: 'Update Asset',
  }),
  canDeleteAsset: checkbox({
    defaultValue: false,
    label: 'Delete Asset',
  }),
}

