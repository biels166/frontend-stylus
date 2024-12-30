import React, { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react'
import { CancelButton, CloseIcon, Container, CustomModalBody, CustomModalFooter, CustomModalHeader, CustomModalPaper, IconButtons, IconDiv, SaveButton, ShowMore } from './styles'
import { Alert, Autocomplete, Box, Grid, MenuItem, Modal, Snackbar, TextField, Typography } from '@mui/material'
import editIcon from '../../../assets/edit_icon.svg'
import deleteIcon from '../../../assets/delete_icon.svg'
import closeIcon from '../../../assets/close_icon.svg'
import nfseIcon from '../../../assets/NFSe_Icon_Logo.svg'
import api from '../../../services/api'
import { UFS, UFs } from '../../../constants/UFS'
import { CITIES_BY_STATE } from '../../../constants/CITIES_BY_STATE'
import { formatValue } from '../../../utils'
import { CustomToast } from '../../Toast'
import { ModalEditItem } from '../ModalEditItem'
import { useAuth } from '../../../context/AuthContext'
import { ModalDeleteItem } from '../ModalDeleteItem'


export const CategoryCard = ({
  item,
  handleReloadPageList = () => Boolean
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [responseStatus, setResponseStatus] = useState('')
  const [responseInfo, setResponseInfo] = useState('')
  const [options, setOptions] = useState([])
  const [infoToCustomToast, setInfoToCustomToast] = useState({})
  const [openToast, setOpenToast] = useState(false)
  const { isAdm, materialPage } = useAuth()

  const handleCloseEditModal = () => { setOpenEditModal(false) }
  const handleCloseDeleteModal = () => { setOpenDeleteModal(false) }
  const handleCloseToast = () => { setOpenToast(false) }

  async function getCategoryOptions() {
    const response = await api.GetCategoryOptions()
    setOptions(response.categories)
  }

  useEffect(() => {
    getCategoryOptions()
  }, [])

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6} lg={6}>
            <Typography>
              Item: <span>{item.itemCode} - {item.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Typography>
              Categoria: <span>{options?.find(category => category.code === item.categoryCode)?.description}</span>
            </Typography>
          </Grid>
        </Grid>

        <Box display={'flex'} justifyContent={'space-between'}>
          <IconDiv>
            {(isAdm || materialPage.Editor) && (
              <IconButtons src={editIcon}
                onClick={() => { setOpenEditModal(true) }}
              />
            )}

            {(isAdm || materialPage.Exclusor) && (
              <IconButtons src={deleteIcon}
                onClick={() => { setOpenDeleteModal(true) }}
              />
            )}
          </IconDiv>
        </Box>
      </Container>

      <ModalEditItem
        item={item}
        open={openEditModal}
        handleClose={handleCloseEditModal}
        handleReloadPage={(reload) => { handleReloadPageList(reload) }}
      />

      <ModalDeleteItem
        item={item}
        category={options?.find(category => category.code === item.categoryCode)?.name}
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleReloadPage={(reload) => { handleReloadPageList(reload) }}
      />

      <CustomToast
        open={openToast}
        severity={infoToCustomToast.severity}
        info={infoToCustomToast.info}
        handleOnClose={handleCloseToast}
      />
    </React.Fragment>
  )
}