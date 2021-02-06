import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link as CLink,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserQuery } from '@/graphql/user/UserQuery.generated';
import { SkeletonList } from '@/components/SkeletonList';
import AddWorkspaceModal from '@/layouts/components/AddWorkspaceModal';

const WorkspacesSidebar: React.FC = () => {
  const { data, loading } = useUserQuery();
  const { query } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const background = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      w={['full', null, null, '256px']}
      borderRight="1px"
      borderRightColor={background}
      h="full"
      pt={5}
    >
      <AddWorkspaceModal isOpen={isOpen} onClose={onClose} />
      <HStack justifyContent="space-between" py={5} px={5}>
        <Text fontWeight="semibold" fontSize="md">
          Workspaces
        </Text>
        <IconButton
          icon={<AddIcon />}
          aria-label="Create Workspace"
          size="xs"
          variant="outline"
          colorScheme="teal"
          onClick={onOpen}
        ></IconButton>
      </HStack>
      {loading && <SkeletonList horizontalPadding={5} />}
      {data?.user.workspaces.map((w) => (
        <Flex direction="column" key={w.id}>
          <Text
            background={w.id === query.workspaceId ? background : 'transparent'}
            isTruncated
            maxWidth="100%"
            py={1}
            px={5}
          >
            <CLink as={Link} href={`/workspaces/${w.id}`}>
              {w.workspaceName}
            </CLink>
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default WorkspacesSidebar;
