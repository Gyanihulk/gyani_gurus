import { graphql } from '@keystone-6/core'
import { Context } from '.keystone/types'
import { getFeed } from './getFeed'
import { query } from 'express-validator'
import { getCommunities } from './getCommunities'

// make a fake graphqlql tagged template literal
export const graphqlString = String.raw

export const extendGraphqlSchema = graphql.extend((base) => {
  return {
    query: {
     
     
    },
  }
})
