import styled from "styled-components";
import { Box, Paper } from '@mui/material'
import SVG from 'react-inlinesvg'
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export const CustomOutsourcedIcon = styled(PrecisionManufacturingOutlinedIcon)({
    color: '#003C73'
})

export const CustomSupplierIcon = styled(AddShoppingCartOutlinedIcon)({
    color: '#003C73'
})

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

export const CustomPaper = styled(Box)({
    height: '100%',
    Width: '100%',
    display: "flex",
    flexDirection: 'column',
    padding: '10px 40px',
    margin: '0px 0px 10px',
    backgroundColor: '#FFFFFF',    
    borderBottomRadius: '80px',
    '& .MuiTypography-root': {
        color: '#003C73',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '20px',
    }
});

export const CustomModalPaper = styled(Paper)({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 'auto',
        height: 'auto',
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
})

export const CustomHeader = styled("div")({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiTextField-root': {
        m: 1,
        width: '40ch',
        marginTop: '10px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#003C73',
                borderRadius: '10px',
            },
            '&:hover fieldset': {
                borderColor: '#003C73',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#003C73',
            },
        },

    }
});
export const CustomModalBody = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiTextField-root': {
        width: '100%',
        m: 1,
        margin: '10px 5px 10px 5px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#003C73',
                borderRadius: '10px',
            },
            '&:hover fieldset': {
                borderColor: '#003C73',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#003C73',
            },
        },

    }
});

export const CustomFooter = styled("div")({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    justifyContent: 'end',
    alignItems: 'center'
})

export const SaveButton = styled("button")({
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