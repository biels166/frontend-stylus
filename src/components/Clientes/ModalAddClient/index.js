

import React, { useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, RegisterButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, MenuItem, Modal, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { UFS } from '../../../constants/UFS'
import { formatCellphone, formatDocument, formatPhone, getOnlyNumber } from '../../../utils'

export const ModalAddClient = ({
    open, handleClose, handleReloadPage = () => Boolean
}) => {
    const [form, setForm] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => { setForm({}) }, [])

    const handleCloseToast = () => { setOpenToast(false) }
    const handleOnClose = () => {
        handleClear()
        handleClose()
    }
    const handleOnReloadPageList = () => {
        handleClear()
        handleReloadPage(true)
    }
    const handleClear = () => {
        setForm({})
        setDisableButton(false)
    }

    async function createClient() {
        setDisableButton(true)

        const response = await api.CreateClient({
            ...form,
            type: form.document ? form.document?.replace(/\D/g, '').length === 14 ? 'PJ' : 'PF' : ''
        })

        if (response.success) {
            setTimeout(() => {
                handleOnReloadPageList()
                handleClear()
                handleOnClose()
            }, 3000)
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })
        setOpenToast(true)
        setDisableButton(false)
    }

    return (
        <React.Fragment>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CustomModalPaper>
                    <CustomModalHeader>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Cadastrar Novo Cliente
                        </Typography>

                        <CloseIcon src={closeIcon}
                            onClick={() => {
                                handleOnClose()
                                handleClear()
                            }}
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
                                    value={form.name}
                                    onChange={(e) => {
                                        setForm({...form, name: e.target.value})
                                    }}
                                />

                                <TextField
                                    id="outlined-required-document"
                                    label="Documento"
                                    placeholder="digite o documento do cliente"
                                    value={form.document}
                                    onChange={(e) => {
                                        setForm({...form, document: formatDocument(e.target.value)})
                                    }}
                                />
                            </Box>

                            <TextField
                                fullWidth
                                required
                                id="outlined-required-email"
                                label="E-mail"
                                placeholder="digite o email do cliente"
                                value={form.email}
                                onChange={(e) => {
                                    setForm({...form, email: e.target.value})
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
                                    value={form.telephone}
                                    onChange={(e) => {
                                        setForm({...form, telephone: formatPhone(e.target.value)})
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-cellphone"
                                    label="Celular"
                                    placeholder="digite o celular do cliente"
                                    value={form.cellphone}
                                    onChange={(e) => {
                                        setForm({...form, cellphone: formatCellphone(e.target.value)})
                                    }}
                                />
                            </Box>

                            <TextField
                                required
                                fullWidth
                                id="outlined-required-street"
                                label="Logradouro"
                                placeholder="digite o logradouro do cliente"
                                value={form.street}
                                onChange={(e) => {
                                    setForm({...form, street: e.target.value})
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
                                    value={form.number}
                                    onChange={(e) => {
                                        setForm({...form, number: getOnlyNumber(e.target.value)})
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-complement"
                                    label="Complemento"
                                    placeholder="digite o complemento do cliente"
                                    value={form.complement}
                                    onChange={(e) => {
                                        setForm({...form, complement: e.target.value})
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
                                    placeholder="digite o bairro do cliente"
                                    value={form.district}
                                    onChange={(e) => {
                                        setForm({...form, district: e.target.value})
                                    }}
                                />
                                <TextField
                                    required
                                    id="outlined-required-city"
                                    label="Cidade"
                                    placeholder="digite a cidade do cliente"
                                    value={form.city}
                                    onChange={(e) => {
                                        setForm({...form, city: e.target.value})
                                    }}
                                />


                                <TextField
                                    required
                                    id="outlined-required-state"
                                    label="Estado"
                                    select
                                    placeholder="selecione o Estado do cliente"
                                    value={form.state}
                                    onChange={(e) => {
                                        setForm({...form, state: e.target.value})
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
                            <RegisterButton
                                disabled={disableButton}
                                onClick={() => {
                                    setDisableButton(true)
                                    createClient()
                                }}
                            >
                                Salvar
                            </RegisterButton>
                        </CustomModalFooter>
                    </Box>

                </CustomModalPaper>
            </Modal>

            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={handleCloseToast}
            />
        </React.Fragment>
    )
}