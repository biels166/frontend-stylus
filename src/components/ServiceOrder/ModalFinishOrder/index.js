

import React, { useCallback, useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, RegisterButton, ClearButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { getOnlyNumber } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import { DateInput } from '../../DateInput'
import { ConfirmAction } from '../../ConfirmAction'
import { CustomBackdrop } from '../../CustomBackrop'

export const ModalFinishOrder = ({
    orderData, open, handleClose, handleReloadPage = () => Boolean
}) => {
    const defaultForm = {
        ...orderData,
        deliveredAt: new Date(orderData.deliveryDate),
    }

    const [form, setForm] = useState(defaultForm)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [openConfirmAction, setOpenConfirmAction] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm, orderPage } = useAuth()

    useEffect(() => { setForm(defaultForm) }, [])

    const getConfirmText = () => {
        let text = ''

        if (form?.materialList?.some(mat => mat.quantity != mat.quantityUsed))
            text = 'Foram informadas quantidades de uso diferentes para os insumos. O valor final da OS será alterado ! '

        text += 'Deseja concluir a ordem de serviço ? Não será possível alterar nenhum dado após a conclusão.'

        return text
    }
    const handleCloseToast = () => { setOpenToast(false) }
    const handleOnClose = () => {
        handleClear()
        handleClose()
    }
    const handleOnReloadPageList = () => {
        handleClose()
        handleReloadPage(true)
    }
    const handleClear = () => {
        setForm(defaultForm)
        setDisableButton(false)
    }

    async function completeServiceOrder() {
        setDisableButton(true)

        let materialsCost = form.materialList?.reduce((accumulator, item) => accumulator + item.totalCost, 0)

        let newForm = {
            ...form,
            materialsCost,
        }

        setForm(newForm)

        const response = await api.CompleteServiceOrder(newForm)

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })
        setOpenToast(true)
        setDisableButton(false)

        if (response.success) {
            setTimeout(() => {
                handleOnReloadPageList()
            }, 4000)
        }
    }

    useEffect(() => {
        console.log('form', form)
    }, [form])

    return (
        <React.Fragment>
            <CustomBackdrop open={disableButton} />

            <React.Fragment>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CustomModalPaper>
                        <CustomModalHeader>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Finalizar Ordem de Serviço: {orderData.number}
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
                                {
                                    (isAdm || orderPage.Creator) ? (
                                        <Box sx={{
                                            width: '-webkit-fill-available',
                                            display: 'grid',
                                            justifyContent: 'flex-start',
                                            marginBottom: '20px'
                                        }}>
                                            <DateInput
                                                variant='outlined'
                                                label='Data de Entrega / Conclusão da OS'
                                                disableFuture={true}
                                                selectedDate={form?.deliveredAt}
                                                valueCallback={(newDate) => setForm({ ...form, deliveredAt: newDate })}
                                            />
                                        </Box>
                                    ) : (<></>)
                                }

                                <React.Fragment>

                                    <Typography sx={{ marginBottom: '10px', fontSize: '50px' }}>Consolidar Lista de Materiais Utilizados</Typography>

                                    {
                                        form?.materialList?.length > 0 ? (
                                            form?.materialList?.map(material =>
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        borderTop: '10px solid #003C73',
                                                        boxShadow: '5px 10px 5px #A9A9A9',
                                                        borderRadius: '8px',
                                                        backgroundColor: '#DCDCDC',
                                                        padding: '5px 20px',
                                                        margin: '0px 0px 10px',
                                                        '& .MuiTextField-root': {
                                                            m: 1,
                                                            '& .MuiInputBase-root': {
                                                                padding: '4px 0 -1px',
                                                                '&:before': {
                                                                    borderColor: '#2775A2', // Borda padrão
                                                                },
                                                                '&:hover:not(.Mui-disabled):before': {
                                                                    borderColor: '#2775A2', // Borda ao passar o mouse
                                                                },
                                                                '&.Mui-focused:before': {
                                                                    borderColor: '#2775A2', // Borda ao focar no campo
                                                                },
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Typography>
                                                        {material.itemCode} - {material.name}
                                                    </Typography>

                                                    <span>Quantidade Prevista: {material.quantity}</span>

                                                    <TextField
                                                        variant='standard'
                                                        id="standard-required-quantityUsed"
                                                        placeholder="informe a quantidade final utilizada"
                                                        value={material?.quantityUsed}
                                                        disabled={!isAdm && !orderPage.Creator}
                                                        label='Quantidade Utilizada'
                                                        onChange={(e) => {
                                                            material = { ...material, quantityUsed: getOnlyNumber(e.target.value) }

                                                            let list = form?.materialList

                                                            list.forEach(mat => {
                                                                if (mat.itemCode === material.itemCode) {
                                                                    try {
                                                                        mat.quantityUsed = parseInt(material.quantityUsed)
                                                                    }
                                                                    catch {
                                                                        mat.quantityUsed = 0
                                                                    }

                                                                    mat.totalCost = mat.quantityUsed * mat.batchValue
                                                                }
                                                            })

                                                            setForm({ ...form, materialList: list })
                                                        }}
                                                    />
                                                </Box>
                                            )
                                        ) : (<></>)
                                    }
                                </React.Fragment>

                            </CustomModalBody>

                            <CustomModalFooter>
                                {
                                    (isAdm || orderPage.Creator) ? (
                                        <React.Fragment>
                                            <ClearButton
                                                disabled={disableButton}
                                                onClick={handleClear}>
                                                Limpar
                                            </ClearButton>

                                            <RegisterButton
                                                disabled={disableButton}
                                                onClick={() => {
                                                    setOpenConfirmAction(true)
                                                }}
                                            >
                                                Salvar
                                            </RegisterButton>
                                        </React.Fragment>
                                    ) : (<></>)
                                }
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

                <ConfirmAction
                    open={openConfirmAction}
                    handleClose={() => setOpenConfirmAction(false)}
                    title={'Finalizar Ordem'}
                    text={getConfirmText()}
                    returnDecision={(decision) => {
                        if (!decision) setOpenConfirmAction(false)

                        else {
                            setOpenConfirmAction(false)
                            completeServiceOrder()
                        }
                    }}
                />
            </React.Fragment >
        </React.Fragment>

    )
}