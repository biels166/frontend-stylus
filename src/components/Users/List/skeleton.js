import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { CustomBox, } from './skeletonStyle';

export const UserListSkeleton = () => {
  return (
      <CustomBox>
        <Skeleton variant={'rectangular'} animation="wave"/>

        <Skeleton variant={'rectangular'} animation="wave" />
      </CustomBox>
  );
}