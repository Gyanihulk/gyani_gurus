import { graphql, list } from '@keystone-6/core'
import {
  checkbox,
  json,
  password,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields'
import { permissions, rules } from '../../access'
import { document } from '../Fields/document'
import { dateFields } from '../Fields/dateFields'
import { businessCategory, statusUser as status, userType } from '../Fields/userFields'

import { graphqlString } from '../../mutations'
import { createUsername } from '../../lib/stringHelpers'


export const User = list({
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: permissions.canDeleteUser,
    },
    item: {
      create: () => true,
      update: rules.canUpdateUser,
      delete: rules.canDeleteUser,
    },
  },
  ui: {
    // hide the backend UI from regular users
    hideCreate: (args) => !permissions.canCreateUser(args),
    hideDelete: (args) => !permissions.canDeleteUser(args),
  },
  fields: {
    name: text({
      hooks: {
        resolveInput: async ({ inputData, operation, item, context }) => {
          if (operation === 'create') {
            if (!inputData.name && inputData.type !== 'business') {
              return `${inputData.firstName} ${inputData.lastName}`
            }
            if (inputData.name && inputData.type === 'business') {
              return inputData.name
            }
          }
          if (operation === 'update') {
            const user = await context.query.User.findOne({
              where: { email: item.email },
              query: graphqlString`
              accessToken
              `,
            })
            return inputData.name
          }
        },
      },
      validation: { isRequired: true },
    }),
    username: text({
      hooks: {
        resolveInput: async ({ inputData, operation, context, item }) => {
          let username
          if (operation === 'create') {
            if (inputData.username) {
              username = inputData.username
            } else if (inputData?.name && inputData.type === 'business') {
              username = await createUsername(context.query, inputData?.name, operation)
            } else {
              username = await createUsername(
                context.query,
                `${inputData.firstName} ${inputData.lastName}` as string,
                operation,
              )
            }
          }
          if (operation === 'update') {
            if (inputData.username) {
              username = inputData.username.toLowerCase()
            } else {
              return item?.username
            }
          }
          return username
        },
        validateInput: async ({ addValidationError, context, operation, inputData }) => {
          if (operation === 'create') {
            if (!inputData.name && inputData?.type == 'business') {
              addValidationError('name is mandatory for business type User')
            }
          }
          if (operation === 'update' || operation === 'create') {
            let getUserWithUsername
            const validRegEx = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/
            if (inputData.username) {
              getUserWithUsername = await context.db.User.findOne({
                where: { username: inputData.username },
              })
              if (!validRegEx.test(inputData.username)) {
                addValidationError('Please enter a valid username.')
              }
            }
            if (getUserWithUsername) {
              addValidationError(
                'Someone already has that username. Please choose another.',
              )
            }
          }
        },
      },

      isIndexed: 'unique',
      validation: { isRequired: true },
    }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    password: password({ validation: { isRequired: true } }),
    phoneNumber: text(),
    about: document,
    website: text(),
    termsAndCondition: checkbox({
      defaultValue: false,
      graphql: {
        create: {
          isNonNull: true,
        },
      },
      hooks: {
        validateInput: async ({ inputData, operation, addValidationError }) => {
          if (operation === 'create') {
            const { termsAndCondition } = inputData
            if (termsAndCondition === false) {
              addValidationError('Terms need to be accepted')
            }
          }
        },
      },
    }),
    location: json(),
    businessCategory,
    type: userType,
    tokenExpiryTime: timestamp(),
    avatar: relationship({ ref: 'Asset' }),
    coverPhoto: relationship({ ref: 'Asset' }),
    role: relationship({
      ref: 'Role.assignedTo',
    }),
    following: relationship({
      ref: 'User.followers',
      many: true,
    }),
    followers: relationship({
      ref: 'User.following',
      many: true,
    }),
    groups: relationship({ ref: 'Group.members', many: true }),
    pinnedGroups: relationship({ ref: 'Group', many: true }),
    groupInvites: relationship({ ref: 'Group.invitedMember', many: true }),
    groupManager: relationship({ ref: 'Group.manager', many: true }),
    listings: relationship({
      ref: 'Listing.author',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),

    animals: relationship({
      ref: 'Animal.author',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    pets: relationship({ ref: 'Pet.owner', many: true }),
    articles: relationship({
      ref: 'Article.author',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    events: relationship({
      ref: 'Event.author',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    pages: relationship({
      ref: 'Page.author',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    customer: relationship({
      ref: 'Customer.user',
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    store: relationship({
      ref: 'Store.author',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    assets: relationship({
      ref: 'Asset.author',
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    traits: relationship({
      ref: 'Trait.author',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    saved: relationship({
      ref: 'Saved.author',
      many: true,
    }),
    favorite: relationship({
      ref: 'Favorite.author',
      many: true,
    }),
    otherAccounts: relationship({
      ref: 'User',
      many: true,
    }),
    magicToken: text(),
    status,
    metadata: json(),
    ...dateFields,
  },
})
