import styled from "styled-components";
import { Box } from '@mui/material'

export const Container = styled("div")({
    minHeight: '100%',
    minWidth: '100%',
    display: "flex"
});

export const Logo = styled("img")({
    height: '15%',
    width: '40%',
    margin: '100px 0px 20px 0px',
});

export const LoginButton = styled("button")({
    backgroundColor: '#003C73',
    minHeight: '50px',
    width: '150px',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '20px 0px 0px 0px',
    '&:hover': {
        backgroundColor: '#005F89',
        boxShadow: '2px 2px 5px grey',
        WebkitTextFillColor: '#DCDCDC'
    }
});

export const LoginBox = styled(Box)({
    '& .MuiTextField-root': {
        m: 1,
        width: '40ch',
        margin: '10px',
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

    },
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})
