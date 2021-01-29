import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import Chakra from '@/components/Chakra';
import { gql, useQuery } from '@apollo/client';
import { User } from '@/models/user';
import { initializeApollo } from '@/apollo/client';
import { contextResolver } from '@/apollo/contextResolver';
import { GetServerSideProps, GetStaticProps } from 'next';

const UserQuery = gql`
  query UserQuery {
    user {
      id
      email
      workspaces {
        id
        workspaceName
        users
      }
    }
  }
`;

const Workspaces: React.FC = () => {
  return (
    <Chakra>
      <WorkspacesLayout>
        <Heading as="h1">Manage Workspaces</Heading>
      </WorkspacesLayout>
    </Chakra>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const received = await contextResolver(context);
//   // console.log('RECEIVED: ', received);
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: UserQuery,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// };

export default withAuthentication(Workspaces);
