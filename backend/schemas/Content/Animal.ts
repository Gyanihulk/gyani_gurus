import { relationship, text } from '@keystone-6/core/fields'
import { list } from '@keystone-6/core'
import { dateFields } from '../Fields/dateFields'
import { rules, permissions, isSignedIn } from '../../access'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { document } from '../Fields/document'
import { status } from '../Fields/status'
import slug from '../Fields/slug'

export const Animal = list({
  access: {
    operation: {
      create: permissions.canCreateAnimal,
      query: permissions.canReadAnimal,
      update: permissions.canUpdateAnimal,
      delete: permissions.canDeleteAnimal,
    },
    filter: {
      query: rules.canReadAnimal,
      update: rules.canUpdateAnimal,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteAnimal(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: slug('name'),
    animalType: relationship({ ref: 'Structure' }),
    scientificName: text({ validation: { isRequired: true } }),
    content: document,
    status,
    featuredImage: relationship({ ref: 'Asset' }),
    media: relationship({ ref: 'Asset', many: true }),
    author: relationship({
      ref: 'User.animals',
      ...getAuthorFieldProperties(),
    }),
    tags: relationship({ ref: 'Tag.animals' }),
    seoTitle: text(),
    seoDescription: text(),
    seoImage: relationship({ ref: 'Asset' }),
    ...dateFields,
  },
})
