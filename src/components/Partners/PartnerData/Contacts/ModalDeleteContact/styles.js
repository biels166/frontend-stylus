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

export const CustomModalPaper = styled(Paper)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '350px',
    height: '180px',
    marginTop: '10px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #003C73',
    boxShadow: '24',
    padding: '16px',
    '& .MuiTypography-root': {
        color: '#003C73',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '20px',
    }
});

export const CustomModalHeader = styled("div")({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    justifyContent: 'space-between',
    alignItems: 'center'
});

export const CustomModalBody = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiTypography-root': {
        color: (props) => props.blockAction ? '#FF0000' : '#363636',
        fontWeight: (props) => props.blockAction ?  'bolder' : 'bold',
        fontFamily: 'sans-serif',
        fontSize: (props) => props.blockAction ? '20px' : '18px',
    }
});

export const CustomModalFooter = styled("div")({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center'
});

export const DeleteUserButton = styled("button")({
    backgroundColor: '#003C73',
    boxShadow: '1.5px 1.5px 2px grey',
    minHeight: '40px',
    width: '100px',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto 0px auto 10px',
    '&:hover:not(:disabled)': {
        backgroundColor: '#005F89',
        boxShadow: '2px 2px 5px grey',
        WebkitTextFillColor: '#DCDCDC'
    },
    '&:disabled': {
        backgroundColor: '#DCDCDC',
        WebkitTextFillColor: '#FFFFFF',
        cursor: 'not-allowed'
    }
});

export const CancelButton = styled("button")({
    backgroundColor: '#DCDCDC',
    minHeight: '40px',
    width: '100px',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#003C73',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto 0px auto 0px',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        boxShadow: '2px 2px 5px grey',
        WebkitTextFillColor: '#005F89'
    }
});