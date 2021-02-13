import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  Spacer,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Nav from '@/components/Nav';
import WorkspacesSidebar from '@/layouts/Workspaces/components/WorkspacesSidebar';

const WorkspacesLayout: React.FC = ({ children }) => {
  const background = useColorModeValue('gray.200', 'gray.600');
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Flex direction="column" h="100%">
      <Nav />
      <HStack
        display={['flex', null, null, 'none']}
        px={5}
        h="64px"
        borderBottom="1px"
        borderColor={background}
        w="full"
      >
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Create Workspace"
          size="xs"
          variant="outline"
          colorScheme="teal"
          onClick={onToggle}
        ></IconButton>
        <Text fontWeight="semibold" fontSize="md">
          Workspaces
        </Text>
        <Spacer />
      </HStack>
      <Flex h="100%" as="main">
        <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <WorkspacesSidebar />
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        <Box display={['none', null, null, 'block']}>
          <WorkspacesSidebar />
        </Box>
        <Box h="full" w="full" pt={5} px={5}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default WorkspacesLayout;
