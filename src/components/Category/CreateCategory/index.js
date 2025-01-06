

import React, { useEffect, useState } from 'react'
import { CustomPaper, CustomFooter, CustomModalBody, SaveButton, CancelButton, CustomHeader, CustomSupplierIcon, CustomOutsourcedIcon } from './styles'
import api from '../../../services/api'
import { Box, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { getOnlyNumber } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import { List, ListItem, Radio, RadioGroup, ListItemDecorator } from '@mui/joy'

export const CategoryForm = () => {
    let defaultForm = {
        name: '',
        code: '',
        isMaterialCategory: 'Materiais'
    }
    const [form, setForm] = useState(defaultForm)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm, materialPage } = useAuth()
    const options = [
        {
            icon: <CustomSupplierIcon />,
            value: 'Materiais'
        },
        {
            icon: <CustomOutsourcedIcon />,
            value: 'Serviços'
        },
    ]

    const handleCloseToast = () => { setOpenToast(false) }

    const handleClear = () => {
        setForm(defaultForm)
        setDisableButton(false)
    }

    async function createCategory() {
        setDisableButton(true)

        const response = await api.CreateCategory({
            ...form,
            code: parseInt(form?.code),
            isMaterialCategory: form?.isMaterialCategory === 'Materiais'
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

    useEffect(() => {
        console.log(form)
    }, [form])
    
    return (
        <React.Fragment>
            <CustomPaper>
                <CustomHeader>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Criar Nova Categoria de Material ou Serviço
                    </Typography>
                </CustomHeader>

                <Box>
                    <CustomModalBody>
                        <Box
                            width={'100%'}
                            display={'flex'}
                            flexDirection={'row'}
                        >
                            <RadioGroup
                                value={form.isMaterialCategory}
                                onChange={(e) => {
                                    setForm({ ...form, isMaterialCategory: e.target.value })
                                }}
                            >
                                <List
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '10px',
                                        marginRight: '5px',
                                        alignItems: 'center',
                                        '--ListItem-paddingY': '1rem',
                                        '--ListItem-radius': '8px',
                                        '--ListItemDecorator-size': '32px',
                                        '--ListItem-minHeight': '3.45rem'
                                    }}
                                >
                                    {options.map(item => (
                                        <ListItem
                                            key={item.value}
                                            variant="outlined"
                                            sx={{
                                                boxShadow: 'sm',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '0.5rem 1rem',
                                            }}
                                        >
                                            <ListItemDecorator>
                                                {item.icon}
                                            </ListItemDecorator>

                                            <Radio
                                                disabled={!isAdm && !materialPage.Creator}
                                                overlay
                                                value={item.value}
                                                label={item.value}
                                                sx={{
                                                    flexGrow: 1,
                                                    flexDirection: 'row-reverse',
                                                }}
                                                slotProps={{
                                                    action: ({ checked }) => ({
                                                        sx: {
                                                            ...(checked && {
                                                                inset: -1,
                                                                border: '1px solid',
                                                                borderColor: '#003C73',
                                                                borderRadius: '10px',
                                                            }),
                                                        },
                                                    }),

                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </RadioGroup>

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