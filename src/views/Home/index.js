import React, { useEffect, useState } from 'react'
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
import logoStylus from '../../assets/logoStylus_White.svg'
import collapseIcon from '../../assets/collapseIcon.svg'
import AccountMenu from '../../components/AccountMenu';
import { NavItems } from './../../components/Menu/Nav/Nav';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 250;

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

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState(0)
  const [menuItens, setMenuItens] = useState(NavItems())
  const navigate = useNavigate()
  const location = useLocation()
  const handleDrawerOpen = () => { setOpen(true) }
  const handleDrawerClose = () => { setOpen(false) }

  useEffect(() => {
    const currntPath = location.pathname
    const splitedPath = location.pathname.split('/').filter(p => p !== '')
    const isParent = splitedPath.length === 1

    console.log("menu Itens", menuItens)
    console.log("currente page", location)

    //TRATATIVA PARA EVOITAR QUEBRA, JÁ PENSEI NUMA OUTRA FORMA DE RESOLVER. MAS PRECISO TESTAR O REDIRECIONAMENTO PRIMEIRO

    if (isParent)
      setComponent(menuItens.filter(page => page.path === currntPath)[0].index)
    else {
      const pathBase = `/${splitedPath[0]}`
      setComponent(menuItens.filter(page => page.path === pathBase)[0].index)
    }
  }, [menuItens])

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
          <SVG
            src={logoStylus}
            onClick={() => {
              setComponent(0)
            }} />
          <Box
            marginLeft={'auto'}
            display={'flex'}
            flexDirection={'row'}
            gap={'10px'}
          >
            <AccountMenu />
          </Box>
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
            menuItens.map(item => (
              item.show && (
                <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                  <Divider
                    sx={{
                      borderColor: item.enable ? '#2775A2' : '#A9A9A9',
                      borderWidth: item.index === 1 ? '1px' : '0.5px',
                      borderStyle: 'groove'
                    }} />
                  <ListItemButton
                    onClick={() => {
                      if (item.enable) {
                        navigate(`${item.path}`)
                        setComponent(item.index)
                      }
                    }}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: item.enable ? item.index === component ? '#E0FFFF' : '#FFFFFF' : '#FFFFFF',
                      '&:hover': {
                        backgroundColor: item.enable ? '#E0FFFF' : '#FFFFFF',
                        cursor: item.enable ? 'pointer' : 'not-allowed',
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <item.icon enable={item.enable} titleAccess={item.name} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: item.enable ? '#2775A2' : '#A9A9A9',
                      }}
                    />
                  </ListItemButton>
                  <Divider sx={{
                    borderColor: item.enable ? '#2775A2' : '#A9A9A9',
                    borderWidth: item.index === menuItens.length ? '1px' : '0.5px',
                    borderStyle: 'groove'
                  }} />
                </ListItem>
              )
            ))
          }
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeaderPaper />
        <Outlet />
      </Box>
    </Box >
  );
}