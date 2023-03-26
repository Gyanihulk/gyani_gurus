import { timestamp } from '@keystone-6/core/fields'

export const dateFields = {
  dateCreated: timestamp({
    defaultValue: { kind: 'now' },
    ui: {
      itemView: { fieldMode: 'hidden' },
      createView: { fieldMode: 'hidden' },
    },
  }),
  dateUpdated: timestamp({
    defaultValue: { kind: 'now' },
    ui: {
      itemView: { fieldMode: 'hidden' },
      createView: { fieldMode: 'hidden' },
    },
    db: { updatedAt: true },
  }),
}
