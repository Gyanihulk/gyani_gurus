import { checkbox } from '@keystone-6/core/fields'

export const cmsFavoritePermissions = {
  canCreateFavorite: checkbox({
    defaultValue: false,
    label: 'Create Favorite',
  }),
  
  canReadFavorite: checkbox({
    defaultValue: false,
    label: 'View Favorite',
  }),
  canUpdateFavorite: checkbox({
    defaultValue: false,
    label: 'Update Favorite',
  }),
  canDeleteFavorite: checkbox({
    defaultValue: false,
    label: 'Delete Favorite',
  }),
}
