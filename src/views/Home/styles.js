import styled from "styled-components";
import HandshakeIcon from '@mui/icons-material/Handshake';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ListIcon from '@mui/icons-material/List';
import { Box } from "@mui/material";

export const CustonClientIcon = styled(HandshakeIcon)({
    color: '#2775A2'
})

export const CustonUserIcon = styled(PersonIcon)({
    color: '#2775A2'
})

export const CustonProductIcon = styled(MenuBookIcon)({
    color: '#2775A2'
})

export const CustonOSIcon = styled(RequestQuoteIcon)({
    color: '#2775A2'
})

export const CustumQuoteIcon = styled(QueryStatsIcon)({
    color: '#2775A2'
})

export const CustumMaterialsIcon = styled(ListIcon)({
    color: '#2775A2'
})

export const CustomPaper = styled(Box)({
    height: '100%',
    Width: '100%',
    display: "flex",
    flexDirection: 'column',
    padding: '5px 20px',
    margin: '0px 0px 10px',
    backgroundColor: '#E8EAED',
    borderBottomRadius: '80px',

});