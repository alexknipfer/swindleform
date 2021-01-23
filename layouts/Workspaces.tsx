import { Box, Flex } from '@chakra-ui/react';
import Nav from '@/components/Nav';
import WorkspacesSidebar from '@/components/WorkspacesSidebar';

const WorkspacesLayout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" h="100%">
      <Nav />
      <Flex h="100%">
        <WorkspacesSidebar />
        <Box h="100%" pt={5} px={5}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default WorkspacesLayout;
