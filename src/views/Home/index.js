import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import SVG from 'react-inlinesvg'
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { UserList } from '../../components/Users/List';
import { ClientList } from '../../components/Clientes/List';
import logoStylus from '../../assets/logoStylus_White.svg'
import collapseIcon from '../../assets/collapseIcon.svg'
import { CustonClientIcon, CustonOSIcon, CustonProductIcon, CustonUserIcon, CustumMaterialsIcon, CustumQuoteIcon } from './styles';
import { ProductsAndServices } from '../../components/Products';
import { MaterialList } from '../../components/Materials/List';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '77px',
  backgroundColor: '#005F89',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerHeaderPaper = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '77px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: '#003C73'
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),

  }),

);

export const MiniDrawer = () => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <SVG src={logoStylus} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {
              <SVG src={collapseIcon} />
            }
          </IconButton>
        </DrawerHeader>

        <List>
          {
            ['Usuários',
              'Clientes',
              'Produtos e Serviços',
              'Materiais',
              'Cotações',
              'Ordens de Serviço'
            ].map((text, index) => (

              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => { setComponent(index) }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: index === component ? '#E0FFFF' : '#FFFFFF'
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 && (<CustonUserIcon titleAccess='Usuários' />)}
                    {index === 1 && (<CustonClientIcon titleAccess='Clientes' />)}
                    {index === 2 && (<CustonProductIcon titleAccess='Produtos e Serviços' />)}
                    {index === 3 && (<CustumMaterialsIcon titleAccess='Materiais' />)}
                    {index === 4 && (<CustumQuoteIcon titleAccess='Cotações' />)}
                    {index === 5 && (<CustonOSIcon titleAccess='Ordens de Serviço' />)}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: '#2775A2' }} />
                </ListItemButton>
                <Divider sx={{ borderColor: '#2775A2', borderWidth: '2px', borderStyle: 'groove' }} />
              </ListItem>
            ))}
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeaderPaper />
        {component === 0 && (
          <UserList />
        )}

        {component === 1 && (
          <ClientList />
        )}

        {component === 2 && (
          <ProductsAndServices />
        )}

        {component === 3 && (
          <MaterialList />
        )}

        {component === 4 && (
          <h1>Cotações</h1>
        )}

        {component === 5 && (
          <h1>Ordens de Serviço</h1>
        )}

      </Box>
    </Box>
  );
}