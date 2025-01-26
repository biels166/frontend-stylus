
import React from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, CancelButton, Confirm } from './styles'
import closeIcon from '../../assets/close_icon.svg'
import { Modal, Typography } from '@mui/material'

export const ConfirmAction = ({
    open, title, text, handleClose, returnDecision = () => Boolean
}) => {

    const handleOnClose = () => { handleClose() }

    return (
        <Modal open={open}>
            <CustomModalPaper>
                <CustomModalHeader>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>

                    <CloseIcon src={closeIcon}
                        onClick={handleOnClose}
                    />
                </CustomModalHeader>

                <CustomModalBody>
                    <Typography>
                        {text}
                    </Typography>
                </CustomModalBody>

                <CustomModalFooter>
                    <CancelButton
                        onClick={() => {
                            returnDecision(false)
                            handleOnClose()
                        }}
                    >
                        Cancelar
                    </CancelButton>
                    <Confirm
                        onClick={() => {
                            returnDecision(true)
                            handleOnClose()
                        }}
                    >
                        Confirmar
                    </Confirm>
                </CustomModalFooter>
            </CustomModalPaper>
        </Modal>
    )
}
