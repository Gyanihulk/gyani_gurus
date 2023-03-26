import { ApolloClient } from "@apollo/client";

export const client = new ApolloClient({
  link: createHttpLink({uri: 'http://localhost:3000/api/graphql'}),
  cache: new InMemoryCache(),
});
