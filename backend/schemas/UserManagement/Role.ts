import { text, relationship, virtual } from '@keystone-6/core/fields'
import { group, list, graphql } from '@keystone-6/core'
import { permissions } from '../../access'
import { dateFields } from '../Fields/dateFields'

import { cmsRolePermissions } from '../Fields/Permission/cmsRole'
import { cmsAssetPermissions } from '../Fields/Permission/cmsAsset'
import { cmsCategoryPermissions } from '../Fields/Permission/cmsCategories'
import { cmsUserPermissions } from '../Fields/Permission/cmsUser'
import { cmsCollectionPermissions } from '../Fields/Permission/cmsCollection'
import { cmsGlobalPermissions } from '../Fields/Permission/cmsGlobal'
import { cmsFeaturePermissions } from '../Fields/Permission/cmsFeature'
import { cmsStructurePermissions } from '../Fields/Permission/cmsStructure'
import { cmsTraitPermissions } from '../Fields/Permission/cmsTrait'
import { cmsPagePermissions } from '../Fields/Permission/cmsPage'
import { cmsEventPermissions } from '../Fields/Permission/cmsEvent'
import { cmsAnimalPermissions } from '../Fields/Permission/cmsAnimal'
import { cmsArticlePermissions } from '../Fields/Permission/cmsArticle'
import { cmsSubscriptionPermissions } from '../Fields/Permission/cmsSubscription'
import { cmsSettingPermissions } from '../Fields/Permission/cmsSetting'
import { cmsTagPermissions } from '../Fields/Permission/cmsTag'
import { cmsSavedPermissions } from '../Fields/Permission/cmsSaved'
import { cmsFavoritePermissions } from '../Fields/Permission/cmsFavorite'
import { marketStorePermissions } from '../Fields/Permission/marketStore'
import { marketListingPermissions } from '../Fields/Permission/marketListing'
import { marketCustomerPermissions } from '../Fields/Permission/marketCustomer'
import { socialUserPermissions } from '../Fields/Permission/socialUser'
import { socialRolePermissions } from '../Fields/Permission/socialRole'
import { socialChannelPermissions } from '../Fields/Permission/socialChannel'
import { socialMessagePermissions } from '../Fields/Permission/socialMessage'
import { socialCommunityPermissions } from '../Fields/Permission/socialCommunity'
import { socialCommunityUserPermissions } from '../Fields/Permission/socialCommunityUser'
import { socialCommunityFeedPermissions } from '../Fields/Permission/socialCommunityFeed'
import { socialCategoryPermissions } from '../Fields/Permission/socialCategory'
import { cmsPetsPermissions } from '../Fields/Permission/cmsPets'
import { cmsTaxonomyPermissions } from '../Fields/Permission/cmsTaxonomy'
import { cmsGroupsPermissions } from '../Fields/Permission/cmsGroup'

export const Role = list({
  access: {
    operation: {
      create: permissions.canCreateRole,
      query: () => true,
      update: permissions.canUpdateRole,
      delete: permissions.canDeleteRole,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    handle: text(),
    description: text({ validation: { isRequired: true } }),
    ...dateFields,
    permissions: virtual({
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
      field: graphql.field({
        type: graphql.JSON,
        async resolve(item) {  
          delete item["id"] 
          delete item["name"]   
          delete item["handle"]   
          delete item["description"]   
          delete item["dateCreated"]   
          delete item["dateUpdated"]   
          return item
        },
      }),
    }),
    ...group({
      label: 'CMS User Permission',
      description: 'CMS User Permission',
      fields: {
        ...cmsUserPermissions,
      },
    }),
    ...group({
      label: 'CMS Role Permission',
      description: 'CMS Role Permission',
      fields: {
        ...cmsRolePermissions,
      },
    }),
    ...group({
      label: 'CMS Asset Permission',
      description: 'CMS Asset Permission',
      fields: {
        ...cmsAssetPermissions,
      },
    }),
    ...group({
      label: 'CMS Pets Permission',
      description: 'CMS Pets Permission',
      fields: {
        ...cmsPetsPermissions,
      },
    }),
    ...group({
      label: 'CMS Taxonomy Permission',
      description: 'CMS Taxonomy Permission',
      fields: {
        ...cmsTaxonomyPermissions,
      },
    }),
    ...group({
      label: 'CMS Category Permission',
      description: 'CMS Category Permission',
      fields: {
        ...cmsCategoryPermissions,
      },
    }),
    ...group({
      label: 'CMS Collection Permission',
      description: 'CMS Collection Permission',
      fields: {
        ...cmsCollectionPermissions,
      },
    }),
    ...group({
      label: 'CMS Global Permission',
      description: 'CMS Global Permission',
      fields: {
        ...cmsGlobalPermissions,
      },
    }),
    ...group({
      label: 'CMS Structure Permission',
      description: 'CMS Structure Permission',
      fields: {
        ...cmsStructurePermissions,
      },
    }),
    ...group({
      label: 'CMS Trait Permission',
      description: 'CMS Trait Permission',
      fields: {
        ...cmsTraitPermissions,
      },
    }),
    ...group({
      label: 'CMS Group Permission',
      description: 'CMS Group Permission',
      fields: {
        ...cmsGroupsPermissions,
      },
    }),
    ...group({
      label: 'CMS Page Permission',
      description: 'CMS Page Permission',
      fields: {
        ...cmsPagePermissions,
      },
    }),
    ...group({
      label: 'CMS Event Permissios',
      description: 'CMS Event Permissios',
      fields: {
        ...cmsEventPermissions,
      },
    }),
    ...group({
      label: 'CMS Animal Permission',
      description: 'CMS Animal Permission',
      fields: {
        ...cmsAnimalPermissions,
      },
    }),
    ...group({
      label: 'CMS Article Permission',
      description: 'CMS Article Permission',
      fields: {
        ...cmsArticlePermissions,
      },
    }),
    ...group({
      label: 'CMS Subscription Permission',
      description: 'CMS Subscription Permission',
      fields: {
        ...cmsSubscriptionPermissions,
      },
    }),
    ...group({
      label: 'CMS Setting Permission',
      description: 'CMS Setting Permission',
      fields: {
        ...cmsSettingPermissions,
      },
    }),
    ...group({
      label: 'CMS Feature Permission',
      description: 'CMS Feature Permission',
      fields: {
        ...cmsFeaturePermissions,
      },
    }),
    ...group({
      label: 'CMS Tag Permission',
      description: 'CMS Tag Permission',
      fields: {
        ...cmsTagPermissions,
      },
    }),
    ...group({
      label: 'CMS Saved Permission',
      description: 'CMS Saved Permission',
      fields: {
        ...cmsSavedPermissions,
      },
    }),
    ...group({
      label: 'CMS Favorite Permission',
      description: 'CMS Favorite Permission',
      fields: {
        ...cmsFavoritePermissions,
      },
    }),
    ...group({
      label: 'Market Store Permission',
      description: 'Market Store Permission',
      fields: {
        ...marketStorePermissions,
      },
    }),
    ...group({
      label: 'Market Listing Permission',
      description: 'Market Listing Permission',
      fields: {
        ...marketListingPermissions,
      },
    }),
    ...group({
      label: 'Market Customer Permission',
      description: 'Market Customer Permission',
      fields: {
        ...marketCustomerPermissions,
      },
    }),
    ...group({
      label: 'Social User Permission',
      description: 'Social User Permission',
      fields: {
        ...socialUserPermissions,
      },
    }),
    ...group({
      label: 'Social Role Permission',
      description: 'Social Role Permission',
      fields: {
        ...socialRolePermissions,
      },
    }),
    ...group({
      label: 'Social Channel Permission',
      description: 'Social Channel Permission',
      fields: {
        ...socialChannelPermissions,
      },
    }),
    ...group({
      label: 'Social Message Permission',
      description: 'Social Message Permission',
      fields: {
        ...socialMessagePermissions,
      },
    }),
    ...group({
      label: 'Social Community Permission',
      description: 'Social Community Permission',
      fields: {
        ...socialCommunityPermissions,
      },
    }),
    ...group({
      label: 'Social Community Users Permission',
      description: 'Social Community Users  Permission',
      fields: {
        ...socialCommunityUserPermissions,
      },
    }),
    ...group({
      label: 'Social Community Feed Permission',
      description: 'Social Community Feed  Permission',
      fields: {
        ...socialCommunityFeedPermissions,
      },
    }),
    ...group({
      label: 'Social Category Permission',
      description: 'Social Category  Permission',
      fields: {
        ...socialCategoryPermissions,
      },
    }),

    assignedTo: relationship({
      ref: 'User.role', // TODO: Add this to the User
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
})
