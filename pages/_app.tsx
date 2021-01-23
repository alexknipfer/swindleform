import { AppProps } from 'next/app';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';
import Head from 'next/head';

import GlobalStyle from '../components/GlobalStyle';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
