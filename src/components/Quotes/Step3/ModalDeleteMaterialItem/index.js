
import React, { useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, DeleteUserButton, CancelButton } from './styles'
import closeIcon from '../../../../assets/close_icon.svg'
import { Modal, Typography } from '@mui/material'

export const ModalDeleteQuoteMaterial = ({
    open, material, handleClose, handleDeleteAndReload = () => String
}) => {
    const [disableButton, setDisableButton] = useState(false)

    const handleOnClose = () => {
        handleClose()
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CustomModalPaper>
                <CustomModalHeader>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Remover Insumo da Lista
                    </Typography>

                    <CloseIcon src={closeIcon}
                        onClick={handleOnClose}
                    />
                </CustomModalHeader>

                <CustomModalBody>
                    <Typography>
                        Deseja excluir "{material.name}" da lista ?
                    </Typography>
                </CustomModalBody>

                <CustomModalFooter>
                    <CancelButton
                        onClick={handleOnClose}>
                        Cancelar
                    </CancelButton>
                    <DeleteUserButton
                        disable={disableButton}
                        onClick={() => {
                            handleDeleteAndReload(material.itemCode)
                            handleOnClose()
                        }}
                    >
                        Deletar
                    </DeleteUserButton>
                </CustomModalFooter>
            </CustomModalPaper>
        </Modal>
    )
}
