
import React, { useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, UpdateUserButton, UpdateButton, CancelButton } from './styles'
import closeIcon from '../../../../../assets/close_icon.svg'
import { Box, Modal, TextField, Typography } from '@mui/material'
import api from '../../../../../services/api'
import { CustomToast } from '../../../../Toast';
import { useParams } from 'react-router-dom'
import { DateInput } from '../../../../DateInput'

export const ModalEditNF = ({
    open, NFe, handleClose, handleReloadPage = () => Boolean
}) => {
    const { clientId } = useParams()
    const [form, setForm] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if (NFe) {
            setForm(NFe)
        }
    }, [NFe])

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
        setForm(NFe)
        setDisableButton(false)
    }

    async function updateNF() {
        setDisableButton(true)
        const response = await api.UpdateNF({
            ...form,

            clientId,
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
                            Editar NFSe
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
                                id="outlined-required-number"
                                label="Número da NFSe"
                                placeholder="digite o número da NFSe"
                                value={form.number}
                                onChange={(e) => {
                                    setForm({ ...form, number: e.target.value })
                                }}
                            />

                            <TextField
                                required
                                id="outlined-required-vlue"
                                label="Valor"
                                placeholder="digite o valor da NFSe"
                                value={form.value}
                                onChange={(e) => {
                                    setForm({ ...form, value: e.target.value.replace(/[^\d.,]/g, '') })
                                }}
                            />
                        </Box>
                        <Box>
                            <DateInput
                                label='Data de Emissão*'
                                disableFuture={true}
                                selectedDate={form.date}
                                valueCallback={(newDate) => setForm({ ...form, date: newDate })}
                            />

                            <TextField
                                required
                                id="outlined-required-serviceOrder"
                                label="Ordem de Serviço"
                                placeholder="digite a ordem de serviço"
                                value={form.serviceOrder}
                                onChange={(e) => {
                                    setForm({ ...form, serviceOrder: e.target.value })
                                }}
                            />
                        </Box>

                        <TextField
                            required
                            fullWidth
                            id="outlined-required-obs"
                            label="Observações"
                            value={form.obs}
                            onChange={(e) => {
                                setForm({ ...form, obs: e.target.value })
                            }}
                        />
                    </CustomModalBody>

                    <CustomModalFooter>
                        <UpdateButton
                            disabled={disableButton}
                            onClick={() => {
                                setDisableButton(true)
                                updateNF()
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
