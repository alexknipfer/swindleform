import { Heading } from '@chakra-ui/react';

import WorkspacesLayout from '../../layouts/WorkspacesLayout';

const Workspaces: React.FC = () => {
  return (
    <WorkspacesLayout>
      <Heading as="h1">Manage Workspaces</Heading>
    </WorkspacesLayout>
  );
};

export default Workspaces;
