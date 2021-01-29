import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { WorkspaceSnapshot } from '@/models/workspace';

const WorkspaceQuery = gql`
  query workspace($workspaceId: String!) {
    workspace(workspaceId: $workspaceId) {
      id
      workspaceName
      users
      formCount
    }
  }
`;
const Workspaces: React.FC = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const { data } = useQuery<
    {
      workspace: WorkspaceSnapshot;
    },
    { workspaceId: string }
  >(WorkspaceQuery, { variables: { workspaceId } });

  console.log({ data });

  return (
    <WorkspacesLayout>
      <Heading as="h1">Manage Workspaces</Heading>
    </WorkspacesLayout>
  );
};

export default withAuthentication(Workspaces);
