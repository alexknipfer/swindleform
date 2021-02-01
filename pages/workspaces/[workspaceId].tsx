import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import { useRouter } from 'next/router';
import { useWorkspaceQuery } from '@/graphql/workspace/QueryWorkspace.generated';

import WorkspaceHeading from './components/WorkspaceHeading';

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
    </WorkspacesLayout>
  );
};

export default withAuthentication(Workspaces);
