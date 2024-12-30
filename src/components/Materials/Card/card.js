import React, { useState, useEffect } from 'react'
import {Container } from './styles'
import { Grid, Typography } from '@mui/material'
import { formatDate, formatValue } from '../../../utils'
import api from './../../../services/api';


export const MaterialCard = ({ material }) => {
  const [item, setItem] = useState({})
  const [supplier, setSupplier] = useState({})

  const formatCostInfos = () => {
    let costInfo = `${material.quantity} ${material.type}`
    
    if (material.categoryId !== '300')
      costInfo += ` com ${material.quantityReference} ${material.typeReference} cada`

    return costInfo
  }

  async function getItemByItemCode() {
    const response = await api.GetByItemCode(material?.itemId)
    setItem(response.item)
  }

  async function getPartnerById() {
    const response = await api.GetPartnerById(material.supplierId)
    setSupplier(response.partner)
  }

  useEffect(() => {
    getItemByItemCode()
    getPartnerById()
  }, [])

  return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4} lg={4}>
            <Typography>
              Material: <span>{material.itemId} - {item?.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Lote da Compra: <span>{material.batch}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Data da Compra: <span>{formatDate(material.purchasedIn)}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Dados da Quantidade: <span>{formatCostInfos()}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Valor Total Pago: <span>{formatValue(material.totalCost)}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Valor Unitário Pago: <span>{formatValue(material.costPerItem)}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Fornecedor: <span>{supplier?.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Observações: <span>{material?.observations}</span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
  )
}