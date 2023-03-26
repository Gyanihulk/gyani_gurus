import { select } from '@keystone-6/core/fields'

export const status = select({
  type: 'enum',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
    { label: 'Archived', value: 'archived' },
  ],
  defaultValue: 'draft',
})
