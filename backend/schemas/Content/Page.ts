import { list } from '@keystone-6/core'
import { relationship, select, text } from '@keystone-6/core/fields'
import { document } from '../Fields/document'
import { rules, permissions, isSignedIn } from '../../access'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { status } from '../Fields/status'
import slug from '../Fields/slug'

export const Page = list({
  access: {
    operation: {
      create: permissions.canCreatePage,
      query: permissions.canReadPage,
      update: permissions.canUpdatePage,
      delete: permissions.canDeletePage,
    },
    filter: {
      query: rules.canReadPage,
      update: rules.canUpdatePage,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeletePage(args),
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: slug('title'),
    pageType: select({
      type: 'enum',
      options: [
        { label: 'Landing', value: 'landing' },
        { label: 'Homepage', value: 'homepage' },
        { label: 'Market', value: 'market' },
        { label: 'Blog', value: 'blog' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
        { label: 'Search', value: 'search' },
        { label: '404', value: 'notFound404' },
      ],
    }),
    
    content: document,
    status,
    author: relationship({ ref: 'User.pages', ...getAuthorFieldProperties() }),
    tags: relationship({ ref: 'Tag.pages', many: true }),
    parent:relationship({ref:'Page'}),
    seoTitle: text(),
    seoDescription: text(),
    seoImage: relationship({ ref: 'Asset' }),
    ...dateFields,
  },
})
