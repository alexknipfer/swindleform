import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import Chakra from '@/components/Chakra';
import { initializeApollo } from '@/apollo/client';
import { gql, useQuery } from '@apollo/client';
import { User } from '@/models/user';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';

const UserQuery = gql`
  query UserQuery {
    user {
      id
      email
      workspaces {
        id
      }
    }
  }
`;

const Home: NextPage = () => {
  // const { data } = useQuery<{ user: User }>(UserQuery);
  const router = useRouter();

  // if (data) {
  // const initialWorkspace = data.user.workspaces[0];
  // router.push(`/workspaces/${initialWorkspace}`);
  // }

  // useEffect(() => {
  //   router.push('/workspaces/test');
  // }, [router]);

  return <div>Testing</div>;
  // console.log('DATA: ', data);

  // return (
  //   <Chakra>
  //     <WorkspacesLayout>
  //       <Heading as="h1">Manage Workspaces</Heading>
  //     </WorkspacesLayout>
  //   </Chakra>
  // );
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

export default withAuthentication(Home);
