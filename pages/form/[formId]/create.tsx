import { Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import FormEditorLayout from '@/layouts/FormEditor';

import Toolbar, { ToolType } from './components/Toolbar';
import QuestionBuilder from './components/QuestionBuilder';

const CreateForm: NextPage = () => {
  const [selectedTool, setSelectedTool] = useState(ToolType.BUILDER);

  return (
    <FormEditorLayout>
      <Flex h="full">
        <Toolbar selectedTool={selectedTool} onToolSelect={setSelectedTool} />
        {selectedTool === ToolType.BUILDER && <QuestionBuilder />}
      </Flex>
    </FormEditorLayout>
  );
};

export default CreateForm;
