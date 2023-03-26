import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'
import { document } from '../Fields/document'
import { dateFields } from '../Fields/dateFields'
import { rules, permissions, isSignedIn } from '../../access'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { status } from '../Fields/status'
import slug from '../Fields/slug'

export const Trait = list({
  access: {
    operation: {
      create: permissions.canCreateTrait,
      query: permissions.canReadTrait,
      update: permissions.canUpdateTrait,
      delete: permissions.canDeleteTrait,
    },
    filter: {
      query: rules.canReadTrait,
      update: rules.canUpdateTrait,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteTrait(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: slug('name'),
    animalType: relationship({ ref: 'Structure' }),
    content: document,
    status,
    featuredImage: relationship({ ref: 'Asset' }),
    media: relationship({ ref: 'Asset', many: true }),
    author: relationship({ ref: 'User.traits', ...getAuthorFieldProperties() }),
    tags: relationship({ ref: 'Tag.traits', many: true }),
    seoTitle: text(),
    seoDescription: text(),
    seoImage: relationship({ ref: 'Asset' }),
    ...dateFields,
  },
})
