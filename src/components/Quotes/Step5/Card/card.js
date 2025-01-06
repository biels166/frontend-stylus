import React, { useState, useEffect } from 'react'
import { Container, IconButtons, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import deleteIcon from '../../../../assets/delete_icon.svg'
import { formatValue } from '../../../../utils'
import { useAuth } from '../../../../context/AuthContext'
import { ModalDeleteQuotePartnerService } from '../ModalDeletePartnerServicetem'

export const QuotePartnerServiceCard = ({ partnerService, handleDeleteAndReloadList = () => String }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { isAdm, quotePage } = useAuth()

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6} lg={6}>
            <Typography>
              Serviço: <span>{partnerService.itemCode} - {partnerService.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={6} lg={6}>
            <Typography>
              Prestador do Serviço: <span>{partnerService.outsourced?.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Custo Unitário: <span>{formatValue(partnerService.value)}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Quantidade: <span>{partnerService.quantity}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Custo Total: <span>{formatValue(partnerService.totalCost)}</span>
            </Typography>
          </Grid>
        </Grid>

        <IconDiv>
          {(isAdm || quotePage.Exclusor) && (
            <IconButtons
              src={deleteIcon}
              onClick={() => { setOpenDeleteModal(true) }}
            />
          )}
        </IconDiv>
      </Container>

      <ModalDeleteQuotePartnerService
        open={openDeleteModal}
        partnerService={partnerService}
        handleClose={handleCloseDeleteModal}
        handleDeleteAndReload={(id) =>{ 
          handleDeleteAndReloadList(id)
        }}
      />
    </React.Fragment>
  )
}