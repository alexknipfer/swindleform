import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import { useRouter } from 'next/router';
import { useWorkspaceQuery } from '@/graphql/workspace/QueryWorkspace.generated';

const Workspaces: React.FC = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const { data } = useWorkspaceQuery({ variables: { workspaceId } });

  console.log({ data });

  return (
    <WorkspacesLayout>
      <Heading>{data?.workspace?.workspaceName}</Heading>
    </WorkspacesLayout>
  );
};

export default withAuthentication(Workspaces);
