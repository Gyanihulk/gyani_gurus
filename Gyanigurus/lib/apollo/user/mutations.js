import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

// Define mutation
export const SIGNUP_USER_MUTATION = gql`
  mutation SIGNUP_USER_MUTATION(
    $name: String!
    $businessCategory: UserBusinessCategoryType
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $emailOptIn: Boolean!
    $type: UserTypeType!
  ) {
    createUser(
      data: {
        name: $name
        businessCategory: $businessCategory
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        termsAndCondition: true
        metadata: { email_opt_in: $emailOptIn }
        type: $type
      }
    ) {
      __typename
      id
    }
  }
`
export const LOGIN_USER_MUTATION = gql`
  mutation LOGIN_USER_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`

export const REEDEM_USER_PASSWORD_RESET_TOKEN = gql`
  mutation REEDEM_USER_PASSWORD_RESET_TOKEN(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
      code
      message
    }
  }
`

export const END_USER_SESSION = gql`
  mutation END_USER_SESSION {
    endSession
  }
`

export const CREATE_SAVED = gql`
  mutation CREATE_SAVED($name: String!, $data: JSON) {
    createSaved(data: { name: $name, data: $data }) {
      id
      name
      handle
      data
    }
  }
`

export const UPDATE_ACCOUNT_SETTINGS = gql`
  mutation UPDATE_ACCOUNT_SETTINGS(
    $id: ID!
    $username: String
    $businessCategory: UserBusinessCategoryType
    $firstName: String
    $lastName: String
    $name: String
    $email: String
    $phoneNumber: String
    $website: String
  ) {
    updateUser(
      where: { id: $id }
      data: {
        username: $username
        businessCategory: $businessCategory
        firstName: $firstName
        lastName: $lastName
        name: $name
        email: $email
        phoneNumber: $phoneNumber
        website: $website
      }
    ) {
      username
      firstName
      lastName
      name
      email
      phoneNumber
      website
    }
  }
`

export const UPDATE_USER_PASSWORD = gql`
  mutation UPDATE_USER_PASSWORD($email: String!, $password: String!) {
    updateUser(where: { email: $email }, data: { password: $password }) {
      name
      firstName
      lastName
      email
      password {
        isSet
      }
    }
  }
`

export const UPDATE_DISCOVERY_SETTINGS = gql`
  mutation UPDATE_ACCOUNT_SETTINGS($id: ID!, $location: JSON) {
    updateUser(where: { id: $id }, data: { location: $location }) {
      location
    }
  }
`

export const UPDATE_PROFILE_DESCRIPTION = gql`
  mutation UPDATE_PROFILE_DESCRIPTION($email: String, $data: JSON) {
    updateUser(where: { email: $email }, data: { about: $data }) {
      about {
        document
      }
    }
  }
`

export const UPDATE_COVER_PHOTO = gql`
  mutation UPDATE_COVER_PHOTO($email: String, $image: Upload) {
    updateUser(
      where: { email: $email }
      data: { coverPhoto: { create: { image: $image, altTitle: $email } } }
    ) {
      coverPhoto {
        image {
          publicUrl
        }
      }
    }
  }
`

export const UPDATE_PROFILE_PICTURE = gql`
  mutation UPDATE_PROFILE_PICTURE($email: String, $image: Upload) {
    updateUser(
      where: { email: $email }
      data: { avatar: { create: { image: $image, altTitle: $email } } }
    ) {
      avatar {
        image {
          publicUrl
        }
      }
    }
  }
`

export const FOLLOW_USER = gql`
  mutation FOLLOW_USER($email: String, $id: ID) {
    updateUser(where: { email: $email }, data: { following: { connect: { id: $id } } }) {
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
  }
`

export const UN_FOLLOW_USER = gql`
  mutation FOLLOW_USER($email: String, $id: ID) {
    updateUser(
      where: { email: $email }
      data: { following: { disconnect: { id: $id } } }
    ) {
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
  }
`

export const UPDATE_SAVED = gql`
  mutation UPDATE_SAVED($id: ID!, $data: JSON) {
    updateSaved(where: { id: $id }, data: { data: $data }) {
      data
      dateCreated
      dateUpdated
    }
  }
`
export const UPDATE_SAVED_LIST_NAME = gql`
  mutation UPDATE_SAVED($id: ID!, $name: String) {
    updateSaved(where: { id: $id }, data: { name: $name }) {
      name
      dateUpdated
    }
  }
`

export const useUpdateSavedMutation = (params = {}) => {
  return useMutation(UPDATE_SAVED, params)
}

export const useSignupMutation = (params = {}) => {
  return useMutation(SIGNUP_USER_MUTATION, params)
}

export const useBusinessSignupMutation = (params = {}) => {
  return useMutation(SIGNUP_BUSINESS_MUTATION_MUTATION, params)
}

export const useLoginMutation = (params = {}) => {
  return useMutation(LOGIN_USER_MUTATION, params)
}

export const useSendResetPasswordEmailMutation = (params = {}) => {
  return useMutation(RESET_PASSWORD_MUTATION, params)
}

export const useResetPasswordMutation = (params = {}) => {
  return useMutation(REEDEM_USER_PASSWORD_RESET_TOKEN, params)
}

export const useEndSessionMutation = (params = {}) => {
  return useMutation(END_USER_SESSION, params)
}

export const useCreateSavedMutation = (params = {}) => {
  return useMutation(CREATE_SAVED, params)
}

export const useUpdateAccountSettings = (params = {}) => {
  return useMutation(UPDATE_ACCOUNT_SETTINGS, params)
}

export const useUpdateDiscoverySettings = (params = {}) => {
  return useMutation(UPDATE_DISCOVERY_SETTINGS, params)
}

export const useUpdateUserPassword = (params = {}) => {
  return useMutation(UPDATE_USER_PASSWORD, params)
}

export const UPDATE_USER_METADATA = gql`
  mutation UPDATE_USER_METADATA($data: JSON, $id: ID) {
    updateUser(where: { id: $id }, data: { metadata: $data }) {
      metadata
    }
  }
`

export const UserMetadataOnboardingPetsData = {
  onboarding: {
    add_pets: true,
  },
}
