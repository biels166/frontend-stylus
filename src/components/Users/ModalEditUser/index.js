
import React, { useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, UpdateUserButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, Modal, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { ChipsArray } from '../../Chips'
import { useAuth } from './../../../context/AuthContext';

export const ModalEditUser = ({
    open, userData, handleClose, handleReloadPage = () => Boolean
}) => {
    const [form, setForm] = useState(userData)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm } = useAuth()

    useEffect(() => { setForm(userData) }, [])

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
        setForm(userData)
        setDisableButton(false)
    }

    async function updateUser() {
        setDisableButton(true)

        const response = await api.UpdateUser(form)

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
                            Editar Usuário
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
                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-required-name"
                                label="Nome"
                                placeholder="digite o nome do usuário"
                                value={form.name}
                                onChange={(e) => {
                                    setForm({ ...form, name: e.target.value })
                                }}
                            />

                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-required-email"
                                label="E-mail"
                                placeholder="digite o email do usuário"
                                value={form.email}
                                onChange={(e) => {
                                    setForm({ ...form, email: e.target.value })
                                }}
                            />

                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-required-login"
                                label="Login"
                                placeholder="digite o login do usuário"
                                value={form.user}
                                onChange={(e) => {
                                    setForm({ ...form, user: e.target.value })
                                }}
                            />

                            {
                                isAdm && (
                                    <ChipsArray
                                        isAdmnistrator={userData.admnistrator}
                                        userRoles={userData.roles}
                                        hanleUpdateForm={(updatedRoles) => {
                                            setForm({ ...form, roles: updatedRoles })
                                        }}
                                    />
                                )
                            }

                        </CustomModalBody>

                        <CustomModalFooter>
                            <UpdateUserButton
                                disabled={disableButton}
                                onClick={() => {
                                    setDisableButton(true)
                                    updateUser()
                                }}
                            >
                                Salvar
                            </UpdateUserButton>
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
