
import React, { useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, DeleteUserButton, CancelButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Modal, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'

export const ModalDeletePartner = ({
    open, partner, handleClose, handleReloadPage = () => Boolean
}) => {
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    const handleCloseToast = () => { setOpenToast(false) }
    const handleOnClose = () => {
        handleClose()
    }
    const handleOnReloadPageList = () => {
        handleReloadPage(true)
    }

    async function deletePartner(id) {
        setDisableButton(true)

        const response = await api.DeletePartner(id)

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
                            Deletar {partner.isSupplier ? 'Fornecedor' : 'Terceiro / Prestador de serviço'}
                        </Typography>

                        <CloseIcon src={closeIcon}
                            onClick={handleOnClose}
                        />
                    </CustomModalHeader>

                    <CustomModalBody>
                        <Typography>
                            Deseja excluir "{partner.name}" da lista ? Todos os dados relacionados serão removidos parmanentemente.
                        </Typography>
                    </CustomModalBody>

                    <CustomModalFooter>
                        <CancelButton
                            onClick={handleOnClose}>
                            Cancelar
                        </CancelButton>


                        <DeleteUserButton
                            disable={disableButton}
                            onClick={() => deletePartner(partner._id)}
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
