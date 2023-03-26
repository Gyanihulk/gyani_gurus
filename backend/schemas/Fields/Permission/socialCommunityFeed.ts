import { checkbox } from '@keystone-6/core/fields'

export const socialCommunityFeedPermissions = {
  canEditPostInFeed: checkbox({
    defaultValue: false,
    label: `Edit a post in a community's feed`,
  }),
  canDeletePostInFeed: checkbox({
    defaultValue: false,
    label: `Delete a post from a community's feed`,
  }),
  canEditCommentInFeed: checkbox({
    defaultValue: false,
    label: `Edit a comment in a community's feed`,
  }),
  canDeleteCommentInFeed: checkbox({
    defaultValue: false,
    label: `Delete a comment from a community's feed`,
  }),

}
