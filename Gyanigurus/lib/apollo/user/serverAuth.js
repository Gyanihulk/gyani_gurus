import { initializeApollo } from 'lib/useApollo'
import { CURRENT_USER_QUERY } from 'lib/apollo/user'

export const authUserOnServer = async (context) => {
  const apolloClient = initializeApollo(null, context)

  return await apolloClient.query({ query: CURRENT_USER_QUERY })
}
