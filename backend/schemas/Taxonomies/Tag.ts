import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'
import { permissions, rules } from '../../access'
import { dateFields } from '../Fields/dateFields'
import { document } from '../Fields/document'
import slug from '../Fields/slug'
import { taxonomyTag as taxonomy } from '../Fields/taxonomyTag'

export const Tag = list({
  access: {
    operation: {
      create: permissions.canCreateTag,
      query: permissions.canReadTag,
      update: permissions.canUpdateTag,
      delete: permissions.canDeleteTag,
    },
    filter: {
      query: rules.canReadTag,
      update: rules.canUpdateTag,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteTag(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: slug('name'),
    description: document,
    parent:relationship({ ref:'Tag' }),
    taxonomy,
    asset: relationship({ ref: 'Asset' }),
    listings: relationship({
      ref: 'Listing.tags',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    stores: relationship({
      ref: 'Store.tags',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    animals: relationship({
      ref: 'Animal.tags',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    articles: relationship({
      ref: 'Article.tags',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    events: relationship({
      ref: 'Event.tags',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    pages: relationship({
      ref: 'Page.tags',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    traits: relationship({
      ref: 'Trait.tags',
      many: true,
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    ...dateFields,
  },
})
