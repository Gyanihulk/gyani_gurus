import { select } from '@keystone-6/core/fields'

export const statusUser = select({
  type: 'enum',
  options: [
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Suspended', value: 'suspended' },
    { label: 'Locked', value: 'locked' },
    { label: 'Inactive', value: 'inactive' },
  ],
  defaultValue: 'pending',
})

export const businessCategory = select({
  type: 'enum',
  options: [
    { label: 'Pet Store', value: 'petStore' },
    { label: 'Expo', value: 'expo' },
    { label: 'Vet Clinic', value: 'vetClinic' },
    { label: 'Breeder', value: 'breeder' },
    { label: 'Pet Rescue', value: 'petRescue' },
    { label: 'Non-profit', value: 'nonProfit' },
    { label: 'Other', value: 'other' },
  ],
  ui: {
    itemView: {
      fieldMode: async ({ item }) => (item.type === 'business' ? 'edit' : 'hidden'),
    },
  },
  hooks: {
    validateInput: async ({ addValidationError, inputData, operation }) => {
      if (operation === 'create') {
        if (inputData.type === 'business' && !inputData.businessCategory) {
          addValidationError('Please select a business Category')
        }
      }
    },
  },
})

export const userType = select({
  type: 'enum',
  options: [
    { label: 'User', value: 'user' },
    { label: 'Business', value: 'business' },
  ],
  defaultValue: 'user',
})
