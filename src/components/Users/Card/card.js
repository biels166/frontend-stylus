import React, { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react'
import { CancelButton, CloseIcon, Container, CustomModalBody, CustomModalFooter, CustomModalHeader, CustomModalPaper, IconButtons, IconDiv, SaveButtonUserButton } from './styles'
import { Alert, Box, Grid, Modal, Snackbar, TextField, Typography } from '@mui/material'
import editIcon from '../../../assets/edit_icon.svg'
import deleteIcon from '../../../assets/delete_icon.svg'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'


export const UserCard = ({
  nameInput,
  emailInput,
  loginInput,
  rolesInput,
  passwordInput,
  _id,
  handleReloadPage
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openToast, setOpenToast] = useState(false)
  const [name, setName] = useState(nameInput)
  const [password, setPassword] = useState(passwordInput)
  const [email, setEmail] = useState(emailInput)
  const [login, setLogin] = useState(loginInput)
  const [roles, setRoles] = useState(rolesInput)
  const [responseStatus, setResponseStatus] = useState('')
  const [responseInfo, setResponseInfo] = useState('')

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModel(false)
  }

  const handleCloseToast = () => {
    setOpenToast(false)
  }

  async function updateUSer() {
    let body = {
      name: `${name}`,
      user: `${login}`,
      email: `${email}`,
      password: `${password}`,
      roles: `${roles}`
    }

    await api.put(`/user/${_id}`, body)
      .then(
        response => {
          setResponseStatus('success')
          setResponseInfo('Atualizações salvas com sucesso')
          setOpenToast(true)
          setOpenEditModal(false)
        }
      ).catch(erro => {
        setResponseStatus('error')
        setResponseInfo(erro.response.data.error)
        setOpenToast(true)
      })
  }


  async function deleteUser() {
    await api.delete(`/user/${_id}`)
      .then(
        response => {
          setResponseStatus('success')
          setResponseInfo('Usuário deletado com sucesso')
          setOpenToast(true)
          setOpenDeleteModel(false)
        }
      ).catch(erro => {
        setResponseStatus('error')
        setResponseInfo(erro.response.data.error)
        setOpenToast(true)
      })
  }
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Typography>
              Nome: <span>{name}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Login: <span>{login}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              E-mail: <span>{email}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Permissões: <span>{roles}</span>
            </Typography>
          </Grid>
        </Grid>

        <IconDiv>
          <IconButtons src={editIcon}
            onClick={() => { setOpenEditModal(true) }}
          />

          <IconButtons src={deleteIcon}
            onClick={() => { setOpenDeleteModel(true) }}
          />
        </IconDiv>
      </Container>

      <div>
        <Modal
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomModalPaper>
            <CustomModalHeader>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Editar Usuário
              </Typography>

              <CloseIcon src={closeIcon}
                onClick={handleCloseEditModal}
              />
            </CustomModalHeader>

            <Box>
              <CustomModalBody>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                  <TextField
                    required
                    id="outlined-required-name"
                    label="Nome"
                    placeholder="digite o nome do usuário"
                    value={name}
                    onChange={(e) => {
                      let newName = e.target.value
                      setName(newName)
                    }}
                  />

                  <TextField
                    type='password'
                    required
                    id="outlined-required-password"
                    label="Senha"
                    placeholder="digite a senha do usuário"
                    value={password}
                    onChange={(e) => {
                      let newPass = e.target.value
                      setPassword(newPass)
                    }}
                  />
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
                  <TextField
                    required
                    id="outlined-required-email"
                    label="E-mail"
                    placeholder="digite o email do usuário"
                    value={email}
                    onChange={(e) => {
                      let newEmail = e.target.value
                      setEmail(newEmail)
                    }}
                  />

                  <TextField
                    required
                    id="outlined-required-login"
                    label="Login"
                    placeholder="digite o login do usuário"
                    value={login}
                    onChange={(e) => {
                      let newLogin = e.target.value
                      setLogin(newLogin)
                    }}
                  />
                </Box>

                <TextField
                  fullWidth={true}
                  id="outlined-required-roles"
                  label="Permissões"
                  placeholder="digite as permissões do usuário"
                  value={roles}
                  onChange={(e) => {
                    let newRoles = e.target.value
                    setRoles(newRoles)
                  }}
                />
              </CustomModalBody>

              <CustomModalFooter>
                <SaveButtonUserButton
                  onClick={() => {
                    updateUSer()
                  }}
                >
                  Salvar
                </SaveButtonUserButton>
              </CustomModalFooter>
            </Box>

          </CustomModalPaper>
        </Modal>
      </div>

      <div>
        <Modal
          open={openDeleteModel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomModalPaper>
            <CustomModalHeader>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Deletar Usuário
              </Typography>

              <CloseIcon src={closeIcon}
                onClick={handleCloseDeleteModal}
              />
            </CustomModalHeader>

            <Box>
              <CustomModalBody>
                <p>
                  Deseja excluir "{name}" da lista de usuários ?
                </p>
              </CustomModalBody>

              <CustomModalFooter>
                <CancelButton
                  onClick={handleCloseDeleteModal}>
                  Cancelar
                </CancelButton>
                <SaveButtonUserButton
                  onClick={() => {
                    deleteUser()

                    setTimeout(() => {
                      handleReloadPage(true);
                    }, 6000)
                  }}
                >
                  Deletar
                </SaveButtonUserButton>
              </CustomModalFooter>
            </Box>

          </CustomModalPaper>
        </Modal>
      </div >

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={`${responseStatus}`}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {responseInfo}
        </Alert>
      </Snackbar>
    </>
  )
}