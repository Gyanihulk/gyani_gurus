import { list } from '@keystone-6/core'
import { file, relationship, text } from '@keystone-6/core/fields'
import { cloudinaryImage } from '@keystone-6/cloudinary'
import { isSignedIn, permissions, rules } from '../../access'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { status } from '../Fields/status'

export const Asset = list({
  access: {
    operation: {
      create: permissions.canCreateAsset,
      query: () => true,
      update: permissions.canUpdateAsset,
      delete: permissions.canDeleteAsset,
    },
    filter: {
      query: rules.canReadAsset,
      update: rules.canUpdateAsset,
    },
  },
  ui: {
    hideDelete: (args) => !permissions.canDeleteAsset(args),
  },
  fields: {
    file: file({ storage: 'files' }),
    folder: status,
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
        apiKey: process.env.CLOUDINARY_KEY || '',
        apiSecret: process.env.CLOUDINARY_SECRET || '',
      },
    }),
    altTitle: text({ validation: { isRequired: true } }),
    caption: text(),
    status,
    author: relationship({ ref: 'User.assets', ...getAuthorFieldProperties() }),
    tags: relationship({ ref: 'Tag', many: true }),
    ...dateFields,
  },
})
