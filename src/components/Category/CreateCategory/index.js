

import React, { useState } from 'react'
import { CustomPaper, CustomFooter, CustomModalBody, SaveButton, CancelButton, CustomHeader } from './styles'
import api from '../../../services/api'
import { Box, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { getOnlyNumber } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'

export const CategoryForm = () => {
    let defaultForm = {
        name: '',
        code: ''
    }
    const [form, setForm] = useState(defaultForm)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm, materialPage } = useAuth()

    const handleCloseToast = () => { setOpenToast(false) }

    const handleClear = () => {
        setForm(defaultForm)
        setDisableButton(false)
    }

    async function createCategory() {
        setDisableButton(true)

        const response = await api.CreateCategory({
            ...form,
            code: parseInt(form?.code)
        })

        if (response.success) {
            setTimeout(() => {
                handleClear()
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
            <CustomPaper>
                <CustomHeader>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Criar Nova Categoria de Material
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
                                disabled={!isAdm && !materialPage.Creator}
                                required
                                id="outlined-required-code"
                                label="Código da Categoria"
                                placeholder="digite p código da categoria"
                                value={form?.code}
                                onChange={(e) => {
                                    setForm({ ...form, code: getOnlyNumber(e.target.value) })
                                }}
                            />

                            <TextField
                                disabled={!isAdm && !materialPage.Creator}
                                required
                                id="outlined-required-name"
                                label="Nome da Categoria"
                                placeholder="digite o nome da categoria"
                                value={form?.name}
                                onChange={(e) => {
                                    setForm({ ...form, name: e.target.value?.toString()?.toUpperCase() })
                                }}
                            />
                        </Box>
                    </CustomModalBody>
                    {
                        (isAdm || materialPage.Creator) && (
                            <CustomFooter>
                                <CancelButton
                                    onClick={handleClear}>
                                    Cancelar
                                </CancelButton>

                                <SaveButton
                                    disabled={disableButton}
                                    onClick={() => {
                                        setDisableButton(true)
                                        createCategory()
                                    }}
                                >
                                    Salvar
                                </SaveButton>
                            </CustomFooter>
                        )
                    }
                </Box>

            </CustomPaper>


            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={handleCloseToast}
            />
        </React.Fragment>
    )
}