import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
import { createStandaloneToast } from '@chakra-ui/react';
import { onError } from '@apollo/client/link/error';
import { theme } from '@/utils/theme';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const toast = createStandaloneToast({ theme });

  if (graphQLErrors) {
    graphQLErrors.map(({ message }) =>
      toast({
        title: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      }),
    );
  }

  if (networkError) {
    toast({
      title: 'Network Error',
      description: networkError,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  }
});

const createIsomorphLink = () => {
  if (typeof window === 'undefined') {
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
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, createIsomorphLink()]),
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') {
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
