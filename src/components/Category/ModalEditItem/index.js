

import React, { useCallback, useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, RegisterButton, ClearButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, Modal, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { useAuth } from '../../../context/AuthContext'

export const ModalEditItem = ({
    item, open, handleClose, handleReloadPage = () => Boolean
}) => {
    const [form, setForm] = useState(item)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm, materialPage } = useAuth()

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

    useEffect(() => { setForm(item) }, [item])

    useEffect(() => { console.log('form', form) }, [form])


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
        setForm(item)
        setDisableButton(false)
    }


    async function updateItemCategory() {
        setDisableButton(true)

        const response = await api.UpdateItemCategory(form)

        if (response.success) {
            setTimeout(() => {
                handleClear()
                handleReloadPageList()
            }, 2000)
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
                            Editar Item
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
                                    disabled={!isAdm && !materialPage.Editor}
                                    required
                                    id="outlined-required-name"
                                    label="Nome do Item"
                                    placeholder="digite o nome do item"
                                    value={form?.name}
                                    onChange={(e) => {
                                        setForm({ ...form, name: e.target.value?.toString()?.toUpperCase() })
                                    }}
                                />
                            </Box>
                        </CustomModalBody>

                        {(isAdm || materialPage.Editor) && (
                            <CustomModalFooter>
                                <ClearButton
                                    onClick={handleClear}>
                                    Limpar
                                </ClearButton>

                                <RegisterButton
                                    disabled={disableButton}
                                    onClick={() => {
                                        setDisableButton(true)
                                        updateItemCategory()
                                    }}
                                >
                                    Salvar
                                </RegisterButton>
                            </CustomModalFooter>
                        )}
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