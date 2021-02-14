import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, useColorModeValue, Input, Button } from '@chakra-ui/react';

import { useQuestionBuilderReducer } from './reducer';

const QuestionBuilder: React.FC = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const selectedQuestionColor = useColorModeValue('gray.50', 'gray.900');
  const [state, dispatch] = useQuestionBuilderReducer();

  return (
    <Flex w="full">
      <Box
        direction="column"
        w="50%"
        borderRight="1px"
        borderRightColor={borderColor}
      >
        {state.textQuestions.map((question, index) => (
          <Box
            as="button"
            key={index}
            w="full"
            px={5}
            py={8}
            backgroundColor={
              index === state.selectedQuestion ? selectedQuestionColor : ''
            }
            onClick={() =>
              dispatch({ type: 'select_question', questionIndex: index })
            }
          >
            <Input placeholder="Enter your question here." />
          </Box>
        ))}
        <Button
          onClick={() => dispatch({ type: 'add_text_question' })}
          leftIcon={<AddIcon />}
          ml={5}
          my={8}
        >
          Add Question
        </Button>
      </Box>
      <Box w="50%">This is the preview window</Box>
    </Flex>
  );
};

export default QuestionBuilder;
