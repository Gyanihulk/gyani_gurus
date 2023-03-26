import { checkbox } from '@keystone-6/core/fields'

export const cmsCategoryPermissions = {
  canCreateCategory: checkbox({
    defaultValue: false,
    label: 'Create Category',
  }),
  canReadCategory: checkbox({
    defaultValue: false,
    label: 'View Category',
  }),
  canUpdateCategory: checkbox({
    defaultValue: false,
    label: 'Update Category',
  }),
  canDeleteCategory: checkbox({
    defaultValue: false,
    label: 'Delete Category',
  }),
}
