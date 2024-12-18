import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch' } };

export const CustomSwitch = ({
  initialState = false,
  reload = false,
  handleOnChange = () => Boolean 
}) => {
  const [value, setValue] = React.useState(initialState)

  React.useEffect(() => {
      setValue(initialState)
  }, [reload])

  return (
    <GreenSwitch {...label}
      checked={value}
      onClick={(e) => {
        console.log(e.target.checked)
        setValue(e.target.checked)
        handleOnChange(e.target.checked)
      }} />
  )
}