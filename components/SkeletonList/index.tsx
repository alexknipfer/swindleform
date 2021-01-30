import { Stack, Skeleton } from '@chakra-ui/react';

interface Props {
  rows?: number;
  rowHeight?: number;
}

const DEFAULT_ROWS = 3;
const DEFAULT_ROW_HEIGHT = 8;

export const SkeletonList: React.FC<Props> = ({
  rows = DEFAULT_ROWS,
  rowHeight = DEFAULT_ROW_HEIGHT,
}) => {
  return (
    <Stack mt={3} spacing={3}>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} height={rowHeight} />
        ))}
    </Stack>
  );
};
