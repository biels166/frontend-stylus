

import React, { useEffect, useState } from 'react'
import { CustomPaper, CustomFooter, CustomModalBody, SaveButton, CancelButton, CustomHeader } from './styles'
import api from '../../../../services/api'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../../Toast'
import { UFS } from '../../../../constants/UFS'
import { SkeletonClientDetails } from './skeleton'
import { useParams } from 'react-router-dom'
import { formatCellphone, formatDocument, formatPhone } from '../../../../utils'
import { useAuth } from '../../../../context/AuthContext'
import { ChipsCategories } from '../../ChipsCategories'

export const PartnerDetails = ({ handleName = () => String }) => {
    const { partnerId } = useParams()
    const [partner, setPartner] = useState({})
    const [form, setForm] = useState()
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [loading, setLoading] = useState(true)
    const { isAdm, partnerPage } = useAuth()

    useEffect(() => {
        if (partnerId)
            getPartnerById(partnerId)
    }, [partnerId])

    const handleCloseToast = () => { setOpenToast(false) }

    const handleClear = () => {
        setForm(partner)
        setDisableButton(false)
    }

    async function updatePartner() {
        setDisableButton(true)
        console.log(form)

        const response = await api.UpdatePartner({
            ...form,
            type: form?.document?.replace(/\D/g, '').length === 14 ? 'PJ' : 'PF',
            categories: Array.isArray(form?.categories) ? form?.categories.map(category => (category.value)).join(";") : form?.categories
        })

        if (response.success) {
            setTimeout(() => {
                setLoading(true)
                getPartnerById(partner._id, true)
            }, 2000)
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })
        setOpenToast(true)
        setDisableButton(false)
    }

    async function getPartnerById(id, sequenceRequest = false) {
        setDisableButton(true)

        const response = await api.GetPartnerById(id)

        if (response.success) {
            setPartner(response.partner)
            setForm(response.partner)
            handleName(response.partner.name)
        }
        else {
            setPartner({})
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
                                    Editar {partner.isSupplier ? 'Fornecedor' : 'Terceiro / Prestador de serviço'}
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
                                                setForm({ ...form, number: e.target.value })
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
                                        inputCategories={form?.categories}
                                        isSupplier={partner.isSupplier}
                                        hanleUpdateForm={(updatedData) => {
                                            setForm({ ...form, categories: updatedData })       
                                        }}
                                    />


                                </CustomModalBody>
                                {
                                    (isAdm || partnerPage.Editor) && (
                                        <CustomFooter>
                                            <CancelButton
                                                onClick={handleClear}>
                                                Cancelar
                                            </CancelButton>

                                            <SaveButton
                                                disabled={disableButton}
                                                onClick={() => {
                                                    setDisableButton(true)
                                                    updatePartner()
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