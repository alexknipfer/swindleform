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

const Login: React.FC = () => {
  const { errors, touched, values, handleChange } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: () => {
      // Submit values
    },
  });

  return (
    <Flex p={[4, 0]} align={['start', 'center']} justify="center" h="full">
      <Box w={['100%', 64]} textAlign="center">
        <Text fontWeight="semibold" fontSize="3xl" mb={8}>
          Typeform
        </Text>
        <Text my={8} fontSize="lg" color="gray.600">
          Hello, who&apos;s this?
        </Text>
        <form>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.username && touched.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password && touched.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w="full" mt={4}>
              Log in to Typeform
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
