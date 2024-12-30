
import React, { useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, UpdateUserButton, UpdateButton, CancelButton, ClearButton } from './styles'
import closeIcon from '../../../../../assets/close_icon.svg'
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import api from '../../../../../services/api'
import { CustomToast } from '../../../../Toast';
import { useLocation, useParams } from 'react-router-dom'
import { DateInput } from '../../../../DateInput'

export const ModalEditOffered = ({
    open, Offered, handleClose, handleReloadPage = () => Boolean
}) => {
    const { partnerId } = useParams()
    const location = useLocation()
    const dynamicOffered = location.state?.isSupplier ? 'Produto Fornecido' : 'Serviço Oferecido'
    const [form, setForm] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (Offered) {
            setForm(Offered)
        }

        getProductOrServiceNameOptions(partnerId)

    }, [Offered])

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
        setForm(Offered)
        setDisableButton(false)
    }

    async function updateOffered() {
        setDisableButton(true)
        const response = await api.UpdateOffered({
            ...form,
            partnerId,
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

    async function getProductOrServiceNameOptions(partnerId) {
        const partner = await api.GetPartnerById(partnerId)
        const categories = partner?.partner?.categories

        let partnerCategories = !categories?.includes(";") ? [categories] :
            categories?.split(";").map(categoryCode => parseInt(categoryCode))

        const response = await api.GetAllItensByCategory(partnerCategories)
        setOptions(response.itens)
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
                            Editar {dynamicOffered}
                        </Typography>

                        <CloseIcon src={closeIcon}
                            onClick={() => {
                                handleOnClose()
                                handleClear()
                            }}
                        />
                    </CustomModalHeader>

                    <CustomModalBody>

                        <FormControl variant="outlined">
                            <InputLabel id="select-outlined-label-item-options">Nome do produto ou serviço</InputLabel>
                            <Select
                                required
                                labelId="select-outlined-label-item-options"
                                value={form?.name}
                                onChange={(e) => {
                                    setForm({ ...form, name: e.target.value })
                                }}
                                label="Nome do produto ou serviço"
                            >
                                {
                                    options?.length > 0 && (
                                        options?.map(elem => (
                                            <MenuItem
                                                value={elem.name}>{elem.itemCode} - {elem.name}</MenuItem>
                                        ))
                                    )
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            required
                            id="outlined-required-value"
                            label="Valor"
                            placeholder="digite o valor do produto ou serviço"
                            value={form.value}
                            onChange={(e) => {
                                setForm({ ...form, value: e.target.value.replace(/[^\d.,]/g, '') })
                            }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            maxRows={6}
                            required
                            id="outlined-required-observation"
                            label="Observações"
                            value={form.observation}
                            onChange={(e) => {
                                setForm({ ...form, observation: e.target.value })
                            }}
                        />
                    </CustomModalBody>

                    <CustomModalFooter>
                        <ClearButton
                            onClick={handleClear}>
                            Limpar
                        </ClearButton>

                        <UpdateButton
                            disabled={disableButton}
                            onClick={() => {
                                setDisableButton(true)
                                updateOffered()
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
