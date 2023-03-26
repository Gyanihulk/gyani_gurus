import { json, relationship, text } from '@keystone-6/core/fields'
import { list } from '@keystone-6/core'
import { dateFields } from '../Fields/dateFields'
import { getAuthorFieldProperties } from '../Fields/getAuthorFieldProperties'
import { status } from '../Fields/status'
import { permissions, rules } from '../../access'
import handle from '../Fields/handle'


export const Setting = list({
  access: {
    operation: {
      create: ()=>true,
      query: ()=>true,
      update: ()=>true,
      delete: permissions.canDeleteSetting,
    },
    filter: {
      query: rules.canReadSetting,
      update: rules.canUpdateSetting,
    },
  },
  
  ui: {
    hideDelete: (args) => !permissions.canDeleteSetting(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    handle: handle('name'),
    data: json({hooks: {
      resolveInput: async ({ operation, inputData, context, resolvedData }) => {
        let data
        if (operation === 'create' || operation === 'update') {
          if (inputData.name) {
            data = {
              level: 'user',
              isPushNotifiable: true,
              channelId: 'string',
              communityId: 'string',
              notifiableEvents: [
                {
                  name: 'post.created',
                  moduleName: 'chat',
                  isPushNotifiable: true,
                  titleTemplate: 'string',
                  bodyTemplate: 'string',
                },
              ],
            }
          }
        }
        return resolvedData
      },
    },}),
    author: relationship({ ref: 'User', ...getAuthorFieldProperties() }),
    status,
    ...dateFields,
  },
})
