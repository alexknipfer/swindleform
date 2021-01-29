import Chakra from '@/components/Chakra';
import { Flex, Spinner } from '@chakra-ui/react';
import withAuthentication from '@/hoc/withAuthentication';
import { gql, useQuery } from '@apollo/client';
import { User } from '@/models/user';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

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
  const { data, loading } = useQuery<{ user: User }>(UserQuery);
  const router = useRouter();

  if (loading) {
    return (
      <Chakra>
        <Flex h="full" w="full" align="center" justify="center">
          <Spinner size="lg" />
        </Flex>
      </Chakra>
    );
  }

  if (data) {
    const initialWorkspace = data.user.workspaces[0];
    router.push(`/workspaces/${initialWorkspace}`);
  }

  return null;

  // useEffect(() => {
  //   router.push('/workspaces/test');
  // }, [router]);

  // return <div>Testing</div>;
  // console.log('DATA: ', data);

  // return (
  //   <Chakra>
  //     <WorkspacesLayout>
  //       <Heading as="h1">Manage Workspaces</Heading>
  //     </WorkspacesLayout>
  //   </Chakra>
  // );
};

export default withAuthentication(Home);
