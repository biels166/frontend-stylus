

import React, { useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, RegisterButton, CancelButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, Modal, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { useAuth } from '../../../context/AuthContext'

export const ModalDeleteItem = ({
    item, category, open, handleClose, handleReloadPage = () => Boolean
}) => {
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm, materialPage } = useAuth()

    const handleCloseToast = () => { setOpenToast(false) }
    const handleOnClose = () => {
        handleClose()
    }
    const handleReloadPageList = () => {
        handleReloadPage(true)
    }

    async function deleteItemCategory() {
        setDisableButton(true)

        const response = await api.DeleteItemCategory(item._id)

        if (response.success) {
            setTimeout(() => {
                handleReloadPageList()
            }, 2000)
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
                            Deletar Item
                        </Typography>

                        <CloseIcon src={closeIcon}
                            onClick={() => {
                                handleOnClose()
                            }}
                        />
                    </CustomModalHeader>

                    <Box>
                        <CustomModalBody blockAction={false}>
                            <Typography>
                                Deseja excluir "{item.name}" da categoria "{category}" ?
                            </Typography>
                        </CustomModalBody>
                        {(isAdm || materialPage.Exclusor) && (
                            <CustomModalFooter>
                                <CancelButton
                                    onClick={handleOnClose}>
                                    Cancelar
                                </CancelButton>

                                <RegisterButton
                                    disabled={disableButton}
                                    onClick={() => {
                                        setDisableButton(true)
                                        deleteItemCategory()
                                    }}
                                >
                                    Deletar
                                </RegisterButton>
                            </CustomModalFooter>
                        )}

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