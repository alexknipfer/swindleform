import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const isSSR = typeof window === 'undefined';

const createIsomorphLink = () => {
  if (isSSR) {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('./schema');

    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require('@apollo/client/link/http');

    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    });
  }
};

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: isSSR,
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (isSSR) {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}
