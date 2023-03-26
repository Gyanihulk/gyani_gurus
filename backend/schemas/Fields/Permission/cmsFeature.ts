import { checkbox } from '@keystone-6/core/fields'

export const cmsFeaturePermissions = {
  canCreateFeature: checkbox({
    defaultValue: false,
    label: 'Create Feature',
  }),
  canReadFeature: checkbox({
    defaultValue: false,
    label: 'View Feature',
  }),
  canUpdateFeature: checkbox({
    defaultValue: false,
    label: 'Update Feature',
  }),
  canDeleteFeature: checkbox({
    defaultValue: false,
    label: 'Delete Feature',
  }),
}
