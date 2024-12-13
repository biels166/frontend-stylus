import React, { useState } from 'react'
import { Container, IconButtons, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import deleteIcon from '../../../../../assets/delete_icon.svg'
import editIcon from '../../../../../assets/edit_icon.svg'
import { ModalDeleteContact } from '../ModalDeleteContact'
import { ModalEditContact } from '../ModalEditContact'
import { formatCellphone, formatPhone } from '../../../../../utils'
import { useAuth } from '../../../../../context/AuthContext'

export const ContactCard = ({ contact, handleReloadPage = () => Boolean }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { isAdm, clientPage } = useAuth()

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }
  const handleReloadPageList = () => {
    handleReloadPage(true)
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={5} lg={5}>
            <Typography>
              Nome: <span>{contact.name}</span>
            </Typography>

            <Typography>
              Cargo / Setor: <span>{contact.position}</span>
            </Typography>

            <Typography>
              E-mail: <span>{contact.email}</span>
            </Typography>
          </Grid>

          <Grid item xs={4} lg={4}>
            <Typography>
              Telefone: <span>{formatPhone(contact.telephone)}</span>
            </Typography>

            <Typography>
              Celular: <span>{formatCellphone(contact.cellphone)}</span>
            </Typography>
          </Grid>
        </Grid>

        <IconDiv>
          {
            (isAdm || clientPage.Editor) && (
              <IconButtons
                src={editIcon}
                onClick={() => { setOpenEditModal(true) }}
              />
            )
          }

          {
            (isAdm || clientPage.Exclusor) && (
              <IconButtons
                src={deleteIcon}
                onClick={() => { setOpenDeleteModal(true) }}
              />
            )
          }

        </IconDiv>

      </Container>

      <ModalEditContact
        open={openEditModal}
        contact={contact}
        handleClose={handleCloseEditModal}
        handleReloadPage={(reload) => handleReloadPageList(reload)}
      />

      <ModalDeleteContact
        open={openDeleteModal}
        contact={contact}
        handleClose={handleCloseDeleteModal}
        handleReloadPage={(reload) => handleReloadPageList(reload)}
      />

    </React.Fragment>
  )
}