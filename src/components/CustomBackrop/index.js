import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const CustomBackdrop = ({open}) => {
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress size={130} sx={{color: '#003C73', position: 'absolute'}} />
        <CircularProgress size={100} sx={{color: '#005F89', position: 'absolute'}}/>
        <CircularProgress size={70} sx={{color: 'info', position: 'absolute'}}/>
        <CircularProgress size={40} sx={{color: '#FFFFFF', position: 'absolute'}}/>
      </Backdrop>
    </div>
  )
}