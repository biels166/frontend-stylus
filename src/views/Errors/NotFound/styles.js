import styled from 'styled-components'
import { Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';

export const TextContainer = styled(Box)({
    marginTop: '50px',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& img': {
        height: '50%',
        width: '50%',
    },
    '& .MuiTypography-root': {
        color: '#003C73',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '200px',
    }
})

export const BoxHomeIcon = styled(Box)({
    width: '100%',
    marginTop: '80px',
    display: 'flex',
    justifyContent: 'center'
})

export const CustomHomeIcon = styled(HomeIcon)({
    '&.MuiSvgIcon-root': {
        height: '5em',
        width: '5em',
        color: '#003C73',
        '&:hover': {
            color: '#2775A2',
            cursor: 'pointer'
        }
    }
})

export const ImageContainer = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    '& img': {
        height: '30%',
        width: '30%',
    }
})


