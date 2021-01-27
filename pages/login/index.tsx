import { GetServerSideProps, NextPage } from 'next';
import { useFormik } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  VStack,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import { csrfToken, signIn, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

interface Props {
  token: string;
}

const Login: NextPage<Props> = ({ token }) => {
  const { push } = useRouter();
  const { errors, touched, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async ({ email }) => {
      await signIn('email', { email });
      push('/');
    },
  });

  return (
    <Flex p={[4, 0]} align={['start', 'center']} justify="center" h="full">
      <Box w={['100%', 64]} textAlign="center">
        <Text fontWeight="semibold" fontSize="3xl" mb={8}>
          SwindleForm
        </Text>
        <Text my={8} fontSize="lg" color="gray.600">
          Hello, who&apos;s this?
        </Text>
        <form onSubmit={handleSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={token} />
          <VStack spacing={4}>
            <FormControl isInvalid={errors.email && touched.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w="full" mt={4}>
              Log in to SwindleForm
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const token = await csrfToken(ctx);

  if (session) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();

    return {
      props: {},
    };
  }

  return {
    props: {
      token,
    },
  };
};

export default Login;
