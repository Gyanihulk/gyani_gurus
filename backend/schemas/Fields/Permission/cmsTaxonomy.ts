import { checkbox } from '@keystone-6/core/fields'

export const cmsTaxonomyPermissions = {
  canUpdateTaxonomy: checkbox({
    defaultValue: false,
    label: 'Update Taxonomy',
  }),
  canDeleteTaxonomy: checkbox({
    defaultValue: false,
    label: 'Delete Taxonomy',
  }),
}
