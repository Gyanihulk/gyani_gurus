import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'
import { dateFields } from '../Fields/dateFields'
import { rules, permissions } from '../../access'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { document } from '../Fields/document'
import { status } from '../Fields/status'
import slug from '../Fields/slug'

export const Listing = list({
  access: {
    operation: {
      create: permissions.canCreateListing,
      query: permissions.canReadListing,
      update: permissions.canUpdateListing,
      delete: permissions.canDeleteListing,
    },
    filter: {
      query: rules.canReadListing,
      update: rules.canUpdateListing,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteListing(args),
  },

  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: slug('title'),
    listingType: relationship({ ref: 'Structure' }),
    price: text(),
    description: document,
    store: relationship({ ref: 'Store.listings' }),
    stripeProductId: text(),
    status,
    featuredImage: relationship({
      ref: 'Asset',
    }),
    media: relationship({ ref: 'Asset' }),
    author: relationship({
      ref: 'User.listings',
      ...getAuthorFieldProperties(),
    }),
    tags: relationship({ ref: 'Tag.listings', many: true }),
    seoTitle: text(),
    seoDescription: text(),
    seoImage: relationship({ ref: 'Asset' }),
    ...dateFields,
  },
})
