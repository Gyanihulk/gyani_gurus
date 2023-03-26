import { query } from 'express-validator'
import { graphqlString } from './mutations'
import { Permission, permissionsList } from './schemas/Fields/permissionFields'
import { ListAccessArgs } from './types'

// At it's simplest, the access control returns a yes or no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data?.role?.[permission]
    },
  ]),
) as Record<Permission, ({ session }: ListAccessArgs) => boolean>

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  // isAwesome({ session }: ListAccessArgs): boolean {
  //   return !!session?.data?.name?.includes("wes");
  // },
}

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canReadUser({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadUser({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateUser({ session, item, inputData }) {
    if (!isSignedIn({ session })) {
    
      return true
    }
    if (permissions.canUpdateUser({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return item?.email === session?.data.email
  },
  canDeleteUser({ session, item }) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteUser({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return item.id === session.itemId
  },
  canUpdatePets({ session, item, inputData }) {
    if (!isSignedIn({ session })) {
      return true
    }
    if (permissions.canUpdatePets({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return item?.id === session?.itemId
  },
  canDeletePets({ session, item }) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeletePets({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return item.id === session.itemId
  },
  async canUpdateGroups({ session, item, context }:any) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canEditCommunity({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    const group=await context.query.Group.findOne({
      where: { id: item.id },
      query: graphqlString`manager{id}`,
    })
    
    return group?.manager[0]?.id === session?.itemId
  },
  async canDeleteGroups({ session, item ,context}:any) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteCommunity({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    const group=await context.query.Group.findOne({
      where: { id: item.id },
      query: graphqlString`manager{id}`,
    })
    
    return group?.manager[0]?.id === session?.itemId    
  },
  canCreateRole({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateRole({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadRole({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadRole({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateRole({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateRole({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteRole({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteRole({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },

  canCreateAsset({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateAsset({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateAsset({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateAsset({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteAsset({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteAsset({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateCategory({ session, item }) {
    if (!isSignedIn({ session })) {
     
      return true
    }
    if (permissions.canUpdateCategory({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return item?.email === session?.data.email
  },
  canDeleteCategory({ session, item }) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteCategory({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return item.id === session.itemId
  },
  canCreateCollection({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateCollection({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadCollection({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadCollection({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateCollection({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateCollection({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteCollection({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteCollection({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadGlobal({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadGlobal({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateGlobal({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateGlobal({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteGlobal({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteGlobal({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateGlobal({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateGlobal({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateSaved({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadSaved({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadSaved({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadSaved({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateSaved({ session, item }) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateSaved({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return item.id === session.itemId
  },
  canDeleteSaved({ session, item }) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteSaved({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return item.id === session.itemId
  },
  canCreateStructure({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateStructure({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadStructure({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadStructure({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateStructure({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateStructure({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteStructure({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteStructure({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateTrait({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateTrait({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadTrait({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadTrait({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateTrait({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateTrait({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteTrait({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteTrait({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreatePage({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreatePage({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadPage({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadPage({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdatePage({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdatePage({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeletePage({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeletePage({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateEvent({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateEvent({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadEvent({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadEvent({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateEvent({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateEvent({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteEvent({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteEvent({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateAnimal({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateAnimal({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadAnimal({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadAnimal({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateAnimal({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateAnimal({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteAnimal({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteAnimal({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateArticle({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateArticle({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadArticle({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadArticle({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateArticle({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateArticle({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteArticle({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteArticle({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateSubscription({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateSubscription({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadSubscription({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadSubscription({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateSubscription({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateSubscription({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteSubscription({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteSubscription({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateFavorite({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateFavorite({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadFavorite({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadFavorite({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateFavorite({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateFavorite({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteFavorite({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteFavorite({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateSetting({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateSetting({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadSetting({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadSetting({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateSetting({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateSetting({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteSetting({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteSetting({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateCustomer({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateCustomer({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadCustomer({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadCustomer({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateCustomer({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateCustomer({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteCustomer({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteCustomer({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateStore({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateStore({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadStore({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadStore({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateStore({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateStore({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteStore({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteStore({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateListing({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateListing({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadListing({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadListing({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateListing({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateListing({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteListing({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteListing({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateTag({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateTag({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadTag({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadTag({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateTag({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateTag({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteTag({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteTag({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canCreateFeature({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canCreateFeature({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canReadFeature({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canReadFeature({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canUpdateFeature({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canUpdateFeature({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
  canDeleteFeature({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canDeleteFeature({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } }
  },
}
