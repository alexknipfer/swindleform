import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const WorkspacesSidebar: React.FC = () => {
  return (
    <Box
      w="256px"
      borderRight="1px"
      borderRightColor="gray.200"
      h="full"
      pt={5}
      px={5}
    >
      <HStack justifyContent="space-between">
        <Text fontWeight="semibold" fontSize="0.75rem">
          Workspaces
        </Text>
        <IconButton
          icon={<AddIcon />}
          aria-label="Create Workspace"
          size="xs"
          variant="outline"
          colorScheme="teal"
        ></IconButton>
      </HStack>
    </Box>
  );
};

export default WorkspacesSidebar;
