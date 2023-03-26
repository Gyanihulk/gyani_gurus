import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'
import { permissions, rules } from '../../access'
import { dateFields } from '../Fields/dateFields'
import { status } from '../Fields/status'

export const Customer = list({
  access: {
    operation: {
      create: permissions.canCreateCustomer,
      query: permissions.canReadCustomer,
      update: permissions.canUpdateCustomer,
      delete: permissions.canDeleteCustomer,
    },
    filter: {
      query: rules.canReadCustomer,
      update: rules.canUpdateCustomer,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteCustomer(args),
  },
  fields: {
    user: relationship({ ref: 'User.customer', many: true }),
    customerType: relationship({ ref: 'Structure' }),
    stripeCustomerId: text({ validation: { isRequired: true } }),
    subscription: relationship({ ref: 'Subscription.customer' }),
    status,
    ...dateFields,
  },
})
