// eslint-disable-next-line @typescript-eslint/no-var-requires

import { graphqlString } from '../mutations'

export function getSlug(text: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/restrict-template-expressions
  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export const getHandle = (text: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/restrict-template-expressions
  return text.toString().normalize('NFKD').toLowerCase().trim().replace(/\s+/g, '_')
}

export const createUsername = async (query: any, name: string, operation?: string) => {
  let getUserWithUsername
  let uniqueUserName
  let username = name
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_')

  if (operation === 'create') {
    getUserWithUsername = await query.User.findOne({
      where: { username: username },
      query: graphqlString`
            email
            `,
    })

    if (getUserWithUsername) {
      const unique = Math.floor(1000 + Math.random() * 9000)
      uniqueUserName = username?.concat(unique.toString())
    } else {
      uniqueUserName = username
    }
  }

  return uniqueUserName
}
