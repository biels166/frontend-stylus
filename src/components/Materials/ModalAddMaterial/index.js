

import React, { useCallback, useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, RegisterButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { UFS } from '../../../constants/UFS'
import { formatCellphone, formatDocument, formatPhone } from '../../../utils'

export const ModalAddMaterial = ({
    open, handleClose, handleReloadPage = () => Boolean
}) => {
    const [form, setForm] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const types = ['Milheiro', 'Rolo', 'Pacote', 'Quilogramas', 'Galão']
    const referenceTypes = [
        { reference: 'Milheiro', value: 'Unidade(s)' },
        { reference: 'Rolo', value: 'Metros' },
        { reference: 'Quilogramas', value: 'Quilogramas' },
        { reference: 'Galão', value: 'Litros' },
        { reference: 'Pacote', value: 'Folhas' }
    ]
    const getReferenceType = useCallback((type) => {
        return referenceTypes.find(i => i.reference === type)?.value
    }, [form])

    useEffect(() => { setForm({}) }, [])

    useEffect(() => { console.log('form', form) }, [form])


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

    async function createMaterial() {
        setDisableButton(true)

        const response = await api.CreateMaterial(form)

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
                            Cadastrar Novo Insumo
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
                                    id="outlined-required-material"
                                    label="Insumo"
                                    placeholder="digite o nome do insumo"
                                    value={form.material}
                                    onChange={(e) => {
                                        setForm({ ...form, material: e.target.value })
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-materialCode"
                                    label="Código do insumo"
                                    placeholder="digite o código do insumo"
                                    value={form.materialCoda}
                                    onChange={(e) => {
                                        setForm({ ...form, materialCoda: e.target.value })
                                    }}
                                />
                            </Box>

                            <FormControl variant="outlined">
                                <InputLabel id="select-outlined-required-type">Tipo</InputLabel>
                                <Select
                                    id="outlined-required-type"
                                    value={form.type}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            type: e.target.value,
                                            referenceType: referenceTypes.find(r => r.reference === e.target.value)?.value
                                        })
                                    }}
                                    label="Tipo"
                                >
                                    <MenuItem value={""} selected><en>Selecionar</en></MenuItem>
                                    {
                                        types.length > 0 && (
                                            types.map(elem => (
                                                <MenuItem value={elem}>{elem}</MenuItem>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>

                            <Box
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'row'}
                            >
                                <TextField
                                    required
                                    id="outlined-required-reference"
                                    label="Referência"
                                    placeholder="digite o tipo de referência"
                                    value={getReferenceType(form.type)}
                                    onChange={(e) => {
                                        setForm({ ...form, referenceType: e.target.value })
                                    }}
                                />

                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-required-referenceType">Referência</InputLabel>
                                    <Select
                                        id="outlined-required-reference"
                                        value={form.referenceType}
                                        onChange={(e) => {
                                            console.log('reff alterada')
                                            setForm({ ...form, referenceType: e.target.value })
                                        }}
                                        label="Referência"
                                    >
                                        {

                                            <MenuItem
                                                value={getReferenceType(form.type)}>{getReferenceType(form.type)}</MenuItem>

                                        }
                                    </Select>
                                </FormControl>

                                <TextField
                                    required
                                    id="outlined-required-format"
                                    label="Formato"
                                    placeholder="digite o formato do insumo"
                                    value={form.format}
                                    onChange={(e) => {
                                        setForm({ ...form, format: e.target.value })
                                    }}
                                />
                            </Box>

                            <TextField
                                required
                                fullWidth
                                id="outlined-required-quantity"
                                label="Quantidade do Insumo"
                                placeholder="digite a quantidade do insumo"
                                value={form.quantity}
                                onChange={(e) => {
                                    setForm({ ...form, quantity: e.target.value })
                                }}
                            />

                            <Box
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'row'}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-required-referenceQtd"
                                    label="Quantidade de Referência do Insumo"
                                    placeholder="digite a quantidade do insumo"
                                    value={form.referenceQtd}
                                    onChange={(e) => {
                                        setForm({ ...form, referenceQtd: e.target.value })
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-materialValue"
                                    label="Valor"
                                    placeholder="digite o valor do insumo"
                                    value={form.materialValue}
                                    onChange={(e) => {
                                        setForm({ ...form, materialValue: e.target.value.replace(/[^\d.,]/g, '') })
                                    }}
                                />
                            </Box>
                        </CustomModalBody>

                        <CustomModalFooter>
                            <RegisterButton
                                disabled={disableButton}
                                onClick={() => {
                                    setDisableButton(true)
                                    createMaterial()
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