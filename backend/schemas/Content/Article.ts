import { relationship, text } from '@keystone-6/core/fields'
import { list } from '@keystone-6/core'
import { dateFields } from '../Fields/dateFields'
import { rules, permissions, isSignedIn } from '../../access'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { document } from '../Fields/document'
import { status } from '../Fields/status'
import slug from '../Fields/slug'


export const Article = list({
  access: {
    operation: {
      create: permissions.canCreateArticle,
      query: permissions.canReadArticle,
      update: permissions.canUpdateArticle,
      delete: permissions.canDeleteArticle,
    },
    filter: {
      query: rules.canReadArticle,
      update: rules.canUpdateArticle,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteArticle(args),
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: slug('title'),
    articleType: relationship({ ref: 'Structure' }),
    content: document,
    status,
    featuredImage: relationship({ ref: 'Asset' }),
    media: relationship({ ref: 'Asset', many: true }),
    author: relationship({
      ref: 'User.articles',
      ...getAuthorFieldProperties(),
    }),
    tags: relationship({ ref: 'Tag.articles', many: true }),
    seoTitle: text(),
    seoDescription: text(),
    seoImage: relationship({ ref: 'Asset' }),
    ...dateFields,
  },
})
