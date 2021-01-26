import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';

const Workspaces: React.FC = () => {
  return (
    <WorkspacesLayout>
      <Heading as="h1">Manage Workspaces</Heading>
    </WorkspacesLayout>
  );
};

export default withAuthentication(Workspaces);
