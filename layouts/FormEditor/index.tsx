import { useState } from 'react';
import Nav from '@/components/Nav';
import { Box, Flex } from '@chakra-ui/react';
import Toolbar, { ToolType } from '@/layouts/FormEditor/components/Toolbar';

const FormEditorLayout: React.FC = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState(ToolType.BUILDER);

  return (
    <Flex direction="column" h="full">
      <Nav />
      <Flex w="full" h="full" as="main">
        <Toolbar selectedTool={selectedTool} onToolSelect={setSelectedTool} />
        <Box w="full">{children}</Box>
      </Flex>
    </Flex>
  );
};

export default FormEditorLayout;
