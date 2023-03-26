import { select } from '@keystone-6/core/fields'

export const petSex = select({
  type: 'enum',
  options: [
    { label: 'Unknown', value: 'unknown' },
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Mixed', value: 'mixed' },
  ],
  defaultValue: 'unknown',
})
