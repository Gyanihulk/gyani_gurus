import { checkbox } from '@keystone-6/core/fields'

export const cmsSubscriptionPermissions = {
  canCreateSubscription: checkbox({
    defaultValue: false,
    label: 'Create Subscription',
  }),
  canReadSubscription: checkbox({
    defaultValue: false,
    label: 'View Subscription',
  }),
  canUpdateSubscription: checkbox({
    defaultValue: false,
    label: 'Update Subscription',
  }),
  canDeleteSubscription: checkbox({
    defaultValue: false,
    label: 'Delete Subscription',
  }),
}
