import * as React from 'react';
import { TextField } from '@mui/material'
import {
  Logo,
  LoginButton,
  LoginBox,
  Container,
  ForgotPasswordButton,
  ContainerLoginButtons,
  BlockViewIcon,
  ViewIcon,
  LeftBackground
} from './styles';
import logoStylus from '../../assets/logoStylus.png'
import leftSide from '../../assets/left_side_2.png'
import api from '../../services/api'
import CryptoJS from 'crypto-js'
import { CustomToast } from '../../components/Toast/index';
import { useNavigate } from 'react-router-dom';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [userLogin, setUserLogin] = React.useState('')
  const [userPassword, setUserPassword] = React.useState('')
  const [blockView, setBlockView] = React.useState(true)
  const [openToast, setOpenToast] = React.useState(false)
  const [status, setStatus] = React.useState('')
  const [message, setMessage] = React.useState('')
  const { login } = useAuth()
  const navigate = useNavigate() 
  

  const authLogin = async () => {
    const encryptedPassword = CryptoJS.AES.encrypt(userPassword, process.env.REACT_APP_SCRT_INTEGRATION).toString()

    const auth = await api.AuthUserLogin(userLogin, encryptedPassword)
    
    setOpenToast(true)
    setStatus(auth.status)
    setMessage(auth.message)

    if (auth.success) {
      login(auth.data.token, { ...auth.data.user, password: encryptedPassword }, navigate)

      setTimeout(() => { navigate('/home') }, 4000)
    }
  }

  const handleForgotPassword = () => {
    window.alert('Funcionalidade em deploy. Favor entrar em contato com o suporte.')
  }

  const handleTogglePasswordVisibility = () => {
    setBlockView(!blockView)
  }

  const handleCloseToast = () => {
    setOpenToast(false)
    setStatus('')
    setMessage('')
  }

  return (
    <React.Fragment>
      <Container>
        <LeftBackground src={leftSide} alt="Background" />

        <LoginBox component="form">
          <Logo src={logoStylus} alt='Logo Stylus' />

          <TextField
            required
            id="outlined-required"
            label="Usuário"
            placeholder="digite seu e-mail ou usuário"
            onChange={(e) => setUserLogin(e.target.value)}
          />

          <TextField
            required
            id="outlined-password-input"
            label="Senha"
            type={blockView ? "password" : "text"}
            placeholder="digite sua senha"
            onChange={(e) => setUserPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {blockView ? <BlockViewIcon /> : <ViewIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <ContainerLoginButtons>
            <LoginButton
              variant="contained"
              size="medium"
              type='submit'
              onClick={(e) => {
                e.preventDefault()
                authLogin()
              }}
            >
              LOGAR
            </LoginButton>

            <ForgotPasswordButton
              variant="contained"
              size="medium"
              onClick={(e) => {
                e.preventDefault()
                handleForgotPassword()
              }}
            >
              ESQUECI MINHA SENHA
            </ForgotPasswordButton>
          </ContainerLoginButtons>
        </LoginBox>
      </Container>

      <CustomToast
        open={openToast}
        severity={status}
        info={message}
        handleOnClose={() => {
          handleCloseToast()
        }}
      />
    </React.Fragment>
  )
}

export default Login