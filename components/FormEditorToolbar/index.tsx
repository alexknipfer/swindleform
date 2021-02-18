import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { useColorModeValue, Flex, IconButton } from '@chakra-ui/react';

export enum ToolType {
  BUILDER = 'Builder',
  SETTINGS = 'Settings',
}

const tools = [
  {
    type: ToolType.BUILDER,
    icon: <EditIcon />,
    label: 'Form builder',
  },
  {
    type: ToolType.SETTINGS,
    icon: <SettingsIcon />,
    label: 'Form settings',
  },
];

interface Props {
  selectedTool: ToolType;
  onToolSelect: (toolType: ToolType) => void;
}

const Toolbar: React.FC<Props> = ({ selectedTool, onToolSelect }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      direction="column"
      w={16}
      h="full"
      borderRightColor={borderColor}
      borderRightWidth="1px"
      p={2}
    >
      {tools.map(({ type, icon, label }, index) => (
        <IconButton
          key={`${type}-${index}`}
          aria-label={label}
          aria-pressed={selectedTool === type}
          icon={icon}
          mb={3}
          variant={selectedTool === type ? 'solid' : 'ghost'}
          onClick={() => onToolSelect(type)}
        />
      ))}
    </Flex>
  );
};

export default Toolbar;
