import styled from "styled-components";
import { Box } from '@mui/material'

export const CustomTitlePaper = styled(Box)({
    height: '40px',
    Width: '100%',
    padding: '5px 20px 20px',
    backgroundColor: '#003C73',
    '& .MuiTypography-root': {
        color: '#FFFFFF',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '20px',
    }
});

export const CustomBody = styled(Box)({
    width: '100%',
    margin: '20px 0px 20px',
    padding: '0px 10px',
    gap: '5px',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',

});

export const CustomPaper = styled(Box)({
    minHeight: '250px',
    Width: '100%',
    display: "flex",
    flexDirection: 'column',
    padding: '10px 20px 20px',
    margin: '0px 0px 10px',
    backgroundColor: '#E8EAED',
    borderBottomRadius: '80px',
    '& .MuiTypography-root': {
        color: '#003C73',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: '16px',
    },
    '& .MuiFormControl-root': {
        m: 1,
        width: '100%',
        margin: '10px 5px 10px 5px',
        '& .MuiOutlinedInput-root': {
            background: '#FFF',
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

export const CreateQuote = styled("button")({
    backgroundColor: '#008B8B',
    minHeight: '40px',
    width: '150px',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto 10px auto 10px',
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

export const SaveDraft = styled("button")({
    backgroundColor: '#1C1C1C',
    minHeight: '40px',
    width: '150px',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto 10px auto 10px',
    '&:hover:not(:disabled)': {
        backgroundColor: '#363636',
        boxShadow: '2px 2px 5px grey',
        WebkitTextFillColor: '#FFFFFF'
    },
    '&:disabled': {
        backgroundColor: '#DCDCDC',
        WebkitTextFillColor: '#FFFFFF',
        cursor: 'not-allowed'
    }
});