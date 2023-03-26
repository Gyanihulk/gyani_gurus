import { checkbox } from '@keystone-6/core/fields'

export const marketCustomerPermissions = {
  canCreateCustomer: checkbox({
    defaultValue: false,
    label: 'Create Customer',
  }),
  canReadCustomer: checkbox({
    defaultValue: false,
    label: 'View Customer',
  }),
  canUpdateCustomer: checkbox({
    defaultValue: false,
    label: 'Update Customer',
  }),
  canDeleteCustomer: checkbox({
    defaultValue: false,
    label: 'Delete Customer',
  }),
}
