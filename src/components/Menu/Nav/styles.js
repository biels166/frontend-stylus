import styled from "styled-components";
import HandshakeIcon from '@mui/icons-material/Handshake';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';

export const CustomHomeIcon = styled(HomeIcon)({
    color: '#2775A2'
})

export const CustomClientIcon = styled(HandshakeIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomUserIcon = styled(PersonIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomProductIcon = styled(MenuBookIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomOSIcon = styled(RequestQuoteIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomQuoteIcon = styled(QueryStatsIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomMaterialsIcon = styled(ListIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})