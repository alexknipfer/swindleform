import {
  Text,
  Flex,
  Spacer,
  Link,
  SkeletonCircle,
  HStack,
  Skeleton,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';
import NextLink from 'next/link';
import { User } from '@/models/user';
import { initializeApollo } from '@/apollo/client';
import { useSession } from 'next-auth/client';

const UserQuery = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      email
      name
    }
  }
`;

const Nav: React.FC = () => {
  const { loading } = useQuery<{ user: User }>(UserQuery, {
    variables: { id: 'testUserId' },
  });
  const [session] = useSession();

  return (
    <Flex
      as="header"
      align="center"
      borderBottom="1px"
      borderBottomColor="gray.200"
      h="64px"
      px={5}
    >
      <NextLink href="/">
        <Link
          _hover={{ textDecoration: 'none' }}
          fontWeight="semibold"
          fontSize="sm"
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
          {/* <Text fontSize="sm">User queried: {data?.user.name}</Text> */}
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
