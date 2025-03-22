import React, { useState, useEffect, useCallback } from 'react'
import { Container, IconButtons, IconDiv, CutomEditDetails, ChipsBox } from './styles'
import { Box, Chip, Grid, List, ListItem, Typography } from '@mui/material'
import deleteIcon from '../../../assets/delete_icon.svg'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatDateFromFront, formatValue } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import api from '../../../services/api'
import { ModalDeletePartner } from '../../Partners/ModalDeletePartner'
import { CustomSpeedDial } from '../../CustomSpeedDial'
import { CustomToast } from '../../Toast'
import { CustomBackdrop } from './../../CustomBackrop/index';

export const QuoteCard = ({
  quote,
  handleReloadPage
}) => {
  const [infoToCustomToast, setInfoToCustomToast] = useState({})
  const [openToast, setOpenToast] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const navigate = useNavigate()
  const handleCloseToast = () => { setOpenToast(false) }
  const handleReloadPageList = () => { handleReloadPage(true) }
  const { isAdm, quotePage } = useAuth()

  const getStyle = () => {
    switch (quote.status) {
      case 'Cancelada': return '#8B0000';
      case 'Aprovada': return '#008B8B';
      case 'Em Rascunho': return '#FF8C00';
      case 'Em Aprovação': return '#003C73';
      default: return '#003C73';
    }
  }

  async function CreateServiceOrder(quoteData) {
  setInfoToCustomToast({
    severity: `Gerando OS para a cotação ${quoteData.number}...Aguarde !`,
    info: 'info',
  })

  setOpenToast(true)
  setOpenBackdrop(true)

  const response = await api.CreateServiceOrder(quote)

  setInfoToCustomToast({
    severity: response.status,
    info: response.message,
  })

  setOpenToast(true)
  setOpenBackdrop(false)

  if (response.success) {
    setTimeout(() => {
      handleReloadPageList()
    }, 3000)
  }
}

  async function ChangeQuoteState(status) {
    setOpenBackdrop(true)
    const response = await api.ChangeQuoteState({
      ...quote,
      status
    })

    setInfoToCustomToast({
      severity: response.status,
      info: response.message,
    })

    setOpenToast(true)
    setOpenBackdrop(false)

    if (response.success && status === 'Aprovada') {
      setTimeout(() => {
        CreateServiceOrder(response.quote)
      }, 1000)
    }

    if (response.success && status === 'Cancelada') {
      setTimeout(() => {
        handleReloadPageList()
      }, 3000)
    }
  }

  async function discardDraft(id) {
    setOpenBackdrop(true)
    const response = await api.DiscardDraft(id)

    setInfoToCustomToast({
      severity: response.status,
      info: response.message,
    })

    setOpenToast(true)
    setOpenBackdrop(false)

    if (response.success) {
      setTimeout(() => {
        handleReloadPageList()
      }, 3000)
    }
  }

  async function generateBudget() {
    setOpenBackdrop(true)
    setInfoToCustomToast({
      severity: 'info',
      info: 'Gerando orçamento.....Aguarde !',
    })

    setOpenToast(true)

    const response = await api.GenerateBudgetPDF(quote)

    setOpenToast(false)
    setOpenBackdrop(false)

    setInfoToCustomToast({
      severity: response.status,
      info: response.message,
    })

    setOpenToast(true)

    if (response.success && response.url) {
      quote.budgetLink = response.url
      quote.budgetDocId = response.docId
      window.open(response.url, '_blank')
    }
  }

  async function downloadBudget() {
    if (quote.budgetLink) {
      window.open(quote.budgetLink, '_blank')
    }
    else {
      const response = await api.DownloadBudgetPDF(quote.budgetDocId)

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
      if (action === 'Cancelar Cotação')
        ChangeQuoteState('Cancelada')

      if (action === 'Aprovar Orçamento')
        ChangeQuoteState('Aprovada')

      if (action === 'Deletar Rascunho')
        discardDraft(quote._id)

      if (action === 'Gerar Orçamento')
        generateBudget()

      if (action === 'Baixar Orçamento' || action === 'Baixar Histórico do Orçamento')
        downloadBudget()

      if (action === 'Ver Cotação')
        navigate(`/visualizar-cotacao/${quote.number}`, { state: quote })

      if (action === 'Editar Rascunho')
        navigate(`/rascunho-cotacao/${quote.number}`, { state: quote })
    }
  }

  return (
    <React.Fragment>
      <CustomBackdrop open={openBackdrop}/>
      
      <Container status={quote.status}>
        <ChipsBox>
          <Chip
            status={quote.status}
            variant="filled"
            color="info"
            label={quote.number}
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
                  color: (quote.totalWithRate - (quote.materialsCost + quote.partnerServicesCost)) > 0 ? '#1F7A1F' : '#FF0000',
                },
              },
            }}
          >
            <Typography >
              <span>{formatValue(quote.totalWithRate - (quote.materialsCost + quote.partnerServicesCost))}</span>
            </Typography>
          </Box>
        </ChipsBox>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Typography>
              Cliente: <span>{quote.client.name}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Typography>
              Status: <span>{quote.status}</span>
            </Typography>
          </Grid>

          <Grid item xs={4} lg={4}>
            <Typography>
              Data de Criação: <span>{formatDateFromFront(quote.createdAt)}</span>
            </Typography>
          </Grid>

          {
            (quote.status === 'Em Rascunho' && new Date(quote.updatedAt).getFullYear() > 2000) && (
              <Grid item xs={4} lg={4}>
                <Typography>
                  Data de Atualização: <span>{formatDate(quote.updatedAt)}</span>
                </Typography>
              </Grid>
            )
          }

          {
            (quote.status === 'Aprovada' || quote.status === 'Cancelada') && (
              <Grid item xs={4} lg={4}>
                <Typography>
                  {quote.status === 'Aprovada' ? 'Data de Aprovação: ' : 'Data de Cancelamento: '} <span>{formatDate(quote.status === 'Aprovada' ? quote.AcceptedAt : quote.CanceledAt)}</span>
                </Typography>
              </Grid>
            )
          }

          {
            quote.status !== 'Cancelada' && (
              <Grid item xs={4} lg={4}>
                <Typography>
                  Data de Entrega: <span>{formatDate(quote.deliveryDate)}</span>
                </Typography>
              </Grid>
            )
          }

          <Grid item xs={12} lg={12}>
            <Typography>
              Valor Total: <span>{formatValue(quote.productsValue + quote.servicesValue)}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Typography>
              Custo Total: <span>{formatValue(quote.materialsCost + quote.partnerServicesCost)}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Typography>
              Valor Gerado Pelas Taxas: <span>{formatValue(quote.totalWithRate - quote.totalWithoutRate)}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Typography>
              Quanto Será Cobrado ? <span>{formatValue(quote.totalWithRate)}</span>
            </Typography>
          </Grid>
        </Grid>

        <IconDiv>
          <CustomSpeedDial
            status={quote.status}
            hasBudget={quote.budgetLink}
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

    </React.Fragment>
  )
}