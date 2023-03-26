import { graphql } from '@keystone-6/core'





export const apiResponse = graphql.object()({
  name: `apiResponse`,
  fields: {
    response: graphql.field({ type: graphql.JSON }),
  },
})