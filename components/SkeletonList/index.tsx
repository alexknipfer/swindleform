import { Stack, Skeleton } from '@chakra-ui/react';

interface Props {
  rows?: number;
  rowHeight?: number;
  horizontalPadding?: number;
}

const DEFAULT_ROWS = 3;
const DEFAULT_ROW_HEIGHT = 8;
const DEFAULT_HORIZONTAL_PADDING = 0;

export const SkeletonList: React.FC<Props> = ({
  rows = DEFAULT_ROWS,
  rowHeight = DEFAULT_ROW_HEIGHT,
  horizontalPadding = DEFAULT_HORIZONTAL_PADDING,
}) => {
  return (
    <Stack mt={3} spacing={3} px={horizontalPadding}>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} height={rowHeight} />
        ))}
    </Stack>
  );
};
