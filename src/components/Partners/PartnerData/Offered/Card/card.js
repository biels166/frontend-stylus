import React, { useState } from 'react'
import { Container, IconButtons, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import deleteIcon from '../../../../../assets/delete_icon.svg'
import editIcon from '../../../../../assets/edit_icon.svg'
import { ModalDeleteOffered } from '../ModalDeleteOffered'
import { ModalEditOffered } from '../ModalEditOffered'
import { formatValue } from '../../../../../utils'
import { useAuth } from '../../../../../context/AuthContext'
import { useLocation } from 'react-router-dom'

export const OfferedCard = ({ Offered, handleReloadPage = () => Boolean }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const location = useLocation()
  const dynamicOffered = location.state?.isSupplier ? 'Produto Fornecido' : 'Serviço Oferecido'
  const { isAdm, partnerPage } = useAuth()

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
          <Grid item xs={4} lg={4}>
            <Typography>
              {dynamicOffered}: <span>{Offered.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={2} lg={2}>
            <Typography>
              Valor: <span>{formatValue(Offered.value)}</span>
            </Typography>
          </Grid>

          <Grid item xs={6} lg={6}>
            <Typography>
              Osbervações: <span>{Offered.observation}</span>
            </Typography>
          </Grid>
        </Grid>

        <IconDiv>
          {(isAdm || partnerPage.Editor) && (
            <IconButtons
              src={editIcon}
              onClick={() => { setOpenEditModal(true) }}
            />
          )}

          {(isAdm || partnerPage.Exclusor) && (
            <IconButtons
              src={deleteIcon}
              onClick={() => { setOpenDeleteModal(true) }}
            />
          )}
        </IconDiv>
      </Container>

      <ModalEditOffered
        open={openEditModal}
        Offered={Offered}
        handleClose={handleCloseEditModal}
        handleReloadPage={(reload) => handleReloadPageList(reload)}
      />

      <ModalDeleteOffered
        open={openDeleteModal}
        Offered={Offered}
        handleClose={handleCloseDeleteModal}
        handleReloadPage={(reload) => handleReloadPageList(reload)}
      />

    </React.Fragment>
  )
}