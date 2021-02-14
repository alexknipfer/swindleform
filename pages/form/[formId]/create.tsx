import { Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FormEditorLayout from '@/layouts/FormEditor';

import Toolbar, { ToolType } from './components/Toolbar';

const CreateForm: NextPage = () => {
  const { query } = useRouter();
  const [selectedTool, setSelectedTool] = useState(ToolType.BUILDER);

  return (
    <FormEditorLayout>
      <Flex h="full">
        <Toolbar selectedTool={selectedTool} onToolSelect={setSelectedTool} />
        <h3>Create form for: {query.formId} </h3>
      </Flex>
    </FormEditorLayout>
  );
};

export default CreateForm;
