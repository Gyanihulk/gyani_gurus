import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'
import { document } from '../Fields/document'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { status } from '../Fields/status'
import { permissions, rules } from '../../access'
import handle from '../Fields/handle'

export const Subscription = list({
  access: {
    operation: {
      create: permissions.canCreateSubscription,
      query: permissions.canReadSubscription,
      update: permissions.canUpdateSubscription,
      delete: permissions.canDeleteSubscription,
    },
    filter: {
      query: rules.canReadSubscription,
      update: rules.canUpdateSubscription,
    },
  },

  ui: {
    hideDelete: (args) => !permissions.canDeleteSubscription(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    handle: handle('name'),
    subscriptionType: relationship({ ref: 'Structure' }),
    description: document,
    stripeSubscriptionId: text(),
    status,
    featuredImage: relationship({ ref: 'Asset' }),
    media: relationship({ ref: 'Asset', many: true }),
    author: relationship({ ref: 'User', ...getAuthorFieldProperties() }),
    seoTitle: text(),
    seoDescription: text(),
    seoImage: relationship({ ref: 'Asset', many: true }),
    customer: relationship({ ref: 'Customer.subscription', many: true }),
    ...dateFields,
  },
})
