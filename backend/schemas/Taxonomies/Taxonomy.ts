import { list } from '@keystone-6/core'
import { json, relationship, text } from '@keystone-6/core/fields'
import { permissions, rules } from '../../access'
import { document } from '../Fields/document'
import slug from '../Fields/slug'

export const Taxonomy = list({
  access: {
    operation: {
      create: permissions.canCreateTag,
      query: permissions.canReadTag,
      update: permissions.canUpdateTag,
      delete: permissions.canDeleteTag,
    },
    filter: {
      query: rules.canReadTag,
      update: rules.canUpdateTag,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteTag(args),
  },
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    slug: slug('name'),
    description: document,
    meta: json(),
  },
})
