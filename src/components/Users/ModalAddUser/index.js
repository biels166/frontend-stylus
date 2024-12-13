
import React, { useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, BlockViewIcon, ViewIcon, CreateUserButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import CryptoJS from 'crypto-js'
import { ChipsArray } from '../../Chips'
import { useAuth } from '../../../context/AuthContext'

export const ModalAddUser = ({
    open, handleClose, handleReloadPage = () => Boolean
}) => {
    const [form, setForm] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [blockView, setBlockView] = useState(true)
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm } = useAuth()

    useEffect(() => { setForm({}) }, [])

    const handleTogglePasswordVisibility = () => { setBlockView(!blockView) }
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
        setBlockView(true)
        setDisableButton(false)
    }

    async function createUser() {
        setDisableButton(true)

        let userPassword = form?.password

        const response = await api.CreateUser({
            ...form,
            password: CryptoJS.AES.encrypt(userPassword, process.env.REACT_APP_SCRT_INTEGRATION).toString()
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
                        <Typography id="codastrar-novo-usuario" variant="h6" component="h2">
                            Cadastrar Novo Usuário
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
                            <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required-name"
                                    label="Nome"
                                    placeholder="digite o nome do usuário"
                                    value={form?.name}
                                    onChange={(e) => {
                                        setForm({ ...form, name: e.target.value })
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    type={blockView ? "password" : "text"}
                                    required
                                    id="outlined-required-password"
                                    label="Senha"
                                    placeholder="digite a senha do usuário"
                                    value={form?.password}
                                    onChange={(e) => {
                                        setForm({ ...form, password: e.target.value })
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleTogglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {blockView ? <BlockViewIcon /> : <ViewIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                            <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required-email"
                                    label="E-mail"
                                    placeholder="digite o email do usuário"
                                    value={form?.email}
                                    onChange={(e) => {
                                        setForm({ ...form, email: e.target.value })
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required-login"
                                    label="Login"
                                    placeholder="digite o login do usuário"
                                    value={form?.user}
                                    onChange={(e) => {
                                        setForm({ ...form, user: e.target.value })
                                    }}
                                />
                            </Box>

                            {
                                isAdm && (
                                    <ChipsArray
                                        isAdmnistrator={false}
                                        userRoles={form.roles}
                                        hanleUpdateForm={(updatedRoles) => {
                                            setForm({ ...form, roles: updatedRoles })
                                        }}
                                    />
                                )
                            }

                        </CustomModalBody>

                        <CustomModalFooter>
                            <CreateUserButton
                                disabled={disableButton}
                                onClick={() => {
                                    setDisableButton(true)
                                    createUser()
                                }}
                            >
                                Salvar
                            </CreateUserButton>
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
