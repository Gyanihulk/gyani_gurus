import { PrismaClient } from '.prisma/client'
import { graphqlString } from '../mutations'

import { seedUser } from './data'
import { rolesData } from './rolesData'
var fs = require('fs')

export async function insertSeedData(prisma: PrismaClient) {
  console.log(`🌱 Creating Seed Role`)
  const { id: roleId } = await prisma.role.create({
    data: {
      name: 'System Admin',
      description: 'Have access to All CRUD of all Lists',
      canCreateAnimal: true,
      canReadAnimal: true,
      canUpdateAnimal: true,
      canDeleteAnimal: true,
      canCreateArticle: true,
      canReadArticle: true,
      canUpdateArticle: true,
      canDeleteArticle: true,
      canCreateAsset: true,
      canReadAsset: true,
      canUpdateAsset: true,
      canDeleteAsset: true,
      canCreateCategory: true,
      canReadCategory: true,
      canUpdateCategory: true,
      canDeleteCategory: true,
      canCreateCollection: true,
      canReadCollection: true,
      canUpdateCollection: true,
      canDeleteCollection: true,
      canCreateEvent: true,
      canReadEvent: true,
      canUpdateEvent: true,
      canDeleteEvent: true,
      canCreateGlobal: true,
      canReadGlobal: true,
      canUpdateGlobal: true,
      canDeleteGlobal: true,
      canCreatePage: true,
      canReadPage: true,
      canUpdatePage: true,
      canDeletePage: true,
      canCreateRole: true,
      canReadRole: true,
      canUpdateRole: true,
      canDeleteRole: true,
      canCreateSetting: true,
      canReadSetting: true,
      canUpdateSetting: true,
      canDeleteSetting: true,
      canCreateStructure: true,
      canReadStructure: true,
      canUpdateStructure: true,
      canDeleteStructure: true,
      canCreateSubscription: true,
      canReadSubscription: true,
      canUpdateSubscription: true,
      canDeleteSubscription: true,
      canCreateTag: true,
      canReadTag: true,
      canUpdateTag: true,
      canDeleteTag: true,
      canCreateTrait: true,
      canReadTrait: true,
      canUpdateTrait: true,
      canDeleteTrait: true,
      canCreateUser: true,
      canReadUser: true,
      canUpdateUser: true,
      canDeleteUser: true,
      canCreateCustomer: true,
      canReadCustomer: true,
      canUpdateCustomer: true,
      canDeleteCustomer: true,
      canCreateListing: true,
      canReadListing: true,
      canUpdateListing: true,
      canDeleteListing: true,
      canCreateStore: true,
      canReadStore: true,
      canUpdateStore: true,
      canDeleteStore: true,
      canCreateSaved: true,
      canReadSaved: true,
      canUpdateSaved: true,
      canDeleteSaved: true,
      canCreateFavorite: true,
      canReadFavorite: true,
      canUpdateFavorite: true,
      canDeleteFavorite: true,
      canCreateFeature: true,
      canReadFeature: true,
      canUpdateFeature: true,
      canDeleteFeature: true,
    },
  })

  console.log(`🌱 Creating Seed User`)
  const users = await Promise.all(
    seedUser.map(async (user) => {
      console.log(`${user.firstName}`)
      return prisma.user.create({ data: { ...user, roleId } })
    }),
  )

  rolesData.forEach((role) => {
    console.log(`${role.name}`)
    prisma.role.create({ data: role }).catch((err) => {
      console.log(err)
    })
  })
}



