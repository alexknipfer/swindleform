import {
  Box,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const WorkspacesSidebar: React.FC = () => {
  const background = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      w="256px"
      borderRight="1px"
      borderRightColor={background}
      h="full"
      pt={5}
      px={5}
    >
      <HStack justifyContent="space-between">
        <Text fontWeight="semibold" fontSize="md">
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
