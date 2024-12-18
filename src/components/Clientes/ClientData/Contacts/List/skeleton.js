import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { CustomBox } from './skeletonStyle';

export const ListSkeleton = () => {
  return (
      <CustomBox>
        <Skeleton variant={'rectangular'} animation="wave" height={120} />

        <Skeleton variant={'rectangular'} animation="wave" height={120} />
      </CustomBox>
  );
}