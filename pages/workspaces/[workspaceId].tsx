import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import Chakra from '@/components/Chakra';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { WorkspaceSnapshot } from '@/models/workspace';

const UserQuery = gql`
  query UserQuery {
    user {
      workspaces {
        id
        workspaceName
        users
      }
    }
  }
`;

const Workspaces: React.FC = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId;
  const { data } = useQuery<{ user: { workspaces: WorkspaceSnapshot[] } }>(
    UserQuery,
  );

  return (
    <Chakra>
      <WorkspacesLayout
        workspaceId={workspaceId}
        workspaces={data ? data.user.workspaces : []}
      >
        <Heading as="h1">Manage Workspaces</Heading>
      </WorkspacesLayout>
    </Chakra>
  );
};

export default withAuthentication(Workspaces);
