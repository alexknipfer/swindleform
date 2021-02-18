import { Box, useColorModeValue } from '@chakra-ui/react';

interface Props {
  name: string;
}

export const FormCard: React.FC<Props> = ({ name }) => {
  const backgroundColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box
      bg={backgroundColor}
      color={textColor}
      borderRadius="lg"
      boxShadow="lg"
      d="flex"
      h="200px"
      alignItems="center"
      justifyContent="center"
      transition="all 0.2s ease-in"
      _hover={{
        boxShadow: '2xl',
      }}
    >
      {name}
    </Box>
  );
};

export default FormCard;
