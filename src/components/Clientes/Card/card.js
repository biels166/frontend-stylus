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


export const ClientCard = ({
  nameInput,
  documentInput,
  emailInput,
  cellphoneInput,
  phoneInput,
  streetInput,
  numberImput,
  complementInput,
  districtInput,
  cityInput,
  stateInput,
  _id,
  handleReloadPage
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openNFModel, setOpenNFModel] = useState(false);
  const [openToast, setOpenToast] = useState(false)
  const [name, setName] = useState(nameInput)
  const [document, setDocument] = useState(documentInput)
  const [email, setEmail] = useState(emailInput)
  const [cellPhone, setCellPhone] = useState(cellphoneInput)
  const [phone, setPhone] = useState(phoneInput)
  const [street, setStreet] = useState(streetInput)
  const [number, setNumber] = useState(numberImput)
  const [complement, setComplement] = useState(complementInput)
  const [district, setDistrict] = useState(districtInput)
  const [city, setCity] = useState(cityInput)
  const [state, setState] = useState(stateInput)
  const [responseStatus, setResponseStatus] = useState('')
  const [responseInfo, setResponseInfo] = useState('')
  const [showAll, setShowAll] = useState(false)

  const docType = () => {
    let docLength = documentInput.replace(/\D/g, '').length

    return docLength === 14 ? 'CNPJ' : 'CPF'
  }

  const formatDocument = (documentNumber) => {

    let doc = documentNumber.replace(/\D/g, '')
    let docType = doc.length === 14 ? 'CNPJ' : 'CPF'

    return docType === 'CPF' ?
      doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      : doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

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
      name: `${name}`,
      document: `${document}`,
      email: `${email}`,
      telephone: `${phone}`,
      cellphone: `${cellPhone}`,
      street: `${street}`,
      number: `${number}`,
      complement: `${complement}`,
      district: `${district}`,
      city: `${city}`,
      state: `${state}`
    }

    await api.put(`/client/${_id}`, body)
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
    await api.delete(`/client/${_id}`)
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
              Nome: <span>{name}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {docType()}: <span>{formatDocument(document)}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              E-mail: <span>{email}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Telefone: <span>{phone}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              Celular: <span>{cellPhone}</span>
            </Typography>
          </Grid>
        </Grid>

        {showAll && (
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Typography>
                Logradouro: <span>{street}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>
                Número: <span>{number}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>
                Complemento: <span>{complement}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>
                Bairro: <span>{district}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>
                Cidade: <span>{city}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>
                Estado: <span>{state}</span>
              </Typography>
            </Grid>
          </Grid>
        )}

        <Box display={'flex'} justifyContent={'space-between'}>
          <Box>
            <ShowMore
              onClick={() => {
                if (showAll) {
                  setShowAll(false)
                }
                else {
                  setShowAll(true)
                }
              }}
            >
              {showAll ? 'Exibir Menos' : 'Exibir Mais'}
            </ShowMore>
          </Box>

          <IconDiv>
            <NFSButton src={nfseIcon}
              onClick={() => { setOpenNFModel(true) }}
            />

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
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomModalPaper>
            <CustomModalHeader>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Editar Cliente
              </Typography>

              <CloseIcon src={closeIcon}
                onClick={handleCloseEditModal}
              />
            </CustomModalHeader>

            <Box>
              <CustomModalBody>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                >
                  <TextField
                    required
                    id="outlined-required-name"
                    label="Nome"
                    placeholder="digite o nome do cliente"
                    value={name}
                    onChange={(e) => {
                      let newName = e.target.value
                      setName(newName)
                    }}
                  />

                  <TextField
                    required
                    id="outlined-required-document"
                    label="Documento"
                    placeholder="digite o documento do cliente"
                    value={document}
                    onChange={(e) => {
                      let newDoc = formatDocument(e.target.value)
                      setDocument(newDoc)
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  required
                  id="outlined-required-email"
                  label="E-mail"
                  placeholder="digite o email do cliente"
                  value={email}
                  onChange={(e) => {
                    let newEmail = e.target.value
                    setEmail(newEmail)
                  }}
                />

                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                >
                  <TextField
                    required
                    id="outlined-required-phone"
                    label="Telefone"
                    placeholder="digite o telefone do cliente"
                    value={phone}
                    onChange={(e) => {
                      let newPhone = e.target.value
                      setPhone(newPhone)
                    }}
                  />

                  <TextField
                    required
                    id="outlined-required-cellphone"
                    label="Celular"
                    placeholder="digite o login do cliente"
                    value={cellPhone}
                    onChange={(e) => {
                      let newcell = e.target.value
                      setCellPhone(newcell)
                    }}
                  />
                </Box>

                <TextField
                  required
                  fullWidth
                  id="outlined-required-street"
                  label="Logradouro"
                  placeholder="digite o logradouro do cliente"
                  value={street}
                  onChange={(e) => {
                    let newStreet = e.target.value
                    setStreet(newStreet)
                  }}
                />

                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                >
                  <TextField
                    required
                    id="outlined-required-number"
                    label="Número"
                    placeholder="digite o número do logradouro do cliente"
                    value={number}
                    onChange={(e) => {
                      let newNum = e.target.value
                      setNumber(newNum)
                    }}
                  />

                  <TextField
                    required
                    id="outlined-required-complement"
                    label="Complemento"
                    placeholder="digite o compplemento do logradouro do cliente"
                    value={complement}
                    onChange={(e) => {
                      let newComp = e.target.value
                      setComplement(newComp)
                    }}
                  />
                </Box>

                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                >
                  <TextField
                    required
                    id="outlined-required-district"
                    label="Bairro"
                    placeholder="digite o bairro do logradouro do cliente"
                    value={district}
                    onChange={(e) => {
                      let newDistrict = e.target.value
                      setDistrict(newDistrict)
                    }}
                  />

                  <TextField
                    required
                    id="outlined-required-city"
                    label="Cidade"
                    placeholder="digite a cidade do logradouro do cliente"
                    value={city}
                    onChange={(e) => {
                      let newcity = e.target.value
                      setCity(newcity)
                    }}
                  />

                  <TextField
                    required
                    id="outlined-required-state"
                    label="Estado"
                    select
                    placeholder="selecione o estado do logradouro do cliente"
                    value={state}
                    onChange={(e) => {
                      let newState = e.target.value
                      setState(newState)
                    }}
                  >
                    {UFS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </CustomModalBody>

              <CustomModalFooter>
                <SaveButton
                  onClick={() => {
                    updateClient()
                  }}
                >
                  Salvar
                </SaveButton>
              </CustomModalFooter>
            </Box>

          </CustomModalPaper>
        </Modal>
      </div>

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
                  Deseja excluir "{name}" da lista de clientes ?
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
              <NFList clientId={_id} />
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