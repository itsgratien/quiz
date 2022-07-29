import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = (token?: string) =>
  new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
    headers: {
      ['authorization']: token || '',
    },
  });

export default client;
