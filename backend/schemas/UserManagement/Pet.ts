import { list } from '@keystone-6/core'
import { float, json, relationship, text } from '@keystone-6/core/fields'
import { permissions, rules } from '../../access'
import { document } from '../Fields/document'
import { statusUser as status } from '../Fields/userFields'
import { petSex as sex } from '../Fields/petFields'
export const Pet = list({
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: permissions.canDeletePets,
    },
    item: {
      create: ()=>true,
      update: rules.canUpdatePets,
      delete: rules.canDeletePets,
    },
  },
  ui: {
    // hide the backend UI from regular Petss
    hideDelete: (args) => !permissions.canDeletePets(args),
  },
  fields: {
    name: text(),
    status,
    about: document,
    avatar: relationship({ ref: 'Asset' }),
    coverPhoto: relationship({ ref: 'Asset' }),
    owner:relationship({ref:'User.pets'}),
    category:relationship({ref:'Category'}),
    traits:relationship({ref:'Trait',many:true}),
    sex,
    weight:float(),
    length:float(),
    diet:json(),
    origin:json(),
    metadata:json(),
  },
})
