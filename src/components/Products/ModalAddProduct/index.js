

import React, { useEffect, useState } from 'react'
import { 
    CustomModalPaper, 
    CloseIcon, 
    CustomModalHeader, 
    CustomModalFooter, 
    CustomModalBody, 
    RegisterButton, 
    ClearButton, 
    CustomSupplierIcon, 
    CustomServiceIcon, 
    CustomProductIcon
} from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Modal, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { List, ListItem, Radio, RadioGroup, ListItemDecorator } from '@mui/joy'
import { useAuth } from '../../../context/AuthContext'

export const ModalAddProduct = ({
    open, handleClose, handleReloadPage = () => Boolean
}) => {
    const defaultForm = {
        product: '',
        value: '',
        obs: '',
        isProduct: 'Produto'
    }
    const [form, setForm] = useState(defaultForm)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm, materialPage } = useAuth()

    const options = [
        {
            icon: <CustomProductIcon />,
            value: 'Produto'
        },
        {
            icon: <CustomServiceIcon />,
            value: 'Serviço'
        },
    ]

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
        setForm(defaultForm)
        setDisableButton(false)
    }

    async function createProduct() {
        setDisableButton(true)

        const response = await api.CreateProduct({
            ...form,
            isProduct: form?.isProduct === 'Produto'
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
                            Cadastrar Novo Produto ou Serviço
                        </Typography>

                        <CloseIcon src={closeIcon}
                            onClick={() => {
                                handleOnClose()
                                handleClear()
                            }}
                        />
                    </CustomModalHeader>

                    <CustomModalBody>
                        <RadioGroup
                            value={form.isProduct}
                            onChange={(e) => {
                                setForm({ ...form, isProduct: e.target.value })
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
                            fullWidth
                            required
                            id="outlined-required-name"
                            label="Produto ou Serviço"
                            placeholder="digite o nome do produto ou serviço"
                            value={form?.product}
                            onChange={(e) => {
                                setForm({ ...form, product: e.target.value?.toUpperCase() })
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            id="outlined-required-document"
                            label="Valor"
                            placeholder="digite o valor do produto ou serviço"
                            value={form?.value}
                            onChange={(e) => {
                                setForm({ ...form, value: e.target.value.replace(/[^\d.,]/g, '') })
                            }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            maxRows={6}
                            id="outlined-required-obs"
                            label="Observações"
                            value={form?.obs}
                            onChange={(e) => {
                                setForm({ ...form, obs: e.target.value })
                            }}
                        />
                    </CustomModalBody>

                    <CustomModalFooter>
                        <ClearButton
                            onClick={() => { handleClear() }}
                        >
                            Limpar
                        </ClearButton>
                        <RegisterButton
                            disabled={disableButton}
                            onClick={() => {
                                setDisableButton(true)
                                createProduct()
                            }}
                        >
                            Salvar
                        </RegisterButton>
                    </CustomModalFooter>

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