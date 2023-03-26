import { list } from '@keystone-6/core'
import { json, relationship, text } from '@keystone-6/core/fields'
import { permissions, rules } from '../../access'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import handle from '../Fields/handle'

export const Saved = list({
  access: {
    operation: {
      create: permissions.canCreateSaved,
      query: permissions.canReadSaved,
      update: permissions.canUpdateSaved,
      delete: permissions.canDeleteSaved,
    },
    filter: {
      query: rules.canReadSaved,
      update: rules.canUpdateSaved,
    },
    item: {
      create: rules.canCreateSaved,
      update: rules.canUpdateSaved,
      delete: rules.canDeleteSaved,
    },
  },
  ui: {
    hideCreate: (args) => !permissions.canCreateSaved(args),
    hideDelete: (args) => !permissions.canDeleteSaved(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    handle: handle('name'),
    data: json(),
    author: relationship({ ref: 'User.saved', ...getAuthorFieldProperties() }),
    ...dateFields,
  },
})
