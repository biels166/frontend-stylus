import styled from "styled-components";
import { Box } from '@mui/material'
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

export const ReloadSearch = styled(ReplayCircleFilledIcon)({
    margin: 'auto 0px',
    color: '#003C73',
    '&:hover': {
        color: '#2775A2',
      }
})

export const Selections = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    minWidth: '10ch',
    justifyItems: 'end',
    gap: '10px',
    alignItems: 'center',
    '& .MuiTypography-root': {
        color: '#003C73',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '16px',
        fontStyle: 'italic',
        '& span': {
            fontWeight: 'normal',
            fontSize: '14px',
            color: '#363636',
        }
    }
})

export const BoxControl = styled(Box)({
    display: 'inherit',
    width: '100%',
    justifyContent: 'flex-end',
    gap: '10px',
    alignItems: 'center',
})

export const PageInfoBox = styled(Box)({
    display: 'flex',
    width: '100%',
    marginBottom: '10px',
    alignItems: 'self-end',
})