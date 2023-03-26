import { list } from '@keystone-6/core'
import { json, text } from '@keystone-6/core/fields'
import { permissions } from '../../access'
import handle from '../Fields/handle'
import { dateFields } from '../Fields/dateFields'

export const Structure = list({
  access: {
    operation: {
      create: permissions.canCreateStructure,
      query: permissions.canReadStructure,
      update: permissions.canUpdateStructure,
      delete: permissions.canDeleteStructure,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteStructure(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    handle: handle('name','unique'),
    data: json(),
    ...dateFields,
  },
})
