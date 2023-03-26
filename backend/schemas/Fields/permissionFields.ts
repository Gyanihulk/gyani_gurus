import { cmsAnimalPermissions } from './Permission/cmsAnimal'
import { cmsArticlePermissions } from './Permission/cmsArticle'
import { cmsAssetPermissions } from './Permission/cmsAsset'
import { cmsCategoryPermissions } from './Permission/cmsCategories'
import { cmsCollectionPermissions } from './Permission/cmsCollection'
import { cmsEventPermissions } from './Permission/cmsEvent'
import { cmsFavoritePermissions } from './Permission/cmsFavorite'
import { cmsGlobalPermissions } from './Permission/cmsGlobal'
import { cmsFeaturePermissions } from './Permission/cmsFeature'
import { cmsPagePermissions } from './Permission/cmsPage'
import { cmsRolePermissions } from './Permission/cmsRole'
import { cmsSavedPermissions } from './Permission/cmsSaved'
import { cmsSettingPermissions } from './Permission/cmsSetting'
import { cmsStructurePermissions } from './Permission/cmsStructure'
import { cmsSubscriptionPermissions } from './Permission/cmsSubscription'
import { cmsTagPermissions } from './Permission/cmsTag'
import { cmsTraitPermissions } from './Permission/cmsTrait'
import { cmsUserPermissions } from './Permission/cmsUser'
import { marketCustomerPermissions } from './Permission/marketCustomer'
import { marketListingPermissions } from './Permission/marketListing'
import { marketStorePermissions } from './Permission/marketStore'
import { cmsPetsPermissions } from './Permission/cmsPets'
import { cmsTaxonomyPermissions } from './Permission/cmsTaxonomy'
import { cmsGroupsPermissions } from './Permission/cmsGroup'
import { socialCommunityPermissions } from './Permission/socialCommunity'

export const permissionFields = {
  ...cmsUserPermissions,
  ...cmsPetsPermissions,
  ...cmsRolePermissions,
  ...cmsAssetPermissions,
  ...cmsCategoryPermissions,
  ...cmsGroupsPermissions,
  ...cmsCollectionPermissions,
  ...cmsGlobalPermissions,
  ...cmsFeaturePermissions,
  ...cmsStructurePermissions,
  ...cmsTraitPermissions,
  ...cmsPagePermissions,
  ...cmsTaxonomyPermissions,
  ...cmsEventPermissions,
  ...cmsAnimalPermissions,
  ...cmsArticlePermissions,
  ...cmsSubscriptionPermissions,
  ...cmsTagPermissions,
  ...cmsSettingPermissions,
  ...cmsSavedPermissions,
  ...cmsFavoritePermissions,
  ...marketCustomerPermissions,
  ...marketListingPermissions,
  ...marketStorePermissions,
  ...socialCommunityPermissions,

}

export type Permission = keyof typeof permissionFields

export const permissionsList: Permission[] = Object.keys(permissionFields) as Permission[]
