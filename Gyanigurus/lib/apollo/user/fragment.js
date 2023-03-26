import { gql } from '@apollo/client'

export const USER_DETAIL = gql`
  fragment UserDetail on User {
    id
    status
    name
    firstName
    lastName
    email
    location
    dateCreated
    about {
      document
    }
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
`

export const COVER_PICTURE = gql`
  fragment CoverPicture on User {
    coverPhoto {
      image {
        publicUrl
      }
    }
  }
`

export const FOLLOWING = gql`
  fragment FollowingFields on User {
    followingCount
    following(take: 5) {
      id
      name
      avatar {
        image {
          id
          publicUrl
        }
      }
    }
  }
`

export const FOLLOWERS = gql`
  fragment FollowerFields on User {
    followersCount
    followers(take: 5) {
      id
      name
    }
  }
`
