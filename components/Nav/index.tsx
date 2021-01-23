import {
  Text,
  Flex,
  Spacer,
  Link,
  SkeletonCircle,
  HStack,
  Skeleton,
} from '@chakra-ui/react';
import { useQuery, gql } from '@apollo/client';
import NextLink from 'next/link';
import { User } from '@/models/user';
import { initializeApollo } from '@/apollo/client';

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
  const { data, loading } = useQuery<{ user: User }>(UserQuery, {
    variables: { id: 'testUserId' },
  });

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
          fontWeight="bold"
          fontSize="sm"
        >
          Typeform
        </Link>
      </NextLink>
      <Spacer />
      {loading ? (
        <HStack>
          <SkeletonCircle size="6" />
          <Skeleton height="15px" w={20} />
        </HStack>
      ) : (
        <Text fontSize="sm">{data?.user.name}</Text>
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
