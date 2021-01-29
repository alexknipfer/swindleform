import {
  Box,
  HStack,
  IconButton,
  Link as CLink,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { WorkspaceSnapshot } from '@/models/workspace';
import Link from 'next/link';

const WorkspacesSidebar: React.FC<{ workspaces: WorkspaceSnapshot[] }> = ({
  workspaces = [],
}: {
  workspaces: WorkspaceSnapshot[];
}) => {
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
      {workspaces.map((w) => (
        <Link passHref href={`/workspaces/${w.id}`} key={w.id}>
          <CLink href={`/workspaces/${w.id}`}>{w.workspaceName}</CLink>
        </Link>
      ))}
    </Box>
  );
};

export default WorkspacesSidebar;
