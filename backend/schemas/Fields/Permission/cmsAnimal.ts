import { checkbox } from '@keystone-6/core/fields'

export const cmsAnimalPermissions = {
  canCreateAnimal: checkbox({
    defaultValue: false,
    label: 'Create Animal',
  }),
  
  canReadAnimal: checkbox({
    defaultValue: false,
    label: 'View Animal',
  }),
  canUpdateAnimal: checkbox({
    defaultValue: false,
    label: 'Update Animal',
  }),
  canDeleteAnimal: checkbox({
    defaultValue: false,
    label: 'Delete Animal',
  }),
}
