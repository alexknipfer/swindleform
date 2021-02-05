import { Box, Text, Circle, useColorModeValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useCreateFormMutation } from '@/graphql/form/CreateForm.generated';
import { useRouter } from 'next/router';
import WORKSPACE_QUERY from '@/graphql/workspace/QueryWorkspace.graphql';

const CreateFormButton: React.FC = () => {
  const {
    query: { workspaceId },
    push,
  } = useRouter();
  const textColor = useColorModeValue('black', 'white');
  const [mutate] = useCreateFormMutation();

  const handleCreateForm = async () => {
    if (typeof workspaceId !== 'string') {
      return;
    }

    const result = await mutate({
      variables: { workspaceId },
      refetchQueries: [{ query: WORKSPACE_QUERY, variables: { workspaceId } }],
    });

    if (result.data) {
      push(`/form/${result.data.createForm.id}/create`);
    }
  };

  return (
    <Box
      as="button"
      boxShadow="lg"
      borderColor={textColor}
      borderStyle="dashed"
      borderWidth="1px"
      d="flex"
      alignItems="center"
      flexDir="column"
      justifyContent="space-between"
      py={14}
      px={5}
      borderRadius="lg"
      onClick={handleCreateForm}
    >
      <Text color={textColor} as="span">
        Create New Form
      </Text>
      <Circle size={8} boxShadow="2xl">
        <AddIcon color={textColor} />
      </Circle>
    </Box>
  );
};

export default CreateFormButton;
