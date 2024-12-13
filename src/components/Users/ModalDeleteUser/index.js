
import React, { useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, DeleteUserButton, CancelButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Modal, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { useAuth } from '../../../context/AuthContext'

export const ModalDeleteUser = ({
    open, userData, handleClose, handleReloadPage = () => Boolean
}) => {
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { user } = useAuth()

    const isSameUser = user._id === userData._id

    const handleCloseToast = () => { setOpenToast(false) }
    const handleOnClose = () => {
        handleClose()
    }
    const handleOnReloadPageList = () => {
        handleReloadPage(true)
    }

    async function deleteUser(id) {
        setDisableButton(true)

        const response = await api.DeleteUser(id)

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
                <CustomModalPaper blockAction={isSameUser}>
                    <CustomModalHeader>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Deletar Usuário
                        </Typography>

                        <CloseIcon src={closeIcon}
                            onClick={handleOnClose}
                        />
                    </CustomModalHeader>

                    <React.Fragment>
                        {
                            isSameUser ? (

                                <CustomModalBody blockAction={true}>
                                    <Typography>
                                        {userData.name.split(' ')[0]}, não é permitido deletar seu próprio usuário.
                                    </Typography>
                                </CustomModalBody>

                            ) : (

                                <React.Fragment>
                                    <CustomModalBody blockAction={false}>
                                        <Typography>
                                            Deseja excluir "{userData.name}" da lista de usuários ?
                                        </Typography>
                                    </CustomModalBody>

                                    <CustomModalFooter>
                                        <CancelButton
                                            onClick={handleOnClose}>
                                            Cancelar
                                        </CancelButton>


                                        <DeleteUserButton
                                            disable={disableButton}
                                            onClick={() => deleteUser(userData._id)}
                                        >
                                            Deletar
                                        </DeleteUserButton>
                                    </CustomModalFooter>
                                </React.Fragment>

                            )
                        }
                    </React.Fragment>
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
