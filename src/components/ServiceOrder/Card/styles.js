import styled from "styled-components";
import { Box, Button, Paper } from '@mui/material'
import SVG from 'react-inlinesvg'
import EngineeringIcon from '@mui/icons-material/Engineering';

export const CutomEditDetails = styled(EngineeringIcon)({
    color: '#003C73',
    padding: '3px 3px 2px 3px',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#C0C0C0',
        boxShadow: '2px 2px 5px #D3D3D3',
        color: '#005F89'
    }
}
)

export const Container = styled(Box)({
    height: 'auto',
    display: "flex",
    flexDirection: 'row',
    padding: '5px 20px',
    borderTopWidth: '10px',
    margin: '0px 0px 10px',
    backgroundColor: (props) => {
        switch (props.status) {
            case 'Concluída': return '#d9fdd9';
            case 'Em Execução': return '#D9D9D9';
            default: return '#D9D9D9';
        }
    },
    borderTopColor: (props) => {
        switch (props.stateStyle) {
            case 'Atrasada': return '#8B0000';
            case 'Amanhã': return '#008B8B';
            case 'Hoje': return '#FF8C00';
            case 'Essa Semana': return '#003C73';
            case 'Concluída': return '#1F7A1F';
            default: return '#003C73';
        }
    },
    borderTopStyle: 'solid',
    borderRadius: '8px',
    boxShadow: '5px 5px 10px grey',
    '& .MuiGrid-container': {
        width: '100%',
        boxSizing: 'border-box',
        paddingTop: '20px',
        '& .MuiGrid-item': {
            marginTop: '1px',
            paddingTop: '1px',
            minWidth: 0, // Garante que os itens não excedam o container
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

export const ChipsBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginRight: '30px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
});

export const IconDiv = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    marginLeft: 'auto',
    marginRight: '5px'
});

export const CustomModalPaper = styled(Paper)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    marginTop: '10px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #003C73',
    boxShadow: '24',
    padding: '16px',
    '& .MuiPaper-root': {
        height: 'auto',
        minWidth: 0
    },
    '& .MuiTypography-root': {
        color: '#003C73',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '20px',
    },
    '& p': {
        color: '#363636',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: '16px',
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
    '& .MuiTextField-root': {
        m: 1,
        width: '100%',
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

export const CustomModalFooter = styled("div")({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    justifyContent: 'end',
    alignItems: 'center',
    "& button": {
        marginLeft: '10px'
    }
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

