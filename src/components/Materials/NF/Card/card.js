import React, { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react'
import { Container } from './styles'
import { Grid, Typography } from '@mui/material'

export const NFCard = ({
  numberInput,
  dateInput,
  valueInput,
  OSInput,
  obsInput,
}) => {


  const formatDate = (date) => {
    return new Date(date).toLocaleString().split(",")[0]
  }

  const formatValue = (value) => {
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value);
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={2} lg={2}>
          <Typography>
            NFSe: <span>{numberInput}</span>
          </Typography>
        </Grid>
        <Grid item xs={2} lg={2}>
          <Typography>
            Valor: <span>{formatValue(valueInput)}</span>
          </Typography>
        </Grid>
        <Grid item xs={4} lg={4}>
          <Typography>
            Date de Emissão: <span>{formatDate(dateInput)}</span>
          </Typography>
        </Grid>

        <Grid item xs={4} lg={4}>
          <Typography>
            Ordem de Serviço: <span>{OSInput}</span>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography>
            Osbervações: <span>{obsInput}</span>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}