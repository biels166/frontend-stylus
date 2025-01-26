import styled from "styled-components";
import { Box } from '@mui/material'
import SVG from 'react-inlinesvg'

export const CustomTitlePaper = styled(Box)({
    height: '30px',
    Width: '100%',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2775A2',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    '& .MuiTypography-root': {
        color: '#FFFFFF',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '18px',
    }
});

export const PageTitle = styled(Box)({
    height: '40px',
    Width: '100%',
    padding: '5px 20px 20px',
    backgroundColor: (props) => {
        switch (props.status) {
            case 'Cancelada': return '#8B0000';
            case 'Aprovada': return '#008B8B';
            case 'Em Aprovação': return '#003C73';
            default: return '#003C73';
        }
    },
    '& .MuiTypography-root': {
        color: '#FFFFFF',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '20px',
    }
});

export const CustomBody = styled(Box)({
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '0px 0px 20px',
    padding: '10px 20px 10px 40px',
    gap: '5px',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    border: '1px solid #2775A2',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    '& .MuiGrid-container': {
        width: '100%',
        boxSizing: 'border-box',
        paddingTop: '20px',
        '& .MuiGrid-item': {
            paddingTop: '8px',
            '& .MuiTypography-root': {
                color: '#2775A2',
                fontWeight: 'bolder',
                fontFamily: 'sans-serif',
                fontSize: '16px',
                '& span': {
                    fontWeight: 'normal',
                    fontSize: '14px',
                    color: '#363636',
                },
            },
        },
    },
});

export const CustomDivider = styled("div")({
    borderColor: '#A9A9A9',
    borderWidth: props => props.isLastItem === true ? '0px' : '1px',
    borderStyle: 'dotted'
});

export const AddButton = styled("button")({
    backgroundColor: '#003C73',
    minHeight: '40px',
    width: '100px',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto 0px auto 0px',
    '&:hover': {
        backgroundColor: '#005F89',
        boxShadow: '2px 2px 5px grey',
        WebkitTextFillColor: '#DCDCDC'
    }
});

export const ClearButton = styled("button")({
    backgroundColor: '#DCDCDC',
    boxShadow: '0.5px 0.5px 1px grey',
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

export const IconButtons = styled(SVG)({
    borderRadius: '8px',
    padding: '5px 5px',
    cursor: 'pointer',
    '&:hover': {

        '& circle': {
            fill: '#005F89',
        }
    }
});


export const CustomPaper = styled(Box)({
    height: '100%',
    Width: '100%',
    display: "flex",
    flexDirection: 'column',
    padding: '30px 20px',
    margin: '0px 0px 10px',
    backgroundColor: '#E8EAED',
    borderBottomRadius: '80px',
});

export const SaveButton = styled("button")({
    backgroundColor: '#003C73',
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

export const Next = styled("button")({
    backgroundColor: '#003C73',
    minHeight: '40px',
    width: '100px',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto 0px auto 0px',
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

export const Previous = styled("button")({
    backgroundColor: '#FFF',
    boxShadow: '0.5px 0.5px 1px grey',
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
    },
    '&:hover:not(:disabled)': {
        backgroundColor: '#DCDCDC',
        boxShadow: '2px 2px 5px grey',
        WebkitTextFillColor: '#005F89'
    },
    '&:disabled': {
        backgroundColor: '#DCDCDC',
        WebkitTextFillColor: '#FFFFFF',
        cursor: 'not-allowed'
    }
});
