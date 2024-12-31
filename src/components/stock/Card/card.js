import React from 'react'
import { Container, CutomViewDetails, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const StockCard = ({ stock }) => {
  const { isAdm, materialPage } = useAuth()
  const navigate = useNavigate()

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Typography>
            Material: <span>{stock.description}</span>
          </Typography>
        </Grid>
        <Grid item xs={4} lg={4}>
          <Typography>
            Qtd do Item em Reserva: <span>{stock?.quantityReserved}</span>
          </Typography>
        </Grid>
        <Grid item xs={4} lg={4}>
          <Typography>
          Qtd do Item já Utilizada: <span>{stock?.quantityConsumed}</span>
          </Typography>
        </Grid>
        <Grid item xs={4} lg={4}>
          <Typography>
          Qtd do Item Disponível: <span>{stock?.quantityAvailable}</span>
          </Typography>
        </Grid>
      </Grid>

      <IconDiv>
        {
          (isAdm || materialPage.Viewer) && (
            <CutomViewDetails
              fontSize="large"
              onClick={() => {
                navigate(
                  `/estoque/${stock.itemCode}`, { state: stock },
                )
              }}
            />
          )
        }
      </IconDiv>
    </Container>
  )
}