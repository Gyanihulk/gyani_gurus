import { list } from '@keystone-6/core'
import { json, relationship, text } from '@keystone-6/core/fields'
import { permissions, rules } from '../../access'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import handle from '../Fields/handle'

export const Favorite = list({
  access: {
    operation: {
      create: permissions.canCreateFavorite,
      query: permissions.canReadFavorite,
      update: permissions.canUpdateFavorite,
      delete: permissions.canDeleteFavorite,
    },
    filter: {
      query: rules.canReadFavorite,
      update: rules.canUpdateFavorite,
    },
  },
  ui: {
    hideCreate: (args) => !permissions.canCreateFavorite(args),
    hideDelete: (args) => !permissions.canDeleteFavorite(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    handle: handle('name'),
    data: json(),
    author: relationship({ ref: 'User.favorite', ...getAuthorFieldProperties() }),
    ...dateFields,
  },
})
