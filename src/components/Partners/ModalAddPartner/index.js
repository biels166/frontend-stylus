

import React, { useCallback, useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, RegisterButton, ClearButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, MenuItem, Modal, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { UFS } from '../../../constants/UFS'
import { formatCellphone, formatDocument, formatPhone, getOnlyNumber } from '../../../utils'
import { ChipsCategories } from '../ChipsCategories'

export const ModalAddPartner = ({
    partnerType, open, handleClose, handleReloadPage = () => Boolean
}) => {
    const [form, setForm] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        setForm({
            isSupplier: partnerType === 'Fornecedores',
            isOutsourced: partnerType === 'Terceiros',
            categories: []
        })
    }, [partnerType])

    useEffect(() => {
        console.log('fomr', form)
    }, [form])

    const handleCloseToast = () => { setOpenToast(false) }
    const handleOnClose = () => {
        handleClear()
        handleClose()
    }
    const handleReloadPageList = () => {
        handleClear()
        handleReloadPage(true)
    }
    const handleClear = () => {
        setForm({
            isSupplier: partnerType === 'Fornecedores',
            isOutsourced: partnerType === 'Terceiros',
            categories: []
        })
        setDisableButton(false)
    }

    async function createPartner() {
        setDisableButton(true)
        const response = await api.CreatePartner({
            ...form,
            type: form.document?.replace(/\D/g, '').length === 14 ? 'PJ' : 'PF',
            categories: form?.categories.map(category => (category.value)).join(";")
        })

        if (response.success) {
            setTimeout(() => {
                handleReloadPageList()
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
                            Cadastrar {partnerType === 'Fornecedores' ? 'Fornecedor' : 'Terceiro / Prestador de serviço'}
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
                                    placeholder="digite o nome do parceiro"
                                    value={form.name}
                                    onChange={(e) => {
                                        setForm({ ...form, name: e.target.value?.toUpperCase() })
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-document"
                                    label="Documento"
                                    placeholder="digite o documento do parceiro"
                                    value={form.document}
                                    onChange={(e) => {
                                        setForm({ ...form, document: formatDocument(e.target.value) })
                                    }}
                                />
                            </Box>

                            <TextField
                                fullWidth
                                id="outlined-email"
                                label="E-mail"
                                placeholder="digite o email do parceiro"
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
                                    required
                                    id="outlined-required-phone"
                                    label="Telefone"
                                    placeholder="digite o telefone do parceiro"
                                    value={form.phone}
                                    onChange={(e) => {
                                        setForm({ ...form, phone: formatPhone(e.target.value) })
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-cellphone"
                                    label="Celular"
                                    placeholder="digite o celular do parceiro"
                                    value={form.cellphone}
                                    onChange={(e) => {
                                        setForm({ ...form, cellphone: formatCellphone(e.target.value) })
                                    }}
                                />
                            </Box>

                            <TextField
                                fullWidth
                                id="outlined-street"
                                label="Logradouro"
                                placeholder="digite o logradouro do parceiro"
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
                                    id="outlined-number"
                                    label="Número"
                                    placeholder="digite o número do logradouro do parceiro"
                                    value={form.number}
                                    onChange={(e) => {
                                        setForm({ ...form, number: getOnlyNumber(e.target.value) })
                                    }}
                                />

                                <TextField
                                    id="outlined-complement"
                                    label="Complemento"
                                    placeholder="digite o complemento do parceiro"
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

                                    id="outlined-district"
                                    label="Bairro"
                                    placeholder="digite o bairro do parceiro"
                                    value={form.district}
                                    onChange={(e) => {
                                        setForm({ ...form, district: e.target.value })
                                    }}
                                />
                                <TextField
                                    id="outlined-city"
                                    label="Cidade"
                                    placeholder="digite a cidade do parceiro"
                                    value={form.city}
                                    onChange={(e) => {
                                        setForm({ ...form, city: e.target.value })
                                    }}
                                />


                                <TextField
                                    id="outlined-state"
                                    label="Estado"
                                    select
                                    placeholder="selecione o Estado do parceiro"
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

                            <ChipsCategories
                                isSupplier={partnerType === 'Fornecedores'}
                                hanleUpdateForm={(updatedData) => {
                                   setForm({ ...form, categories: updatedData })
                                }}
                            />

                        </CustomModalBody>

                        <CustomModalFooter>
                            <ClearButton
                                onClick={handleClear}>
                                Limpar
                            </ClearButton>

                            <RegisterButton
                                disabled={disableButton}
                                onClick={() => {
                                    setDisableButton(true)
                                    createPartner()
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