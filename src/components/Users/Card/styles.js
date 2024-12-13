import styled from "styled-components";
import { Box } from '@mui/material'
import SVG from 'react-inlinesvg'


export const Container = styled(Box)({
    height: 'auto',
    display: "flex",
    padding: '5px 20px',
    margin: '0px 0px 10px',
    backgroundColor: '#D9D9D9',
    borderTopWidth: '10px',
    borderTopColor: '#003C73',
    borderTopStyle: 'solid',
    borderRadius: '8px',
    boxShadow: '5px 5px 10px grey',
    '& .MuiGrid-container': {
        flexDirection: 'column', 
        width: '100%',
        boxSizing: 'border-box',
        paddingTop: '20px',
        '& .MuiGrid-item': {
            paddingTop: '0px',
            flex: '1 1 auto', 
            minWidth: 0, 
            '& .MuiTypography-root': {
                color: '#003C73',
                fontWeight: 'bolder',
                fontFamily: 'sans-serif',
                fontSize: '16px',
                '& span': {
                    fontWeight: 'normal',
                    fontSize: '14px',
                    color: '#363636',
                }
            }
        }
    },
});

export const IconButtons = styled(SVG)({
    borderRadius: '8px',
    padding: '5px 5px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#C0C0C0',
        boxShadow: '2px 2px 5px #D3D3D3',
        '& path': {
            fill: '#005F89',
        }
    }
});

export const IconDiv = styled(Box)({
    display: 'flex',
    alignItems: 'end',
    marginLeft: 'auto',
    marginRight: '5px'
});
