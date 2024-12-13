import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { useUserData } from '../../hooks/useCredentials';
import { LogoutIcon } from './style';
import { ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const {user} = useAuth()
    const navigate = useNavigate()


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        setTimeout(() => {
            console.log("deslogando....")
            navigate('/logout')
        }, 500)
    }

    return (
        <React.Fragment>
            <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                textAlign={'center'}
            >
                <Typography
                    color='#FFFFFF'
                    fontWeight='bolder'
                    fontFamily='sans-serif'
                    fontSize='20px'
                >
                    {user.name}
                </Typography>
                <Tooltip title="Minha Conta">
                    <IconButton
                        onClick={handleClick}
                        size="large"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            alt={user.name}
                            width={40}
                            height={40}
                            sx={{ bgcolor: '#2775A2' }}
                        >{user.name?.charAt(0)}</Avatar>

                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Divider sx={{ borderColor: '#2775A2', borderWidth: '0.5px', borderStyle: 'groove' }} />
                <MenuItem
                    sx={{
                        '&:hover': {
                            backgroundColor: '#E0FFFF'
                        }
                    }}
                    onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary='Sair' sx={{ opacity: open ? 1 : 0, color: '#2775A2' }} />
                </MenuItem>
                <Divider sx={{ borderColor: '#2775A2', borderWidth: '0.5px', borderStyle: 'groove' }} />

            </Menu>
        </React.Fragment>
    )
}