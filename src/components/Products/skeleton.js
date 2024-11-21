import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { CustomBox } from './skeletonStyle';

export const ListSkeleton = () => {
  return (
      <CustomBox>
        <Skeleton variant={'rectangular'} animation="wave" height={500} />
      </CustomBox>
  );
}