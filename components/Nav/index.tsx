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
import { useQuery, gql } from '@apollo/client';
import NextLink from 'next/link';
import { User } from '@/models/user';
import { initializeApollo } from '@/apollo/client';
import { useSession } from 'next-auth/client';

import ColorModeSwitch from '../ColorModeSwitch';

const UserQuery = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      email
      name
      workspaces {
        id
        workspaceName
        users
      }
    }
  }
`;

const Nav: React.FC = () => {
  // TODO - figure out how to augment this session object properly so we don't have to cast as any
  const [session] = useSession();
  const { loading, data } = useQuery<{ user: User }>(UserQuery, {
    variables: { id: session && (session.user as any).id },
  });
  console.log('Nice to see our event sourced model in the console', data);
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
          <Text fontSize="sm">User queried: {data?.user.name}</Text>
          <ColorModeSwitch />
        </Fragment>
      )}
    </Flex>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: UserQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Nav;
