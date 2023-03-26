import { checkbox } from '@keystone-6/core/fields'

export const marketListingPermissions = {
  canCreateListing: checkbox({
    defaultValue: false,
    label: 'Create Listing',
  }),
  canReadListing: checkbox({
    defaultValue: false,
    label: 'View Listing',
  }),
  canUpdateListing: checkbox({
    defaultValue: false,
    label: 'Update Listing',
  }),
  canDeleteListing: checkbox({
    defaultValue: false,
    label: 'Delete Listing',
  }),
}
