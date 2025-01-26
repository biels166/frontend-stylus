import styled from "styled-components";
import HandshakeIcon from '@mui/icons-material/Handshake';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HomeIcon from '@mui/icons-material/Home';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DataSaverOnSharpIcon from '@mui/icons-material/DataSaverOnSharp';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';

export const CustomHomeIcon = styled(HomeIcon)({
    color: '#2775A2'
})

export const CustomListQuoteIcon = styled(PlaylistAddCheckCircleOutlinedIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomCreateQuoteIcon = styled(DataSaverOnSharpIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomCategoryIcon = styled(CategoryOutlinedIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const PartnersIcon = styled(Diversity3Icon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomClientIcon = styled(HandshakeIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})

export const CustomUserIcon = styled(ManageAccountsIcon)({
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

export const CustomMaterialsIcon = styled(InventoryRoundedIcon)({
    color: (props) => props.enable ? '#2775A2' : '#A9A9A9',
    cursor: (props) => props.enable ? 'pointer' : 'not-allowed'
})