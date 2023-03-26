import { graphqlString } from '../mutations'

export async function accountSwitchingCheck(args: any): Promise<void> {
  let loggedInUser
  const { context, identity, token } = args
  let tokenSend = false

  if (context.session.itemId) {
    loggedInUser = await context.query.User.findOne({
      where: { id: context.session.itemId },
      query: graphqlString`otherAccounts{email}`,
    })
   
    const otherAccounts = loggedInUser.otherAccounts
    for (let account of otherAccounts) {
      if (account.email === identity) {
        await context.db.User.updateOne({
          where: { id: context.session.itemId },
          data: { magicToken: token },
        })
        tokenSend = true
      }
    }
    if (tokenSend===false) {
      await context.db.User.updateOne({
        where: { id: context.session.itemId },
        data: { magicToken: 'No you cant access this account' },
      })
    }
  
  }
}
