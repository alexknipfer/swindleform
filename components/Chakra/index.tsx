import { theme } from '@/config/chakraThemeConfig';
import { ChakraProperties } from '@/models/chakraProperties';
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';

const Chakra: NextPage<ChakraProperties> = ({ cookies, children }) => {
  return (
    <ChakraProvider
      theme={theme}
      colorModeManager={
        cookies ? cookieStorageManager(cookies) : localStorageManager
      }
    >
      {children}
    </ChakraProvider>
  );
};

export default Chakra;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
};
