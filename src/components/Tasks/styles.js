import styled from 'styled-components'
import { Box, Card } from '@mui/material'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ShareLocationIcon from '@mui/icons-material/ShareLocation'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import StyleIcon from '@mui/icons-material/Style';
import NoteAddIcon from '@mui/icons-material/NoteAdd';


export const CustomCard = styled(Card)({
    maxWidth: 345,
    minWidth: 345,
    margin: '0px 25px 10px 0px',
    borderTop: '10px solid',
    justifyContent: 'center',
    borderTopColor: (props) => {
        switch(props.state) {
            case 'Concluída': return '#006400'; 
            case 'Atrasada': return '#8B0000';
            case 'Próxima de Vencer': return '#008B8B';
            case 'Hoje': return '#FF8C00';
            case 'Em dia': return '#003C73'; 
            case 'Nova Tarefa': return '#000000';
            default: return '#003C73'; 
        } 
    },   
    borderRadius: '8px',
    boxShadow: '5px 5px 10px grey',
    backgroundColor: '#FFFFFF',
})

export const CustomCompletedIcon = styled(TaskAltIcon)({
    color: '#006400'
})

export const CustomAddTaskIcon = styled(NoteAddIcon)({
    color: (props) => {
        switch(props.state) {
            case 'Concluída': return '#006400'; 
            case 'Atrasada': return '#8B0000';
            case 'Próxima de Vencer': return '#008B8B';
            case 'Hoje': return '#FF8C00';
            case 'Em dia': return '#003C73'; 
            case 'Nova Tarefa': return '#000000';
            default: return '#003C73'; 
        } 
    }
})

export const CustomOthersIcon = styled(StyleIcon)({
    color: (props) => {
        switch(props.state) {
            case 'Concluída': return '#006400'; 
            case 'Atrasada': return '#8B0000';
            case 'Próxima de Vencer': return '#008B8B';
            case 'Hoje': return '#FF8C00';
            case 'Em dia': return '#003C73'; 
            case 'Nova Tarefa': return '#000000';
            default: return '#003C73'; 
        } 
    }
})

export const CustomPaidIcon = styled(CurrencyExchangeIcon)({
    color: (props) => {
        switch(props.state) {
            case 'Concluída': return '#006400'; 
            case 'Atrasada': return '#8B0000';
            case 'Próxima de Vencer': return '#008B8B';
            case 'Hoje': return '#FF8C00';
            case 'Em dia': return '#003C73'; 
            case 'Nova Tarefa': return '#000000';
            default: return '#003C73'; 
        } 
    }
})

export const CustomLocationIcon = styled(ShareLocationIcon)({
    color: (props) => {
        switch(props.state) {
            case 'Concluída': return '#006400'; 
            case 'Atrasada': return '#8B0000';
            case 'Próxima de Vencer': return '#008B8B';
            case 'Hoje': return '#FF8C00';
            case 'Em dia': return '#003C73'; 
            case 'Nova Tarefa': return '#000000';
            default: return '#003C73'; 
        } 
    }
})


export const CustomDeliveryIcon = styled(DeliveryDiningIcon)({
    color: (props) => {
        switch(props.state) {
            case 'Concluída': return '#006400'; 
            case 'Atrasada': return '#8B0000';
            case 'Próxima de Vencer': return '#008B8B';
            case 'Hoje': return '#FF8C00';
            case 'Em dia': return '#003C73'; 
            case 'Nova Tarefa': return '#000000';
            default: return '#003C73'; 
        } 
    }
})

export const CustomBody = styled(Box)({
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
})

export const CustomFooter = styled(Box)({
    marginTop: '15px',
    gap: '10px',
    display: 'flex',
    alignContent: 'end',
    justifyContent: 'end'
})

export const SaveChanges = styled("button")({
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
})

export const DiscardChanges = styled("button")({
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
})

export const DeleteTask = styled("button")({
    backgroundColor: '#ff0000',
    boxShadow: '1.5px 1.5px 2px grey',
    minHeight: '40px',
    width: 'auto',
    borderRadius: '4px',
    borderWidth: '0px',
    WebkitTextFillColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto 0px auto 0px',
    '&:hover:not(:disabled)': {
        backgroundColor: '#FF5560',
        boxShadow: '2px 2px 5px grey',
        WebkitTextFillColor: '#DCDCDC'
    },
    '&:disabled': {
        backgroundColor: '#DCDCDC',
        WebkitTextFillColor: '#FFFFFF',
        cursor: 'not-allowed'
    }
})
