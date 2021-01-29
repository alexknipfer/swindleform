import withAuthentication from '@/hoc/withAuthentication';
import { Spinner } from '@chakra-ui/react';
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

  return <Spinner />;
};

export default withAuthentication(Workspaces);
