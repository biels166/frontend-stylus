import React from 'react'
import { Container, CutomDisableViewDetails, CutomViewDetails, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const StockCard = ({ stock }) => {
  const { isAdm, materialPage } = useAuth()
  const navigate = useNavigate()

  const Alert = ((stock.quantityUsing + stock.quantityConsumed) / stock.quantityPurcashed) >= 0.7

  return (
    <Container alert={Alert}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Typography>
            Material: <span>{stock.description}</span>
          </Typography>
        </Grid>
        <Grid item xs={6} lg={6}>
          <Typography>
            Qtd do Item em Reserva: <span>{stock?.quantityReserved}</span>
          </Typography>
        </Grid>
        <Grid item xs={6} lg={6}>
          <Typography>
            Qtd do Item em Utilização: <span>{stock?.quantityUsing}</span>
          </Typography>
        </Grid>
        <Grid item xs={6} lg={6}>
          <Typography>
            Qtd do Item já Utilizada: <span>{stock?.quantityConsumed}</span>
          </Typography>
        </Grid>
        <Grid item xs={6} lg={6}>
          <Typography>
            Qtd do Item Disponível: <span>{stock?.quantityAvailable}</span>
          </Typography>
        </Grid>
      </Grid>

      <IconDiv>
        {
          (isAdm || materialPage.Viewer) && (
            stock.counterBatches > 0 ? (
              <CutomViewDetails
                fontSize="large"
                onClick={() => {
                  navigate(
                    `/estoque/${stock.itemCode}`, { state: stock },
                  )
                }}
              />) : (
              <CutomDisableViewDetails
                fontSize="large"
              />
            )
          )
        }
      </IconDiv>
    </Container>
  )
}