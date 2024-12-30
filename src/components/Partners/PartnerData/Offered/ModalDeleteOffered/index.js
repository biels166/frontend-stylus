
import React, { useState, useEffect } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, DeleteUserButton, CancelButton } from './styles'
import closeIcon from '../../../../../assets/close_icon.svg'
import { Modal, Typography } from '@mui/material'
import api from '../../../../../services/api'
import { CustomToast } from '../../../../Toast'
import { useLocation } from 'react-router-dom'

export const ModalDeleteOffered = ({
    open, Offered, handleClose, handleReloadPage = () => Boolean
}) => {
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const location = useLocation()
    const dynamicOffered = location.state?.isSupplier ? 'Produto Fornecido' : 'Serviço Oferecido'
    const partnerType = location.state?.isSupplier ? 'Fornecedor' : 'Terceiro / Prestador de serviço'

    const handleCloseToast = () => { setOpenToast(false) }
    const handleOnClose = () => {
        handleClose()
    }
    const handleOnReloadPageList = () => {
        handleReloadPage(true)
    }

    async function deleteOffered(id) {
        setDisableButton(true)

        const response = await api.DeleteOffered(id)

        if (response.success) {
            setTimeout(() => {
                handleOnReloadPageList()
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
                            Deletar {dynamicOffered}
                        </Typography>

                        <CloseIcon src={closeIcon}
                            onClick={handleOnClose}
                        />
                    </CustomModalHeader>

                        <CustomModalBody blockAction={false}>
                            <Typography>
                                Deseja excluir "{Offered.name}" da lista de {dynamicOffered.toLowerCase()}?
                            </Typography>
                        </CustomModalBody>

                        <CustomModalFooter>
                            <CancelButton
                                onClick={handleOnClose}>
                                Cancelar
                            </CancelButton>

                            <DeleteUserButton
                                disable={disableButton}
                                onClick={() => deleteOffered(Offered._id)}
                            >
                                Deletar
                            </DeleteUserButton>
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
