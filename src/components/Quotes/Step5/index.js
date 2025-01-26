import React, { useState, useEffect, useCallback } from 'react'
import {
    CustomPaper,
    CustomResponse,
    ClearButton,
    SaveButton
} from './styles'
import { ListSkeleton } from './skeleton'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { formatValue, getOnlyNumber } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import { QuotePartnerServiceCard } from './Card/card'
import api from '../../../services/api'

export const QuotePartnerService = ({
    outsourcedItensOptions = [],
    partnerServiceList = [],
    handleUpdate = () => Array
}) => {

    const defaultForm = {
        quantity: '',
        itemCode: '',
        service: '',
        item: {},
        value: '',
        outsourcedId: '',
        outsourcedName: '',
        outsourced: {},
        refValue: formatValue(0)
    }

    const [form, setForm] = useState(defaultForm)
    const [responseList, setResponseList] = useState({})
    const [outsourcedOptions, setOutsourcedOptions] = useState([])
    const { isAdm, quotePage } = useAuth()

    const handleUpdatePartnerServicetList = () => {
        let updatedList = partnerServiceList

        updatedList.push({
            ...form,
            name: outsourcedItensOptions.find(p => p.itemCode === form.itemCode).name,
            quantity: parseInt(form.quantity),
            totalCost: form.value * parseInt(form.quantity)
        })

        setForm(defaultForm)
        setOutsourcedOptions([])
        handleUpdate(updatedList)
    }

    const handleDeletePartinerService = (iitemCode) => {
        let updatedList = partnerServiceList.filter(p => p.itemCode !== iitemCode)

        setForm(defaultForm)
        handleUpdate(updatedList)
    }

    async function getOutsourcedOptions(categoryCode) {
        const response = await api.GetOutsourcedOptions(categoryCode)
        setOutsourcedOptions(response.partners)
    }

    async function handleOnchangeOutsourced(newform) {

        let filter = {
            name: newform?.item?.name,
            partnerId: newform?.outsourcedId
        }

        let ref = 0

        if (newform?.outsourcedId !== '') {
            const response = await api.PaginatedOfferedList(filter, 1, 50)

            if (response.offered?.length > 0)
                ref = response.offered[0]?.value
        }

        setForm({
            ...newform, refValue: formatValue(ref)
        })
    }

    useEffect(() => {
        setResponseList({
            partnerServiceList: partnerServiceList
        })
    }, [partnerServiceList, form])

    return (
        <React.Fragment>
            <CustomPaper>
                {
                    (isAdm || quotePage.Creator) && (
                        <Box width={'100%'} display={'flow'}>
                            <Box
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'row'}
                            >
                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-item-options">Item</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-item-options"
                                        disabled={!isAdm && !quotePage.Creator}
                                        value={form?.itemCode}
                                        onChange={(e) => {
                                            let selected = outsourcedItensOptions.find(p => p.itemCode === e.target.value)
                                            setForm({
                                                ...form,
                                                itemCode: e.target.value,
                                                item: selected,
                                                service: selected.name                                                
                                            })
                                            getOutsourcedOptions(e.target.value.split(".")[0])
                                        }}
                                        label="Item"
                                    >
                                        <MenuItem value={''}>Selecionar</MenuItem>
                                        {
                                            outsourcedItensOptions?.length > 0 && (
                                                outsourcedItensOptions?.map(elem => (
                                                    <MenuItem
                                                        value={elem.itemCode}>{elem.itemCode} - {elem.name}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-outsourced-options">Prestador de Serviço</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-outsourced-options"
                                        disabled={(!isAdm && !quotePage.Creator) || outsourcedOptions.length === 0}
                                        value={form?.outsourcedId}
                                        onChange={(e) => {
                                            let selected = outsourcedOptions.find(p => p._id === e.target.value)
                                            let newform = {
                                                ...form,
                                                outsourcedId: e.target.value,
                                                outsourced: selected,
                                                outsourcedName: selected.name,
                                            }

                                            handleOnchangeOutsourced(newform)
                                        }}
                                        label="Prestador de Serviço"
                                    >
                                        <MenuItem value={''}>Selecionar</MenuItem>
                                        {
                                            outsourcedOptions?.length > 0 && (
                                                outsourcedOptions?.map(elem => (
                                                    <MenuItem
                                                        value={elem._id}>{elem.name}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'row'}
                            >
                                <TextField
                                    required
                                    id="outlined-required-quantity"
                                    label="Quantidade"
                                    placeholder="digite quantidade"
                                    value={form?.quantity}
                                    onChange={(e) => {
                                        setForm({ ...form, quantity: getOnlyNumber(e.target.value) })
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-value"
                                    label="Valor"
                                    placeholder="digite o valor do serviço do parceiro"
                                    value={form?.value}
                                    onChange={(e) => {
                                        setForm({ ...form, value: e.target.value.replace(/[^\d.,]/g, '') })
                                    }}
                                />

                                <TextField
                                    disabled={true}
                                    id="outlined-required-value"
                                    label="Valor de Referência"
                                    placeholder='Valor de Referência'
                                    value={form?.refValue}
                                />
                            </Box>

                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                            >
                                <ClearButton
                                    onClick={() => { setForm(defaultForm) }}>
                                    Limpar
                                </ClearButton>

                                <SaveButton
                                    onClick={handleUpdatePartnerServicetList}
                                    disabled={
                                        form.itemCode === '' ||
                                        form.quantity === '' ||
                                        form.value === '' ||
                                        (form.outsourcedId === '' || outsourcedOptions.length === 0)
                                    }
                                >
                                    Incluir Prestação de Serviço
                                </SaveButton>
                            </Box>

                        </Box>
                    )
                }
            </CustomPaper>

            <CustomPaper>
                {
                    responseList.partnerServiceList?.length > 0 ?
                        <React.Fragment>
                            {responseList.partnerServiceList.map(item => (
                                <QuotePartnerServiceCard
                                    partnerService={item}
                                    key={item._id}
                                    handleDeleteAndReloadList={(itemCode) => {
                                        handleDeletePartinerService(itemCode)
                                    }}
                                />
                            ))
                            }
                        </React.Fragment>
                        : <CustomResponse>
                            <Typography>
                                Sem serviços de terceiros adicionados
                            </Typography>
                        </CustomResponse>
                }
            </CustomPaper>

        </React.Fragment>
    )
}