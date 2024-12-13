import styled from 'styled-components'
import { Box } from '@mui/material'

export const ProgressBox = styled(Box)({
    width: '100%',
})
export const TextContainer = styled(Box)({
    marginTop: '50px',
    minHeight: '100%',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
})

export const TextImage = styled('img')({
    margin: '100px',
    height: '50%',
    width: '50%',
})