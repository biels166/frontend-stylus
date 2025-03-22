import React, { useState, useEffect, useCallback } from 'react'
import { Container, IconButtons, IconDiv, CutomEditDetails, ChipsBox } from './styles'
import { Box, Chip, Grid, List, ListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatDateFromFront, formatValue } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import api from '../../../services/api'
import { CustomSpeedDial } from '../../CustomSpeedDial'
import { CustomToast } from '../../Toast'
import { CustomBackdrop } from './../../CustomBackrop/index';
import { ModalFinishOrder } from '../ModalFinishOrder'

export const ServiceOrderCard = ({
  order,
  handleReloadPage
}) => {
  const [infoToCustomToast, setInfoToCustomToast] = useState({})
  const [openToast, setOpenToast] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const navigate = useNavigate()
  const handleCloseToast = () => { setOpenToast(false) }
  const handleCloseModal = () => { setOpenModal(false) }
  const handleReloadPageList = () => { handleReloadPage(true) }
  const { isAdm, quotePage } = useAuth()

  const getStyle = () => {
    switch (order.stateStyle) {
      case 'Atrasada': return '#8B0000';
      case 'Amanhã': return '#008B8B';
      case 'Hoje': return '#FF8C00';
      case 'Essa Semana': return '#003C73';
      case 'Concluída': return '#1F7A1F';
      default: return '#003C73';
    }
  }

  async function downloadBudget() {
    if (order.budgetLink) {
      window.open(order.budgetLink, '_blank')
    }
    else {
      const response = await api.DownloadBudgetPDF(order.budgetDocId)

      setInfoToCustomToast({
        severity: response.status,
        info: response.message,
      })

      if (response.success && response.url) {
        window.open(response.url, '_blank')
      }
      else {
        setOpenToast(true)
      }
    }
  }

  const handleAction = (action = '') => {
    if (action !== '') {
      if (action === 'Baixar Orçamento' || action === 'Baixar Histórico do Orçamento')
        downloadBudget()

      if (action === 'Ver Cotação')
        navigate(`/visualizar-cotacao/${order.number}`, { state: order })

      if (action === 'Ver Ordem de Serviço')
        navigate(`/visualizar-ordem/${order.number}`, { state: order })

      if (action === 'Finalizar Ordem de Serviço')
        setOpenModal(true)
    }
  }

  return (
    <React.Fragment>
      <CustomBackdrop open={openBackdrop} />

      <Container
        stateStyle={order.stateStyle}
        status={order.status}
      >
        <ChipsBox>
          <Chip
            status={order.status}
            variant="filled"
            color="info"
            label={order.number}
            sx={{
              backgroundColor: getStyle()
            }}
          />

          <Box
            display={'flex'}
            justifyContent={'center'}
            marginTop={'5px'}
            width={'100%'}
            sx={{
              '& .MuiTypography-root': {
                color: getStyle(),
                fontWeight: 'bolder',
                fontFamily: 'sans-serif',
                fontSize: '18px',
                '& span': {
                  color: (order.totalWithRate - (order.materialsCost + order.partnerServicesCost)) > 0 ? '#1F7A1F' : '#FF0000',
                },
              },
            }}
          >
            <Typography >
              <span>{formatValue(order.totalWithRate - (order.materialsCost + order.partnerServicesCost))}</span>
            </Typography>
          </Box>
        </ChipsBox>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Typography>
              Cliente: <span>{order.client.name}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Typography>
              Status: <span>{order.status}</span>
            </Typography>
          </Grid>

          <Grid item xs={4} lg={4}>
            <Typography>
              Data de Criação: <span>{formatDateFromFront(order.createdAt)}</span>
            </Typography>
          </Grid>

          {
            (order.status === 'Em Rascunho' && new Date(order.updatedAt).getFullYear() > 2000) && (
              <Grid item xs={4} lg={4}>
                <Typography>
                  Data de Atualização: <span>{formatDate(order.updatedAt)}</span>
                </Typography>
              </Grid>
            )
          }

          {
            (order.status === 'Aprovada' || order.status === 'Cancelada') && (
              <Grid item xs={4} lg={4}>
                <Typography>
                  {order.status === 'Aprovada' ? 'Data de Aprovação: ' : 'Data de Cancelamento: '} <span>{formatDate(order.status === 'Aprovada' ? order.AcceptedAt : order.CanceledAt)}</span>
                </Typography>
              </Grid>
            )
          }

          {
            order.status !== 'Cancelada' && (
              <Grid item xs={4} lg={4}>
                <Typography>
                  Data de Entrega: <span>{formatDate(order.deliveryDate)}</span>
                </Typography>
              </Grid>
            )
          }

          <Grid item xs={12} lg={12}>
            <Typography>
              Valor Total: <span>{formatValue(order.productsValue + order.servicesValue)}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Typography>
              Custo Total: <span>{formatValue(order.materialsCost + order.partnerServicesCost)}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Typography>
              Valor Gerado Pelas Taxas: <span>{formatValue(order.totalWithRate - order.totalWithoutRate)}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Typography>
              Quanto Será Cobrado ? <span>{formatValue(order.totalWithRate)}</span>
            </Typography>
          </Grid>
        </Grid>

        <IconDiv>
          <CustomSpeedDial
            status={order.status}
            hasBudget={order.budgetLink}
            handleSelected={(selected) => { handleAction(selected) }}
          />
        </IconDiv>
      </Container>

      <CustomToast
        open={openToast}
        timeDuration={10000}
        severity={infoToCustomToast.severity}
        info={infoToCustomToast.info}
        handleOnClose={handleCloseToast}
      />

      <ModalFinishOrder
        open={openModal}
        orderData={order}
        handleClose={handleCloseModal}
        handleReloadPage={(reload) => handleReloadPageList()}
      />

    </React.Fragment>
  )
}