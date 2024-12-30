
import React, { useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, UpdateButton } from './styles'
import closeIcon from '../../../../../assets/close_icon.svg'
import { Box, Modal, TextField, Typography } from '@mui/material'
import api from '../../../../../services/api'
import { CustomToast } from '../../../../Toast';
import { useParams } from 'react-router-dom'
import { formatCellphone, formatPhone } from '../../../../../utils'

export const ModalEditContact = ({
    open, contact, handleClose, handleReloadPage = () => Boolean
}) => {
    const { partnerId } = useParams()
    const [form, setForm] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if (contact) {
            setForm(contact)
        }
    }, [contact])

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
        setForm(contact)
        setDisableButton(false)
    }

    async function updateContact() {
        setDisableButton(true)
        const response = await api.UpdateContact({
            ...form,
            personId: partnerId,
        })

        if (response.success) {
            setTimeout(() => {
                handleOnReloadPageList()
                handleClear()
                handleOnClose()
            }, 1500)
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
                            Editar Contato
                        </Typography>

                        <CloseIcon src={closeIcon}
                            onClick={() => {
                                handleOnClose()
                                handleClear()
                            }}
                        />
                    </CustomModalHeader>

                    <CustomModalBody>

                        <Box>
                            <TextField
                                required
                                id="outlined-required-name"
                                label="Nome"
                                placeholder="digite o nome do contato"
                                value={form.name}
                                onChange={(e) => {
                                    setForm({ ...form, name: e.target.value })
                                }}
                            />


                            <TextField
                                id="outlined-required-position"
                                label="Cargo / Setor"
                                placeholder="digite o cargo/setor do contato"
                                value={form.position}
                                onChange={(e) => {
                                    setForm({ ...form, position: e.target.value })
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                id="outlined-required-phone"
                                label="Telefone"
                                placeholder="digite o telefone do contato"
                                value={form.telephone}
                                onChange={(e) => {
                                    setForm({ ...form, telephone: formatPhone(e.target.value) })
                                }}
                            />

                            <TextField
                                id="outlined-required-cellphone"
                                label="Celular"
                                placeholder="digite o celular do contato"
                                value={form.cellphone}
                                onChange={(e) => {
                                    setForm({ ...form, cellphone: formatCellphone(e.target.value) })
                                }}
                            />
                        </Box>

                        <TextField
                            fullWidth
                            id="outlined-required-email"
                            label="E-mail"
                            value={form.email}
                            onChange={(e) => {
                                setForm({ ...form, email: e.target.value })
                            }}
                        />
                    </CustomModalBody>

                    <CustomModalFooter>
                        <UpdateButton
                            disabled={disableButton}
                            onClick={() => {
                                setDisableButton(true)
                                updateContact()
                            }}
                        >
                            Salvar
                        </UpdateButton>
                    </CustomModalFooter>
                </CustomModalPaper>
            </Modal >

            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={handleCloseToast}
            />
        </React.Fragment >

    )
}
