import React, { useState, useEffect } from 'react'
import { Container, IconButtons, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import deleteIcon from '../../../../../assets/delete_icon.svg'
import editIcon from '../../../../../assets/edit_icon.svg'
import { ModalDeleteNF } from '../ModalDeleteNF'
import { ModalEditNF } from '../ModalEditNF'
import { formatDate, formatValue } from '../../../../../utils'
import { useAuth } from '../../../../../context/AuthContext'

export const NFCard = ({ NFe, handleReloadPage = () => Boolean }) => {
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
          <Grid item xs={2} lg={2}>
            <Typography>
              NFSe: <span>{NFe.number}</span>
            </Typography>
          </Grid>
          <Grid item xs={2} lg={2}>
            <Typography>
              Valor: <span>{formatValue(NFe.value)}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Date de Emissão: <span>{formatDate(NFe.date)}</span>
            </Typography>
          </Grid>

          <Grid item xs={4} lg={4}>
            <Typography>
              Ordem de Serviço: <span>{NFe.serviceOrder}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Osbervações: <span>{NFe.obs}</span>
            </Typography>
          </Grid>
        </Grid>

        <IconDiv>
          {(isAdm || clientPage.Editor) && (
            <IconButtons
              src={editIcon}
              onClick={() => { setOpenEditModal(true) }}
            />
          )}

          {(isAdm || clientPage.Exclusor) && (
            <IconButtons
              src={deleteIcon}
              onClick={() => { setOpenDeleteModal(true) }}
            />
          )}
        </IconDiv>
      </Container>

      <ModalEditNF
        open={openEditModal}
        NFe={NFe}
        handleClose={handleCloseEditModal}
        handleReloadPage={(reload) => handleReloadPageList(reload)}
      />

      <ModalDeleteNF
        open={openDeleteModal}
        NFe={NFe}
        handleClose={handleCloseDeleteModal}
        handleReloadPage={(reload) => handleReloadPageList(reload)}
      />

    </React.Fragment>
  )
}