import { graphql, list } from '@keystone-6/core'
import { checkbox, json, relationship, text, virtual } from '@keystone-6/core/fields'
import { permissions, rules } from '../../access'
import { graphqlString } from '../../mutations'
import { document } from '../Fields/document'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { privacy } from '../Fields/groupFields'
import { statusUser as status } from '../Fields/userFields'

export const Group = list({
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: permissions.canDeleteGroups,
    },
    item: {
      create: () => true,
      update: rules.canUpdateGroups,
      delete: rules.canDeleteGroups,
    },
  },
  ui: {
    // hide the backend UI from regular Groups
    hideDelete: (args) => !permissions.canDeleteCommunity(args),
  },

  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    status,
    about: document,
    coverImage: relationship({ ref: 'Asset' }),
    avatar: relationship({ ref: 'Asset' }),
    category: relationship({ ref: 'Category.groups' }),
    manager: relationship({
      ref: 'User.groupManager',
      many: true,
      ...getAuthorFieldProperties(),
    }),
    members: relationship({ ref: 'User.groups', many: true }),
    invitedMember: relationship({ ref: 'User.groupInvites', many: true }),
    onlyAdminsCanPost: checkbox({
      defaultValue: false,
      label: 'Only Admins Can Post',
    }),
    approveMemberPosts: checkbox({
      defaultValue: false,
      label: 'Approve Member Posts',
    }),
    verified: checkbox({
      defaultValue: false,
      label: 'Verified',
    }),
    privacy,
    metadata: json(),  
  },
})
