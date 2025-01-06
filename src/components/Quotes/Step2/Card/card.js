import React, { useState, useEffect } from 'react'
import { Container, IconButtons, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import deleteIcon from '../../../../assets/delete_icon.svg'
import { formatValue } from '../../../../utils'
import { useAuth } from '../../../../context/AuthContext'
import { ModalDeleteQuoteProduct } from '../ModalDeleteProductItem'

export const QuoteProductCard = ({ product, handleDeleteAndReloadList = () => String }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { isAdm, quotePage } = useAuth()

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Typography>
              Produto: <span>{product.product}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Valor Unitário: <span>{formatValue(product.value)}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Quantidade: <span>{product.quantity}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Valor Total: <span>{formatValue(product.total)}</span>
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

      <ModalDeleteQuoteProduct
        open={openDeleteModal}
        product={product}
        handleClose={handleCloseDeleteModal}
        handleDeleteAndReload={(id) =>{ 
          handleDeleteAndReloadList(id)
        }}
      />
    </React.Fragment>
  )
}