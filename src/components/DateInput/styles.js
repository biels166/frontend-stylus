import styled from "styled-components";
import { Paper } from '@mui/material'
import SVG from 'react-inlinesvg'

export const CloseIcon = styled(SVG)({
    borderRadius: '8px',
    padding: '5px 5px',
    cursor: 'pointer',
    '&:hover': {

        '& path': {
            fill: '#005F89',
        }
    }
});