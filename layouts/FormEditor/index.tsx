import Nav from '@/components/Nav';
import { Box, Flex } from '@chakra-ui/react';

const FormEditorLayout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" h="full">
      <Nav />
      <Flex w="full" h="full" as="main">
        <Box w="full">{children}</Box>
      </Flex>
    </Flex>
  );
};

export default FormEditorLayout;
