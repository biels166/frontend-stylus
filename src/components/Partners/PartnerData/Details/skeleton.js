import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const SkeletonClientDetails = () => {
    return (
        <Box sx={{
            height: '100%',
            Width: '100%',
            margin: '0px',
            padding: '0px',
            display: "flex",
            flexDirection: 'column',
            '& .MuiSkeleton-rectangular': {
                marginBottom: '10px',
                borderRadius: '8px',
                height: '130px'
            }
        }}>
            <Skeleton variant={'rectangular'} animation="wave" height={400} />
        </Box>
    );
}