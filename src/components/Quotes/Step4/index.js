import React, { useState, useEffect } from 'react'
import {
    CustomHeader,
    CustomPaper,
    CustomResponse,
    CustomPaginator,
    CustomModalBody,
    ClearButton,
    SaveButton
} from './styles'
import { ListSkeleton } from './skeleton'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { getOnlyNumber } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import { QuoteServiceCard } from './Card/card'

export const QuoteService = ({
    serviceOptions = [],
    servicetList = [],
    handleUpdate = () => Array
}) => {

    const defaultForm = {
        quantity: '',
        serviceId: ''
    }

    const [form, setForm] = useState(defaultForm)
    const [responseList, setResponseList] = useState({})
    const { isAdm, quotePage } = useAuth()

    const handleUpdateServicetList = () => {
        let updatedList = servicetList
        let selected = serviceOptions.find(p => p._id === form.serviceId)

        updatedList.push({
            ...form,
            product: selected.product,
            quantity: parseInt(form.quantity),
            value: selected.value,
            total: selected.value * parseInt(form.quantity)
        })

        setForm(defaultForm)
        handleUpdate(updatedList)
    }

    const handleDeleteService = (id) => {
        let updatedList = servicetList.filter(p => p.serviceId !== id)

        console.log('ondelete', {
            updatedList, id
        })
        setForm(defaultForm)
        handleUpdate(updatedList)
    }

    useEffect(() => {
        setResponseList({
            servicetList: servicetList
        })
    }, [servicetList, form])

    return (
        <React.Fragment>
            <CustomPaper>
                {
                    (isAdm || quotePage.Creator) && (
                        <Box width={'100%'} display={'flow'} >
                            <Box
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'row'}
                            >
                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-service-options">Serviços</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-service-options"
                                        disabled={!isAdm && !quotePage.Creator}
                                        value={form?.serviceId}
                                        onChange={(e) => {
                                            setForm({ ...form, serviceId: e.target.value })
                                        }}
                                        label="Serviços"
                                    >
                                        <MenuItem value={''}>Selecionar</MenuItem>
                                        {
                                            serviceOptions?.length > 0 && (
                                                serviceOptions?.map(elem => (
                                                    <MenuItem
                                                        value={elem._id}>{elem.product}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required-quantity"
                                    label="Quantidade"
                                    placeholder="digite quantidade"
                                    value={form?.quantity}
                                    onChange={(e) => {
                                        setForm({ ...form, quantity: getOnlyNumber(e.target.value) })
                                    }}
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
                                    onClick={handleUpdateServicetList}
                                    disabled={
                                        form.serviceId === '' ||
                                        form.quantity === ''
                                    }
                                >
                                    Incluir Serviço
                                </SaveButton>
                            </Box>
                        </Box>
                    )
                }
            </CustomPaper>

            <CustomPaper>
                {
                    responseList.servicetList?.length > 0 ?
                        <React.Fragment>
                            {responseList.servicetList.map(item => (
                                <QuoteServiceCard
                                    product={item}
                                    key={item._id}
                                    handleDeleteAndReloadList={(id) => {
                                        handleDeleteService(id)
                                    }}
                                />
                            ))
                            }
                        </React.Fragment>
                        : <CustomResponse>
                            <Typography>
                                Sem serviços adicionados
                            </Typography>
                        </CustomResponse>
                }
            </CustomPaper>

        </React.Fragment>
    )
}