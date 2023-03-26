import { relationship, text, timestamp, json } from '@keystone-6/core/fields'
import { list } from '@keystone-6/core'
import { dateFields } from '../Fields/dateFields'
import { rules, permissions } from '../../access'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { document } from '../Fields/document'
import { status } from '../Fields/status'
import slug from '../Fields/slug'

export const Event = list({
  access: {
    operation: {
      create: permissions.canCreateEvent,
      query: permissions.canReadEvent,
      update: permissions.canUpdateEvent,
      delete: permissions.canDeleteEvent,
    },
    filter: {
      query: rules.canReadEvent,
      update: rules.canUpdateEvent,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteEvent(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: slug('name'),
    eventType: relationship({ ref: 'Structure' }),
    content: document,
    location: json(),
    startDate: timestamp(),
    endDate: timestamp(),
    // tickets:url?
    featuredImage: relationship({ ref: 'Asset' }),
    media: relationship({ ref: 'Asset' }),
    author: relationship({ ref: 'User.events', ...getAuthorFieldProperties() }),
    status,
    tags: relationship({ ref: 'Tag.events', many: true }),
    seoTitle: text(),
    seoDescription: text(),
    seoImage: relationship({ ref: 'Asset' }),
    ...dateFields,
  },
})
