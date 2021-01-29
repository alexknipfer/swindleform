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
  // TODO - figure out how to augment this session object properly so we don't have to cast as any
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
            <Text fontSize="sm">Signed in as: {session.user.email}</Text>
          )}
          <ColorModeSwitch />
        </Fragment>
      )}
    </Flex>
  );
};

export default Nav;
