import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { createUploadLink } from 'apollo-upload-client'
// import paginationField from './paginationField'
import { useMemo } from 'react'
import merge from 'deepmerge'

import { endpoint, prodEndpoint } from '../../config'

let apolloClient

function createApolloClient(context) {
  const uploadLinkConfig = {
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    fetchOptions: {
      credentials: 'include',
    },
    // pass the headers along from this request. This enables SSR with logged in state
    ...(context?.req?.cookies
      ? {
          headers: {
            Cookie: context.req.headers?.cookie,
          },
        }
      : {}),
  }

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          )
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
          )
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink(uploadLinkConfig),
    ]),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null, context) {
  const _apolloClient = apolloClient ?? createApolloClient(context)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
