import { json, text, relationship, virtual } from '@keystone-6/core/fields'
import { graphqlString } from '../../mutations'
import { graphql, list } from '@keystone-6/core'
import { dateFields } from '../Fields/dateFields'
import { document } from '../Fields/document'
import { isSignedIn, permissions, rules } from '../../access'
import slug from '../Fields/slug'


export const Category = list({
  access: {
    operation: {
      create: ()=>true,
      query: ()=>true,
      update: ()=>true,
      delete: permissions.canDeleteCategory,
    },
    item: {
      create: ()=>true,
      update: rules.canUpdatePets,
      delete: rules.canDeletePets,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteCategory(args),
  },
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    slug: slug('name'),
    description: document,
    parent: relationship({ ref: 'Category.children' }),
    taxonomy: relationship({ ref: 'Taxonomy', many: true }),
    asset: relationship({ ref: 'Asset' }),
    meta: json(),
    children: relationship({ ref: 'Category.parent', many: true }),
    groups:relationship({ref:'Group.category', many:true}),
    ...dateFields,
  },
})
