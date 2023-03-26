import { relationship, text, checkbox, select } from '@keystone-6/core/fields'
import { document } from '../Fields/document'
import { permissions, rules } from '../../access'
import handle from '../Fields/handle'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { ListAccessArgs } from '../../types'

export const Feature = {
  access: {
    operation: {
      create: permissions.canCreateFeature,
      query: permissions.canReadFeature,
      update: permissions.canUpdateFeature,
      delete: permissions.canDeleteFeature,
    },
  },
  ui: {
    hideDelete: (args: ListAccessArgs) => !permissions.canDeleteFeature(args),
  },
  fields: {
    enabled: checkbox({
      defaultValue: false,
      label: 'Enabled',
    }),
    name: text({ validation: { isRequired: true } }),
    handle: handle('name', 'unique'),
    description: document,
    users: relationship({
      ref: 'User',
      many: true,
    }),
    roles: relationship({
      ref: 'Role',
      many: true,
    }),
    author: relationship({ ref: 'User', ...getAuthorFieldProperties() }),
    ...dateFields,
  },
}
