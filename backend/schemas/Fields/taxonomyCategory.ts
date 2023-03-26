import { select } from '@keystone-6/core/fields'

export const taxonomyCategory = select({
  type: 'enum',
  options: [
    { label: 'Market', value: 'market' },
    { label: 'Events', value: 'events' },
    { label: 'Groups', value: 'groups' },
    { label: 'Articles', value: 'articles' },
    { label: 'Pets', value: 'pets' },
  ],
  defaultValue: 'market',
})