import { relationship, text, json } from '@keystone-6/core/fields'
import { isSignedIn, permissions, rules } from '../../access'
import handle from '../Fields/handle'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { status } from '../Fields/status'
import { ListAccessArgs } from '../../types'

export const Global = {
  access: {
    operation: {
      create: permissions.canCreateGlobal,
      query: permissions.canReadGlobal,
      update: permissions.canUpdateGlobal,
      delete: permissions.canDeleteGlobal,
    },
    filter: {
      query: rules.canReadGlobal,
      update: rules.canUpdateGlobal,
    },
  },
  ui: {
    hideDelete: (args: ListAccessArgs) => !permissions.canDeleteGlobal(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    handle: handle('name', 'unique'),
    data: json(),
    author: relationship({ ref: 'User', ...getAuthorFieldProperties() }),
    status,
    ...dateFields,
  },
}
