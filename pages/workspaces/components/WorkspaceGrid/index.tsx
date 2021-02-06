import { Grid } from '@chakra-ui/react';

const WorkspaceGrid: React.FC = ({ children }) => (
  <Grid
    templateColumns={[
      'repeat(2, 1fr)',
      'repeat(3, 1fr)',
      'repeat(4, 1fr)',
      null,
      'repeat(5, 1fr)',
    ]}
    gap={5}
    padding={5}
  >
    {children}
  </Grid>
);

export default WorkspaceGrid;
