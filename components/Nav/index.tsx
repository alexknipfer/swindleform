import { Box, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
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
  const { data } = useQuery<{ user: User }>(UserQuery, {
    variables: { id: 'testUserId' },
  });

  return (
    <Box borderBottom="1px" borderBottomColor="gray.200" h="64px">
      <Link href="/">Home</Link>
      <Text>{data?.user.name}</Text>
    </Box>
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
