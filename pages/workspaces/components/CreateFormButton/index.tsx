import { Box, Text, Circle, useColorModeValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const CreateFormButton: React.FC = () => {
  const createWorkspaceButtonColor = useColorModeValue('teal.300', 'teal.700');

  return (
    <Box
      as="button"
      boxShadow="lg"
      background={createWorkspaceButtonColor}
      d="flex"
      alignItems="center"
      flexDir="column"
      justifyContent="space-between"
      py={14}
      px={5}
      borderRadius="lg"
    >
      <Text color="white" as="span">
        Create New Form
      </Text>
      <Circle size={8} boxShadow="2xl">
        <AddIcon color="white" />
      </Circle>
    </Box>
  );
};

export default CreateFormButton;
