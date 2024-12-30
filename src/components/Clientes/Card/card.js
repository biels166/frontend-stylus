import React, { useState } from 'react'
import { Container, CutomEditDetails, IconButtons, IconDiv } from './styles'
import {  Box, Grid, Typography } from '@mui/material'
import deleteIcon from '../../../assets/delete_icon.svg'
import { useNavigate } from 'react-router-dom'
import { ModalDeleteClient } from '../ModalDeleteClient'
import { docType, formatCellphone, formatDocument, formatPhone } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'

export const ClientCard = ({
  client,
  handleReloadPage
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate()
  const handleCloseDeleteModal = () => { setOpenDeleteModal(false) }
  const handleReloadPageList = () => { handleReloadPage(true) }
  const { isAdm, clientPage } = useAuth()

  return (
    <React.Fragment>
      <Container>
        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
          <Grid container spacing={3}>
            <Grid item xs={4} lg={4}>
              <Typography>
                Nome: <span>{client.name}</span>
              </Typography>

              <Typography>
                Telefone: <span>{formatPhone(client.telephone)}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                {docType(client.document)}: <span>{formatDocument(client.document)}</span>
              </Typography>

              <Typography>
                Celular: <span>{formatCellphone(client.cellphone)}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                E-mail: <span>{client.email}</span>
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: '3px' }}>
            <Grid item xs={4} lg={4}>
              <Typography>
                Logradouro: <span>{client.street}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Número: <span>{client.number}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Complemento: <span>{client.complement}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Bairro: <span>{client.district}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Cidade: <span>{client.city}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Estado: <span>{client.state}</span>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'}>

          <IconDiv>
            {
              (isAdm || clientPage.Viewer) && (
                <CutomEditDetails
                  fontSize="large"
                  onClick={() => { navigate(`/clientes/${client._id}`, { state: client }) }}
                />
              )
            }

            {
              (isAdm || clientPage.Exclusor) && (
                <IconButtons src={deleteIcon}
                  onClick={() => { setOpenDeleteModal(true) }}
                />
              )
            }

          </IconDiv>
        </Box>
      </Container>

      <ModalDeleteClient
        open={openDeleteModal}
        client={client}
        handleClose={handleCloseDeleteModal}
        handleReloadPage={() => handleReloadPageList()}
      />

    </React.Fragment>
  )
}