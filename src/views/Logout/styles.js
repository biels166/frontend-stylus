import styled from 'styled-components'
import { Box } from '@mui/material'

export const StylusImage = styled('img')({
    height: '200px',
    width: '500px',
    margin: '20px 0px 20px 120px',
})

export const ImageContainer = styled(Box)({
    minHeight: '100%',
    minWidth: '100%',
    display: 'flex',
    background: '#003C73',
    justifyContent: 'center'
})

export const TextImage = styled('img')({
    margin: '100px',
    height: '50%',
    width: '50%',
})

export const TextContainer = styled(Box)({
    marginTop: '50px',
    minHeight: '100%',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& .MuiTypography-root': {
        color: '#003C73',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '200px',
    }
})

export const ProgressBox = styled(Box)({
    width: '100%'
})