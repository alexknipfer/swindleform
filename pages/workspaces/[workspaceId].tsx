import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import { useRouter } from 'next/router';

const Workspaces: React.FC = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  console.log({ workspaceId });

  return (
    <WorkspacesLayout>
      <Heading as="h1">Manage Workspaces</Heading>
    </WorkspacesLayout>
  );
};

export default withAuthentication(Workspaces);
