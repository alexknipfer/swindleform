import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import withAuthentication from '@/hoc/withAuthentication';
import Chakra from '@/components/Chakra';

const Workspaces: React.FC = () => {
  return (
    <Chakra>
      <WorkspacesLayout>
        <Heading as="h1">Manage Workspaces</Heading>
      </WorkspacesLayout>
    </Chakra>
  );
};

export default withAuthentication(Workspaces);
