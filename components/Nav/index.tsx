import {
  Text,
  Flex,
  Spacer,
  Link,
  SkeletonCircle,
  HStack,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/client';

import ColorModeSwitch from '../ColorModeSwitch';

const Nav: React.FC = () => {
  const [session, loading] = useSession();
  const background = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      as="header"
      align="center"
      borderBottom="1px"
      borderBottomColor={background}
      h="64px"
      px={5}
    >
      <NextLink href="/">
        <Link
          _hover={{ textDecoration: 'none' }}
          fontWeight="semibold"
          fontSize="lg"
        >
          SwindleForm
        </Link>
      </NextLink>
      <Spacer />
      {loading ? (
        <HStack>
          <SkeletonCircle size="6" />
          <Skeleton height="15px" w={20} />
        </HStack>
      ) : (
        <Fragment>
          {session && (
            <Text display={['none', 'block']} fontSize="sm">
              Signed in as: {session.user.email}
            </Text>
          )}
          <ColorModeSwitch />
        </Fragment>
      )}
    </Flex>
  );
};

export default Nav;
