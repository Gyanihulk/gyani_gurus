// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint =
  process.env.NEXT_PUBLIC_ENDPOINT || `http://192.168.29.9:3000/api/graphql`
export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || `http://192.168.29.9:3000`
export const perPage = 4
// when you deploy this ultimately should point to '<yourdomain.example>/api/graphql'
export const prodEndpoint =
  process.env.NEXT_PUBLIC_PROD_ENDPOINT || `http://192.168.29.9:3000/api/graphql`
