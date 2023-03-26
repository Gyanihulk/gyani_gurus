/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BaseListTypeInfo, CommonFieldConfig } from '@keystone-6/core/types'

export const getAuthorFieldProperties =
  (): CommonFieldConfig<BaseListTypeInfo> => ({
    hooks: {
      resolveInput({ operation, resolvedData, context }) {
        // Default to the currently logged in user on create.
        if (
          operation === 'create' &&
          !resolvedData.user &&
          context.session?.itemId
        ) {
          return { connect: { id: context.session?.itemId } }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return resolvedData.user
      },
    },
    ui: {
      itemView: { fieldMode: 'hidden' },
      createView: { fieldMode: 'hidden' },
    },
  })
