import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Head from 'next/head';
import GlobalStyle from '@/components/GlobalStyle';
import { useApollo } from '@/apollo/client';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <CSSReset />
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
