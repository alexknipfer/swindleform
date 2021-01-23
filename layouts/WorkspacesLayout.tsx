import { Box, Flex } from '@chakra-ui/react';
import Nav from '@/components/Nav';

const WorkspacesLayout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" h="100%">
      <Nav />
      <Box h="100%">{children}</Box>
    </Flex>
  );
};

export default WorkspacesLayout;
