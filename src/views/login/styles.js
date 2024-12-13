import styled from "styled-components";
import { Box } from '@mui/material'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

export const ViewIcon = styled(VisibilityRoundedIcon)({
    color: '#003C73'
})

export const BlockViewIcon = styled(VisibilityOffRoundedIcon)({
    color: '#808080'
})

export const Container = styled("div")({
    minHeight: '100%',
    minWidth: '100%',
    display: "flex",
});

export const LeftBackground = styled("img")({
    minHeight: '100vh',
    maxHeight: '100vh',
    minWidth: '40%',
    maxWidth: '40%'
})

export const Logo = styled("img")({
    height: '125px',
    width: '390px',
    padding: '10px',
    margin: '20px 0px 60px 0px',
})

export const LoginButton = styled("button")({
    backgroundColor: '#003C73',
    minHeight: '40px',
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
})

export const ForgotPasswordButton = styled("button")({
    backgroundColor: '#DCDCDC',
    minHeight: '40px',
    width: 'auto',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#003C73',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '20px 0px 0px 0px',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        boxShadow: '2px 2px 5px grey',
        WebkitTextFillColor: '#005F89'
    }
})

export const ContainerLoginButtons = styled("div")({
    display: "flex",
    gap: '10px',
    marginTop: '30px'
});

export const LoginBox = styled(Box)({
    backgroundColor: "#FFFF",
    height: '100vh',
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiTextField-root': {
        backgroundColor:'#E0FFFF',
        m: 1,
        width: '40ch',
        margin: '10px',
        borderRadius: '80px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#003C73',
                borderRadius: '80px',
            },
            '&:hover fieldset': {
                borderColor: '#003C73',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#003C73',
            },
        },

    },

})
