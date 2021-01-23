import { Box, Flex } from '@chakra-ui/react';

const WorkspacesLayout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" h="100%">
      <Box borderBottom="1px" borderBottomColor="gray.200" h="64px" />
      <Box h="100%">{children}</Box>
    </Flex>
  );
};

export default WorkspacesLayout;
