import styled from "styled-components";
import { Box } from "@mui/material";

export const CounterInfoStyle = styled(Box)({
    minWidth: 'max-content',
    alignContent: 'center',
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
});
