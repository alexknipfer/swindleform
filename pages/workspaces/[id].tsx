import { NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import WorkspacesLayout from '@/layouts/Workspaces';
import Chakra from '@/components/Chakra';

const Workspace: NextPage = () => {
  return (
    <Chakra>
      <WorkspacesLayout>
        <Heading as="h1">Manage Workspaces</Heading>
      </WorkspacesLayout>
    </Chakra>
  );
};

export default Workspace;
