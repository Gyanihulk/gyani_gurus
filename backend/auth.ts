import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'
import { permissionsList } from './schemas/Fields/permissionFields'
import { sendPasswordResetEmail } from './lib/mail'
import { accountSwitchingCheck } from './lib/accountSwitchingCheck'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // How long they stay signed in
  secret: process.env.COOKIE_SECRET || '-- DEV COOKIE SECRET; CHANGE ME ajlsi434--',
  sameSite: process.env.DOMAIN_NAME ? 'None' : false,
  secure: process.env.DOMAIN_NAME ? true : false,
  domain: process.env.DOMAIN_NAME || false,
  path: '/',
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in initial roles here
    itemData: {
      role: {
        create: {
          name: 'initial role',
          ...permissionsList.reduce((result: any, permission) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            result[permission] = true
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result
          }, {}),
        },
      },
    },
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity)
    },
  },
  magicAuthLink: {
    sendToken: async (args) => { 
  
      await accountSwitchingCheck(args)
     
     },
    tokensValidForMins: 60,
  },
  sessionData: `id name email role { ${permissionsList.join(
    ' ',
  )} } `,
})

const session = statelessSessions(sessionConfig)

export { withAuth, session }
