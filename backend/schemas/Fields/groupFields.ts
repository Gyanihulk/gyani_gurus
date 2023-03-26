import { select } from '@keystone-6/core/fields'

export const privacy = select({
  type: 'enum',
  options: [
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
  ],
  defaultValue: 'private',
})
