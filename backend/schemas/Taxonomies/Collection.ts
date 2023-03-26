import { list } from '@keystone-6/core'
import { json, relationship, text } from '@keystone-6/core/fields'
import { permissions,rules } from '../../access'
import handle from '../Fields/handle'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { status } from '../Fields/status'

export const Collection = list({
  access: {
    operation: {
      create: permissions.canCreateCollection,
      query: permissions.canReadCollection,
      update: permissions.canUpdateCollection,
      delete: permissions.canDeleteCollection,
    },
    filter: {
      query: rules.canReadCollection,
      update: rules.canUpdateCollection,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteCollection(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    handle: handle('name', 'unique'),
    // items:relationship(),
    author: relationship({ ref: 'User', ...getAuthorFieldProperties() }),
    status,
    tags: relationship({ ref: 'Tag', many: true }),
    data: json(),
    ...dateFields,
  },
})
