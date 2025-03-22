import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { CustomBox, SkeletonPaginator } from './skeletonStyle';

export const ListSkeleton = () => {
  return (
      <CustomBox>
        <Skeleton variant={'rectangular'} animation="wave" height={120} />

        <Skeleton variant={'rectangular'} animation="wave" height={120} />
      </CustomBox>
  );
}