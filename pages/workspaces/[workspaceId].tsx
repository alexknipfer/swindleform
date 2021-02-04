import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import { useRouter } from 'next/router';
import { useWorkspaceQuery } from '@/graphql/workspace/QueryWorkspace.generated';
import { Skeleton } from '@chakra-ui/react';

import WorkspaceHeading from './components/WorkspaceHeading';
import WorkspaceGrid from './components/WorkspaceGrid';
import CreateFormButton from './components/CreateFormButton';

const Workspaces: React.FC = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;
  const { data, loading } = useWorkspaceQuery({ variables: { workspaceId } });

  return (
    <WorkspacesLayout>
      <WorkspaceHeading
        workspaceName={data?.workspace.workspaceName}
        workspaceId={workspaceId}
        loading={loading}
      />
      <WorkspaceGrid>
        <CreateFormButton />
        {loading &&
          Array(5)
            .fill(0)
            .map((_, index) => <Skeleton h={40} key={index} />)}
      </WorkspaceGrid>
    </WorkspacesLayout>
  );
};

export default withAuthentication(Workspaces);
