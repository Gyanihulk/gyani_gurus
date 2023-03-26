import { select } from '@keystone-6/core/fields'

export const taxonomyTag = select({
  type: 'enum',
  options: [
    { label: 'Posts', value: 'posts' },
    { label: 'Listings', value: 'listings' },
    { label: 'Events', value: 'events' },
    { label: 'Groups', value: 'groups' },
    { label: 'Articles', value: 'articles' },
    { label: 'Pets', value: 'pets' },
  ],
  defaultValue: 'posts',
})