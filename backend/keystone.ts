import 'dotenv/config'
import { config } from '@keystone-6/core'

import { insertSeedData } from './seed-data'
import { extendGraphqlSchema, graphqlString } from './mutations'
import { extendExpressApp } from './express'
import { withAuth, session } from './auth'
import lists from './schemas'

const databaseURL =
  process.env.DATABASE_URL || 'postgres://postgres:example1254@localhost:5432/keystone'

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL!, process.env.LOCAL_URL!],
        credentials: true,
      },
      healthCheck: {
        path: '/health-check',
        data: () => ({
          status: 'keystone healthy',
          timestamp: Date.now(),
          uptime: process.uptime(),
        }),
      },
      port: parseInt(process.env.PORT || '3000'),
      extendExpressApp,
    },
    db: {
      provider: 'postgresql',
      url: `${databaseURL}?pool_timeout=0`,
      async onConnect(context) {
        console.log('Connected to the database!')
        if (process.argv.includes('--seed-user')) {
          await insertSeedData(context.prisma)
        }
      },
    },

    storage: {
      files: {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'file',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path) => `${baseUrl}/files${path}`,
        // The route that will be created in Keystone's backend to serve the files
        serverRoute: {
          path: '/files',
        },
        // Set serverRoute to null if you don't want a route to be created in Keystone
        // serverRoute: null
        storagePath: 'public/files',
      },
    },
    lists,
    extendGraphqlSchema,
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: async (context) => {
        if (!context.session) {
          return false
        }
        // get the User role info of logged in user if any
        const user = await context?.query.User.findOne({
          where: { id: context?.session?.itemId },
          query: graphqlString`role{name}`,
        })
        // only allow users with role System Admin
        if (
          user?.role?.name === 'System Admin' ||
          user?.role?.name === 'Editor' ||
          user?.role?.name === 'Super Admin' ||
          user?.role?.name === 'Global Admin' ||
          user?.role?.name === 'Author'
        ) {
          return true
        } else {
          return false
        }
      },
    },
    session,
  }),
)
