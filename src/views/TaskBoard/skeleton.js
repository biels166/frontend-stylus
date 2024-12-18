import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { CustomBox } from './skeletonStyles';

export const ListSkeleton = () => {
  return (
      <CustomBox>
        <Skeleton variant={'rectangular'} animation="wave" height={500} />

        <Skeleton variant={'rectangular'} animation="wave" height={500} />

        <Skeleton variant={'rectangular'} animation="wave" height={500} />

        <Skeleton variant={'rectangular'} animation="wave" height={500} />
      </CustomBox>
  );
}