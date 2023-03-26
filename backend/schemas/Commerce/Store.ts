import { list } from '@keystone-6/core'
import { json, relationship, text } from '@keystone-6/core/fields'
import { document } from '../Fields/document'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { status } from '../Fields/status'
import { permissions, rules } from '../../access'
import slug from '../Fields/slug'

export const Store = list({
  access: {
    operation: {
      create: permissions.canCreateStore,
      query: permissions.canReadStore,
      update: permissions.canUpdateStore,
      delete: permissions.canDeleteStore,
    },
    filter: {
      query: rules.canReadStore,
      update: rules.canUpdateStore,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteStore(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: slug('name'),
    storeType: relationship({ ref: 'Structure' }),
    description: document,
    listings: relationship({ ref: 'Listing.store' }),
    location: json(),
    stripeStoreId: text(),
    status,
    featuredImage: relationship({ ref: 'Asset' }),
    media: relationship({ ref: 'Asset' }),
    author: relationship({ ref: 'User.store', ...getAuthorFieldProperties() }),
    tags: relationship({ ref: 'Tag.stores', many: true }),
    seoTitle: text(),
    seoDescription: text(),
    seoImage: relationship({ ref: 'Asset' }),
    ...dateFields,
  },
})
