import React, { useState, useEffect } from 'react'
import { Container, IconButtons, IconDiv } from './styles'
import { Grid, Typography } from '@mui/material'
import deleteIcon from '../../../../assets/delete_icon.svg'
import { formatValue } from '../../../../utils'
import { useAuth } from '../../../../context/AuthContext'
import { ModalDeleteQuoteMaterial } from '../ModalDeleteMaterialItem'

export const QuoteMaterialCard = ({ material, handleDeleteAndReloadList = () => String }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { isAdm, quotePage } = useAuth()

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={8} lg={8}>
            <Typography>
              Insumo: <span>{material.itemCode} - {material.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Lote: <span>{material.batch?.batch}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Custo Unitário: <span>{formatValue(material.batch?.costPerItem)}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Quantidade: <span>{material.quantity}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Custo Total: <span>{formatValue(material.totalCost)}</span>
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

      <ModalDeleteQuoteMaterial
        open={openDeleteModal}
        material={material}
        handleClose={handleCloseDeleteModal}
        handleDeleteAndReload={(itemCode) =>{ 
          handleDeleteAndReloadList(itemCode)
        }}
      />
    </React.Fragment>
  )
}