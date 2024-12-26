

import React, { useEffect, useState } from 'react'
import { CustomPaper, CustomFooter, CustomModalBody, SaveButton, CancelButton, CustomHeader } from './styles'
import api from '../../../services/api'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { useAuth } from '../../../context/AuthContext'

export const ItemForm = () => {
    let defaultForm = {
        name: '',
        categoryCode: ''
    }
    const [form, setForm] = useState(defaultForm)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [options, setOptions] = useState([])

    const { isAdm, materialPage } = useAuth()

    const handleCloseToast = () => { setOpenToast(false) }

    const handleClear = () => {
        setForm(defaultForm)
        getCategoryOptions()
        setDisableButton(false)
    }

    async function createItemCategory() {
        setDisableButton(true)

        const response = await api.CreateItemCategory(form)

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

    async function getCategoryOptions() {
        const response = await api.GetCategoryOptions()
        setOptions(response.categories)
    }

    useEffect(() => {
        getCategoryOptions()
    }, [])

    return (
        <React.Fragment>
            <CustomPaper>
                <CustomHeader>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Adicionar Item à Categoria
                    </Typography>
                </CustomHeader>

                <Box>
                    <CustomModalBody>
                        <Box
                            width={'100%'}
                            display={'flex'}
                            flexDirection={'row'}
                        >
                            <FormControl variant="outlined">
                                <InputLabel id="select-outlined-label-options">Categoria do Material</InputLabel>
                                <Select
                                    required
                                    labelId="select-outlined-label-options"
                                    disabled={!isAdm && !materialPage.Creator}
                                    value={form?.categoryCode}
                                    onChange={(e) => {
                                        setForm({ ...form, categoryCode: e.target.value })
                                    }}
                                    label="Categoria do Material"
                                >
                                    {
                                        options?.length > 0 && (
                                            options?.map(elem => (
                                                <MenuItem
                                                    value={elem.code}>{elem.description}</MenuItem>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>

                            <TextField
                                disabled={!isAdm && !materialPage.Creator}
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
                                        createItemCategory()
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