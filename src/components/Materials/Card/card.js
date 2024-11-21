import React, { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react'
import { CancelButton, CloseIcon, Container, CustomModalBody, CustomModalFooter, CustomModalHeader, CustomModalPaper, IconButtons, IconDiv, NFSButton, SaveButton, ShowMore } from './styles'
import { Alert, Autocomplete, Box, Grid, MenuItem, Modal, Snackbar, TextField, Typography } from '@mui/material'
import editIcon from '../../../assets/edit_icon.svg'
import deleteIcon from '../../../assets/delete_icon.svg'
import closeIcon from '../../../assets/close_icon.svg'
import nfseIcon from '../../../assets/NFSe_Icon_Logo.svg'
import api from '../../../services/api'
import { UFS, UFs } from '../../../constants/UFS'
import { CITIES_BY_STATE } from '../../../constants/CITIES_BY_STATE'
import { NFList } from '../NF/List'


export const MaterialCard = ({
  materialObjt,
  handleReloadPage
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openNFModel, setOpenNFModel] = useState(false);
  const [openToast, setOpenToast] = useState(false)
  const [code, setCode] = useState(materialObjt.code)
  const [materialCode, setMaterialCode] = useState(materialObjt.materialCode)
  const [material, setMaterial] = useState(materialObjt.material)
  const [type, setType] = useState(materialObjt.type)
  const [referenceType, setReferenceType] = useState(materialObjt.referenceType)
  const [quantity, setQuantity] = useState(materialObjt.quantity)
  const [referenceQtd, setReferenceQtd] = useState(materialObjt.referenceQtd)
  const [materialValue, setMaterialValue] = useState(materialObjt.materialValue)
  const [itemValue, setItemValue] = useState(materialObjt.itemValue)
  const [value, setValue] = useState(materialObjt.value)
  const [format, setFormat] = useState(materialObjt.format)
  const [obs, setObs] = useState(materialObjt.obs)
  const [responseStatus, setResponseStatus] = useState('')
  const [responseInfo, setResponseInfo] = useState('')

  const formatValue = (dataValue) => {
    return dataValue.toString().replace(".",",")
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModel(false)
  }

  const handleCloseNFModal = () => {
    setOpenNFModel(false)
  }

  const handleCloseToast = () => {
    setOpenToast(false)
  }

  async function updateClient() {
    let body = {

    }

    await api.put(`/client/${materialObjt._id}`, body)
      .then(
        response => {
          setResponseStatus('success')
          setResponseInfo('Atualizações salvas com sucesso')
          setOpenToast(true)
          setOpenEditModal(false)
        }
      ).catch(erro => {
        setResponseStatus('error')
        setResponseInfo(erro.response.data.error)
        setOpenToast(true)
      })
  }

  async function deleteClient() {
    await api.delete(`/client/${materialObjt._id}`)
      .then(
        response => {
          setResponseStatus('success')
          setResponseInfo('Cliente deletado com sucesso')
          setOpenToast(true)
          setOpenDeleteModel(false)
        }
      ).catch(erro => {
        setResponseStatus('error')
        setResponseInfo(erro.response.data.error)
        setOpenToast(true)
      })
  }
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Typography>
              Código: <span>{code}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
            Material: <span>{material}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Tipo: <span>{type}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Qtd Comprada: <span>{quantity}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Valor pago: <span>R$ {formatValue(materialValue)}</span>
            </Typography>
          </Grid>
        </Grid>

        <Box display={'flex'} justifyContent={'space-between'}>
          <IconDiv>
            <IconButtons src={editIcon}
              onClick={() => { setOpenEditModal(true) }}
            />

            <IconButtons src={deleteIcon}
              onClick={() => { setOpenDeleteModel(true) }}
            />
          </IconDiv>
        </Box>
      </Container>



      <div>
        <Modal
          open={openDeleteModel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomModalPaper>
            <CustomModalHeader>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Deletar Cliente
              </Typography>

              <CloseIcon src={closeIcon}
                onClick={handleCloseDeleteModal}
              />
            </CustomModalHeader>

            <Box>
              <CustomModalBody>
                <p>
                  Deseja excluir "{material}" da lista de clientes ?
                </p>
              </CustomModalBody>

              <CustomModalFooter>
                <CancelButton
                  onClick={handleCloseDeleteModal}>
                  Cancelar
                </CancelButton>
                <SaveButton
                  onClick={() => {
                    deleteClient()

                    setTimeout(() => {
                      handleReloadPage(true);
                    }, 2000)
                  }}
                >
                  Deletar
                </SaveButton>
              </CustomModalFooter>
            </Box>

          </CustomModalPaper>
        </Modal>
      </div >

      <div>
        <Modal
          open={openNFModel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomModalPaper>
            <CustomModalHeader>
              <Typography>
                NFs do Cliente
              </Typography>
              <CloseIcon src={closeIcon}
                onClick={handleCloseNFModal}
              />
            </CustomModalHeader>

            <CustomModalBody>
              <NFList clientId={materialObjt._id} />
            </CustomModalBody>
          </CustomModalPaper>
        </Modal>
      </div >


      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={`${responseStatus}`}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {responseInfo}
        </Alert>
      </Snackbar>
    </>
  )
}