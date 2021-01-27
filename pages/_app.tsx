import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Head from 'next/head';
import { Provider } from 'next-auth/client';
import GlobalStyle from '@/components/GlobalStyle';
import { useApollo } from '@/apollo/client';
import { theme } from '@/config/chakraThemeConfig';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Head>
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
