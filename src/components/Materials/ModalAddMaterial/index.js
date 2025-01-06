

import React, { useCallback, useEffect, useState } from 'react'
import { CustomModalPaper, CloseIcon, CustomModalHeader, CustomModalFooter, CustomModalBody, RegisterButton, ClearButton } from './styles'
import closeIcon from '../../../assets/close_icon.svg'
import api from '../../../services/api'
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { getOnlyNumber } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import { DateInput } from '../../DateInput'

export const ModalAddMaterial = ({
    stockData, open, handleClose, handleReloadPage = () => Boolean
}) => {
    const defaultForm = {
        categoryId: stockData.categoryCode,
        itemId: stockData.itemCode,
        type: '',
        typeReference: '',
        quantity: '',
        quantityReference: '',
        totalCost: '',
        costPerItem: '',
        observations: '',
        supplierId: '',
        purchasedIn: new Date
    }

    const [form, setForm] = useState(defaultForm)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [itemOptions, setItemOptions] = useState([])
    const [supplierOptions, setSupplierOptions] = useState([])

    const { isAdm, materialPage } = useAuth()

    const types = ['Milheiro', 'Rolo(s)', 'Pacote(s)', 'Galão(ões)', 'Pedaço(s)', 'Caixa(s)', 'Unidade(s)']

    const referenceTypes = [
        { reference: 'Milheiro', value: 'Unidade(s)' },
        { reference: 'Rolo(s)', value: 'Metros' },
        { reference: 'Galão(ões)', value: 'Quilograma(s)' },
        { reference: 'Pacote(s)', value: 'Folha(s)' },
        { reference: 'Pedaço(s)', value: 'Unidade(s)' },
        { reference: 'Caixa(s)', value: 'Unidade(s)' },
        { reference: 'Unidade(s)', value: 'Unidade(s)' }
    ]

    const getReferenceType = useCallback(() => {
        const { type } = form
        let typeReference = ''

        if (type) {
            typeReference = referenceTypes.find(i => i.reference === type)?.value
        }

        return typeReference

    }, [form?.type])

    const calculateCostPerItem = useCallback(() => {
        const { totalCost, quantity, quantityReference, categoryId, type } = form
        let costPerItem = 0

        if ((totalCost && totalCost > 0) && (quantity && quantity > 0)) {
            let totalCostValue = 0
            let quantityValue = 0
            let quantityReferenceValue = 0

            let selectedCategory = categoryOptions.filter(c => c.code === categoryId)[0]

            try {
                totalCostValue = parseFloat(totalCost)
            } catch (error) {
                console.error('totalCostValue', error)
            }

            try {
                quantityValue = parseInt(quantity)
            } catch (error) {
                console.error('quantityValue', error)
            }

            try {
                quantityReferenceValue = parseInt(quantityReference)
            } catch (error) {
                console.error('quantityReference', error)
            }

            switch (selectedCategory?.name) {
                case 'PERCALUX':
                    costPerItem = quantityReferenceValue > 0 ?
                        totalCostValue / (quantityValue * 8 * quantityReferenceValue) :
                        totalCostValue / (quantityValue * 8)
                    break;

                case 'PAPEL':
                case 'WIRE-O':
                    costPerItem = quantityReferenceValue > 0 ?
                        totalCostValue / (quantityValue * quantityReferenceValue) :
                        totalCostValue / (quantityValue)
                    break;

                case 'PAPELÃO':
                case 'AGENDA':
                    costPerItem = totalCostValue / quantityValue
                    break;

                default:
                    costPerItem = totalCostValue / quantityValue
                    break;
            }
        }

        return costPerItem

    }, [form?.quantity, form?.totalCost, form?.quantityReference, form?.type])

    useEffect(() => { setForm({}) }, [])

    useEffect(() => { console.log('form', form) }, [form])

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
        setForm(defaultForm)
        setDisableButton(false)
    }

    async function createMaterial() {
        setDisableButton(true)

        const response = await api.CreateMaterial({
            ...form,
            typeReference: getReferenceType(),
            costPerItem: calculateCostPerItem()
        })

        if (response.success) {
            setTimeout(() => {
                handleOnReloadPageList()
                handleClear()
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

    async function getCategoryOptions() {
        const response = await api.GetCategoryOptions()
        setCategoryOptions(response.categories
            .filter(c => c.code === stockData.categoryCode)
        )
    }

    async function getItemOptions(categoryCode) {
        const response = await api.GetAllItensByCategory([categoryCode])
        setItemOptions(response.itens
            .filter(c => c.itemCode === stockData.itemCode)
        )
    }

    async function getSupplierOptions(categoryCode) {
        const response = await api.GetSupplierOptions(categoryCode)

        setSupplierOptions(response.partners)
    }

    useEffect(() => {
        getCategoryOptions()
        getItemOptions([stockData.categoryCode])
        getSupplierOptions(stockData.categoryCode)
    }, [])

    useEffect(() => {
        console.log('stockData', stockData)
    }, [])

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
                            Cadastrar Nova Compra - {stockData.description}
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
                            <FormControl variant="outlined">
                                <InputLabel id="select-outlined-label-options">Categoria do Material</InputLabel>
                                <Select
                                    required
                                    labelId="select-outlined-label-options"
                                    disabled={!isAdm && !materialPage.Creator}
                                    value={form?.categoryId}
                                    label="Categoria do Material"
                                    onChange={(e) => {
                                        setForm({ ...form, categoryId: e.target.value })
                                    }}
                                >
                                    {
                                        categoryOptions?.length > 0 && (
                                            categoryOptions?.map(elem => (
                                                <MenuItem value={elem.code}>{elem.description}</MenuItem>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>

                            <React.Fragment>
                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-item-options">Item da Categoria</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-item-options"
                                        disabled={!isAdm && !materialPage.Creator}
                                        value={form?.itemId}
                                        label="Item da Categoria"
                                        onChange={(e) => {
                                            setForm({ ...form, itemId: e.target.value })
                                        }}
                                    >
                                        {
                                            itemOptions?.length > 0 && (
                                                itemOptions?.map(elem => (
                                                    <MenuItem value={elem.itemCode}>{elem.itemCode} - {elem.name}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <span>Dados da Compra</span>

                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    gap={'10px'}
                                    flexDirection={'row'}
                                >
                                    <FormControl variant="outlined">
                                        <InputLabel id="select-outlined-label-item-options">Fornecedor</InputLabel>
                                        <Select
                                            required
                                            labelId="select-outlined-label-supplier-options"
                                            disabled={!isAdm && !materialPage.Creator}
                                            value={form?.supplierId}
                                            onChange={(e) => {
                                                setForm({ ...form, supplierId: e.target.value })
                                            }}
                                            label="Fornecedor"
                                        >
                                            {
                                                supplierOptions?.length > 0 && (
                                                    supplierOptions?.map(elem => (
                                                        <MenuItem
                                                            value={elem._id}>{elem.name}</MenuItem>
                                                    ))
                                                )
                                            }
                                        </Select>
                                    </FormControl>

                                    <DateInput
                                        variant='outlined'
                                        label='Data da Compra*'
                                        disableFuture={true}
                                        selectedDate={form?.purchasedIn}
                                        valueCallback={(newDate) => setForm({ ...form, purchasedIn: newDate })}
                                    />
                                </Box>

                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    gap={'10px'}
                                    flexDirection={'row'}
                                >
                                    <TextField
                                        required
                                        id="outlined-required-totalCost"
                                        label="Custo Total"
                                        placeholder="informa o valor total da compra"
                                        value={form.totalCost}
                                        onChange={(e) => {
                                            setForm({ ...form, totalCost: e.target.value.replace(/[^\d.,]/g, '') })
                                        }}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        id="outlined-required-quantity"
                                        label="Quantidade Comprada"
                                        placeholder="informe a quantidade comprada"
                                        value={form.quantity}
                                        onChange={(e) => {
                                            setForm({ ...form, quantity: getOnlyNumber(e.target.value) })
                                        }}
                                    />

                                    <FormControl variant="outlined">
                                        <InputLabel id="select-outlined-required-type">Tipo</InputLabel>
                                        <Select
                                            id="outlined-required-type"
                                            value={form.type}
                                            onChange={(e) => {
                                                setForm({ ...form, type: e.target.value, })
                                            }}
                                            label="Tipo"
                                        >
                                            <MenuItem value={""} selected><en>Selecionar</en></MenuItem>
                                            {
                                                types.length > 0 && (
                                                    types.map(elem => (
                                                        <MenuItem value={elem}>{elem}</MenuItem>
                                                    ))
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    gap={'10px'}
                                    flexDirection={'row'}
                                >
                                    <TextField
                                        disabled
                                        id="outlined-required-totalCost"
                                        label="Custo Por Unidade"
                                        value={calculateCostPerItem()}
                                    />

                                    <TextField
                                        required
                                        id="outlined-required-ref-quantity"
                                        label="Quantidade de Referência"
                                        placeholder="informe a quantidade de referência"
                                        value={form.quantityReference}
                                        onChange={(e) => {
                                            setForm({ ...form, quantityReference: getOnlyNumber(e.target.value) })
                                        }}
                                    />

                                    <TextField
                                        disabled
                                        id="outlined-required-typereference"
                                        label="Tipo de Referência"
                                        value={getReferenceType()}
                                    />
                                </Box>


                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    gap={'10px'}
                                    flexDirection={'row'}
                                >
                                    <TextField
                                        fullWidth={true}
                                        variant='outlined'
                                        required
                                        id="standard-required-observation"
                                        label="Observações"
                                        placeholder="observações"
                                        multiline
                                        maxRows={6}
                                        value={form?.observations}
                                        onChange={(e) => {
                                            setForm({ ...form, observations: e.target.value })
                                        }}
                                    />
                                </Box>
                            </React.Fragment>

                        </CustomModalBody>

                        <CustomModalFooter>
                            <ClearButton
                                disabled={disableButton}
                                onClick={handleClear}>
                                Limpar
                            </ClearButton>

                            <RegisterButton
                                disabled={disableButton}
                                onClick={() => {
                                    setDisableButton(true)
                                    createMaterial()
                                }}
                            >
                                Salvar
                            </RegisterButton>
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
        </React.Fragment>
    )
}