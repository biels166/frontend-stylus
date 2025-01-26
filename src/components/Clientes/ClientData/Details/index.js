

import React, { useEffect, useState } from 'react'
import { CustomPaper, CustomFooter, CustomModalBody, SaveButton, CancelButton, CustomHeader } from './styles'
import api from '../../../../services/api'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../../Toast'
import { UFS } from '../../../../constants/UFS'
import { SkeletonClientDetails } from './skeleton'
import { useLocation, useParams } from 'react-router-dom'
import { formatCellphone, formatDocument, formatPhone, getOnlyNumber } from '../../../../utils'
import { useAuth } from '../../../../context/AuthContext'

export const ClientDetails = ({ handleClientName = () => String }) => {
    const { clientId } = useParams()
    const location = useLocation()
    const [client, setClient] = useState({})
    const [form, setForm] = useState()
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [loading, setLoading] = useState(true)
    const { isAdm, clientPage } = useAuth()

    useEffect(() => {
        if (clientId)
            getClientById(clientId)
    }, [clientId])

    const handleCloseToast = () => { setOpenToast(false) }

    const handleClear = () => {
        setForm(client)
        setDisableButton(false)
    }

    async function updateClient() {
        setDisableButton(true)

        const response = await api.UpdateClient({
            ...form,
            type: form.document?.replace(/\D/g, '').length === 14 ? 'PJ' : 'PF'
        })

        if (response.success) {
            setTimeout(() => {
                setLoading(true)
                getClientById(client._id, true)
            }, 2000)
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })
        setOpenToast(true)
        setDisableButton(false)
    }

    async function getClientById(id, sequenceRequest = false) {
        setDisableButton(true)

        const response = await api.GetClientById(id)

        if (response.success) {
            setClient(response.client)
            setForm(response.client)
            handleClientName(response.client.name)
        }
        else {
            setClient({})
            setForm({})
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })

        setOpenToast((sequenceRequest && response.success) || !response.success)
        setDisableButton(false)
        setLoading(false)
    }

    return (
        <React.Fragment>
            {
                loading ?
                    <SkeletonClientDetails /> : (
                        <CustomPaper>
                            <CustomHeader>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Editar Cliente
                                </Typography>
                            </CustomHeader>

                            <Box>
                                <CustomModalBody>
                                    <Box
                                        width={'100%'}
                                        display={'flex'}
                                        flexDirection={'row'}
                                    >
                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-name"
                                            label="Nome"
                                            placeholder="digite o nome do cliente"
                                            value={form.name}
                                            onChange={(e) => {
                                                setForm({ ...form, name: e.target.value })
                                            }}
                                        />

                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-document"
                                            label="Documento"
                                            placeholder="digite o documento do cliente"
                                            value={form.document}
                                            onChange={(e) => {
                                                setForm({ ...form, document: formatDocument(e.target.value) })
                                            }}
                                        />
                                    </Box>

                                    <TextField
                                        disabled={!isAdm && !clientPage.Editor}
                                        fullWidth
                                        required
                                        id="outlined-required-email"
                                        label="E-mail"
                                        placeholder="digite o email do cliente"
                                        value={form.email}
                                        onChange={(e) => {
                                            setForm({ ...form, email: e.target.value })
                                        }}
                                    />

                                    <Box
                                        width={'100%'}
                                        display={'flex'}
                                        flexDirection={'row'}
                                    >
                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-phone"
                                            label="Telefone"
                                            placeholder="digite o telefone do cliente"
                                            value={form.telephone}
                                            onChange={(e) => {
                                                setForm({ ...form, telephone: formatPhone(e.target.value) })
                                            }}
                                        />

                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-cellphone"
                                            label="Celular"
                                            placeholder="digite o celular do cliente"
                                            value={form.cellphone}
                                            onChange={(e) => {
                                                setForm({ ...form, cellphone: formatCellphone(e.target.value) })
                                            }}
                                        />
                                    </Box>

                                    <TextField
                                        disabled={!isAdm && !clientPage.Editor}
                                        required
                                        fullWidth
                                        id="outlined-required-street"
                                        label="Logradouro"
                                        placeholder="digite o logradouro do cliente"
                                        value={form.street}
                                        onChange={(e) => {
                                            setForm({ ...form, street: e.target.value })
                                        }}
                                    />

                                    <Box
                                        width={'100%'}
                                        display={'flex'}
                                        flexDirection={'row'}
                                    >
                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-number"
                                            label="Número"
                                            placeholder="digite o número do logradouro do cliente"
                                            value={form.number}
                                            onChange={(e) => {
                                                setForm({ ...form, number: getOnlyNumber(e.target.value) })
                                            }}
                                        />

                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-complement"
                                            label="Complemento"
                                            placeholder="digite o complemento do cliente"
                                            value={form.complement}
                                            onChange={(e) => {
                                                setForm({ ...form, complement: e.target.value })
                                            }}
                                        />
                                    </Box>

                                    <Box
                                        width={'100%'}
                                        display={'flex'}
                                        flexDirection={'row'}
                                    >
                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-district"
                                            label="Bairro"
                                            placeholder="digite o bairro do cliente"
                                            value={form.district}
                                            onChange={(e) => {
                                                setForm({ ...form, district: e.target.value })
                                            }}
                                        />
                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-city"
                                            label="Cidade"
                                            placeholder="digite a cidade do cliente"
                                            value={form.city}
                                            onChange={(e) => {
                                                setForm({ ...form, city: e.target.value })
                                            }}
                                        />

                                        <TextField
                                            disabled={!isAdm && !clientPage.Editor}
                                            required
                                            id="outlined-required-state"
                                            label="Estado"
                                            select
                                            placeholder="selecione o Estado do cliente"
                                            value={form.state}
                                            onChange={(e) => {
                                                setForm({ ...form, state: e.target.value })
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
                                {
                                    (isAdm || clientPage.Editor) && (
                                        <CustomFooter>
                                            <CancelButton
                                                onClick={handleClear}>
                                                Cancelar
                                            </CancelButton>

                                            <SaveButton
                                                disabled={disableButton}
                                                onClick={() => {
                                                    setDisableButton(true)
                                                    updateClient()
                                                }}
                                            >
                                                Salvar
                                            </SaveButton>
                                        </CustomFooter>
                                    )
                                }
                            </Box>

                        </CustomPaper>
                    )
            }

            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={handleCloseToast}
            />
        </React.Fragment>
    )
}