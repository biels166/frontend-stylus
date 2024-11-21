import * as React from 'react';
import { TextField } from '@mui/material'
import {
  Logo,
  LoginButton,
  LoginBox,
  Container
} from './styles';
import logoStylus from '../../assets/logoStylus.png'
import leftSide from '../../assets/left_side_2.png'

function Login() {
  return (
    <Container>
      <img src={leftSide} alt="Background"/>

      <LoginBox component="form">
        <Logo src={logoStylus} alt='Logo Stylus' />

        <TextField
          required
          id="outlined-required"
          label="Usuário"
          placeholder="difite seu e-mail"
        />

        <TextField
          required
          id="outlined-password-input"
          label="Senha"
          type="password"
          placeholder="difite sua senha"
        />
        <LoginButton
          variant="contained"
          size="medium"
          type='submit'>
          ENTRAR
        </LoginButton>
      </LoginBox>
    </Container>

  );
}

export default Login;