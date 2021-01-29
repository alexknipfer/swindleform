import { Box, Flex } from '@chakra-ui/react';
import Nav from '@/components/Nav';
import WorkspacesSidebar from '@/components/WorkspacesSidebar';
import { WorkspaceSnapshot } from '@/models/workspace';

const WorkspacesLayout: React.FC<{
  workspaces?: WorkspaceSnapshot[];
  workspaceId: string;
}> = ({ children, workspaces = [] }) => {
  return (
    <Flex direction="column" h="100%">
      <Nav />
      <Flex h="100%">
        <WorkspacesSidebar workspaces={workspaces} />
        <Box h="100%" pt={5} px={5}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default WorkspacesLayout;
