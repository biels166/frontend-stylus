import React, { useEffect, useState } from 'react'
import { Container, IconButtons, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import editIcon from '../../../assets/edit_icon.svg'
import deleteIcon from '../../../assets/delete_icon.svg'

import { ModalDeleteUser } from '../ModalDeleteUser'
import { ModalEditUser } from '../ModalEditUser'
import { useAuth } from '../../../context/AuthContext'


export const UserCard = ({
  user, handleReloadPage = () => Boolean
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const { isAdm, userPage } = useAuth()

  const handleReloadPageList = (reload) => {
    handleReloadPage(reload)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModel(false)
  }

  const extractRoles = () => {
    return user.roles
      .filter(role => role.value)
      .map(role => role.description)
      .join(', ')
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Typography>
              Nome: <span>{user.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Login: <span>{user.user}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              E-mail: <span>{user.email}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Permissões: <span>{extractRoles()}</span>
            </Typography>
          </Grid>
        </Grid>

        <IconDiv>
          {
            (isAdm || userPage.Editor) && (
              <IconButtons
                src={editIcon}
                onClick={() => { setOpenEditModal(true) }}
              />
            )
          }

          {
            (isAdm || userPage.Exclusor) && (
              <IconButtons
                src={deleteIcon}
                onClick={() => { setOpenDeleteModel(true) }}
              />
            )
          }

        </IconDiv>
      </Container>

      <ModalEditUser
        open={openEditModal}
        userData={user}
        handleClose={handleCloseEditModal}
        handleReloadPage={(reload) => handleReloadPageList(reload)}
      />

      <ModalDeleteUser
        open={openDeleteModel}
        userData={user}
        handleClose={handleCloseDeleteModal}
        handleReloadPage={(reload) => handleReloadPageList(reload)}
      />
    </React.Fragment>
  )
}