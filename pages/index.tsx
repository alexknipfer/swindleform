import withAuthentication from '@/hoc/withAuthentication';
import { Spinner, Flex } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import { WorkspaceSnapshot } from '@/models/workspace';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const UserQuery = gql`
  query UserQuery {
    user {
      workspaces {
        id
      }
    }
  }
`;

const Workspaces: React.FC = () => {
  const router = useRouter();

  const { data } = useQuery<{ user: { workspaces: WorkspaceSnapshot[] } }>(
    UserQuery,
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    router.push('/workspaces/' + data.user.workspaces[0].id);
  }, [data, router]);

  return (
    <Flex h="full" w="full" align="center" justify="center">
      <Spinner size="lg" />
    </Flex>
  );
};

export default withAuthentication(Workspaces);
