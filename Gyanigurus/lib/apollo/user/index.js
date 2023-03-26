import gql from 'graphql-tag'
import { initializeApollo } from './lib/useApollo'

import { COVER_PICTURE, FOLLOWERS, FOLLOWING, USER_DETAIL } from './fragment'

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        firstName
        lastName
        location
        username
        phoneNumber
        accessToken
        businessCategory
        website
        type
        avatar {
          image {
            id
            publicUrl
          }
        }
        metadata
      }
    }
    userAmityToken {
      token
      user
    }
  }
`

export const GET_FOLLOWERS_ACCOUNTS = gql`
  query GET_FOLLOWERS_ACCOUNTS($username: String) {
    user(where: { username: $username }) {
      id
      status
      followersCount(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
      )
      followers(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
      ) {
        id
        name
        username
        avatar {
          image {
            id
            publicUrl
          }
        }
        dateCreated
      }
    }
  }
`

export const GET_FOLLOWING_ACCOUNTS = gql`
  query GET_FOLLOWING_ACCOUNTS($username: String) {
    user(where: { username: $username }) {
      id
      status
      followingCount(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
      )
      following(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
      ) {
        id
        name
        username
        avatar {
          image {
            id
            publicUrl
          }
        }
        dateCreated
      }
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GET_USER_BY_ID($id: ID!) {
    user(where: { id: $id }) {
      id
      name
      username
      email
      location
      followers(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
      ) {
        id
        username
      }
      avatar {
        image {
          id
          publicUrl
        }
      }
    }
  }
`

export const GET_PROFILE_DETAIL = gql`
  query GET_PROFILE_DETAIL($username: String) {
    user(where: { username: $username }) {
      id
      status
      username
      name
      username
      firstName
      lastName
      email
      location
      dateCreated
      followersCount(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
      )
      followingCount(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
      )
      followers(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
        take: 5
      ) {
        id
        name
        username
        avatar {
          image {
            id
            publicUrl
          }
        }
      }
      following(
        where: {
          NOT: [
            { username: { equals: "global_popular_feed" } }
            { username: { equals: "guest_user" } }
          ]
        }
        take: 5
      ) {
        id
        name
        username
        avatar {
          image {
            id
            publicUrl
          }
        }
      }
      about {
        document
      }
      coverPhoto {
        image {
          publicUrl
        }
      }
      avatar {
        image {
          id
          publicUrl
        }
      }
    }
  }
`

export const GET_USER_BUSINESS_CATEGORY_TYPE = gql`
  query {
    __type(name: "UserBusinessCategoryType") {
      enumValues {
        name
      }
    }
  }
`

export const GET_SAVED_LIST = gql`
  query GET_SAVED_LIST($id: ID!) {
    user(where: { id: $id }) {
      saved {
        id
        name
        handle
        data
      }
    }
  }
`
export const GET_SAVED_LIST_BY_ID = gql`
  query GET_SAVED_LIST_BY_ID($id: ID!) {
    saved(where: { id: $id }) {
      data
    }
  }
`

export const GET_USER_BY_TEXT = gql`
  query GET_USER_BY_TEXT($mentioneeInputText: String!) {
    users(where: { username: { startsWith: $mentioneeInputText } }) {
      id
      name
      username
      avatar {
        id
        image {
          publicUrl
        }
      }
    }
  }
`

export const getFollowerAccounts = async (context, userHandle = false) => {
  const username = userHandle || context.params.username

  const apolloClient = initializeApollo(null, context)

  return apolloClient.query({
    query: GET_FOLLOWERS_ACCOUNTS,
    variables: {
      username,
    },
  })
}

export const getFollowingAccounts = async (context, userHandle = false) => {
  const username = userHandle || context.params.username

  const apolloClient = initializeApollo(null, context)

  return apolloClient.query({
    query: GET_FOLLOWING_ACCOUNTS,
    variables: {
      username,
    },
  })
}

export const getUserProfileDetail = async (context, userHandle = false) => {
  const username = userHandle || context.params.username

  const apolloClient = initializeApollo(null, context)

  return apolloClient.query({
    query: GET_PROFILE_DETAIL,
    variables: {
      username,
    },
  })
}

export const getUserById = async (context, userId) => {
  const apolloClient = initializeApollo(null, context)

  const data = await apolloClient.query({
    query: GET_USER_BY_ID,
    variables: {
      id: userId,
    },
  })

  return data?.data
}
