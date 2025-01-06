import React, { useState, useEffect } from 'react'
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
import { QuoteMaterialCard } from './Card/card'
import api from '../../../services/api'

export const QuoteMaterials = ({
    materialItensOptions = [],
    materialList = [],
    handleUpdate = () => Array
}) => {

    const defaultForm = {
        quantity: '',
        itemCode: '',
        batchId: '',
        batch: {}
    }

    const [form, setForm] = useState(defaultForm)
    const [responseList, setResponseList] = useState({})
    const [batchesOptions, setBatchesOptions] = useState([])
    const { isAdm, quotePage } = useAuth()

    const handleUpdateMaterialList = () => {
        let updatedList = materialList

        updatedList.push({
            ...form,
            name: materialItensOptions.find(p => p.itemCode === form.itemCode).name,
            quantity: parseInt(form.quantity),
            totalCost: parseFloat(form.batch?.costPerItem) * parseInt(form.quantity)
        })

        setForm(defaultForm)
        setBatchesOptions([])
        handleUpdate(updatedList)
    }

    const handleDeleteMaterial = (iitemCode) => {
        let updatedList = materialList.filter(p => p.itemCode !== iitemCode)

        setForm(defaultForm)
        handleUpdate(updatedList)
    }

    async function getBatchesOptions(itemCode) {
        const response = await api.ListBatchesOptions(itemCode)
        setBatchesOptions(response.batch)
    }

    useEffect(() => {
        setResponseList({
            materialList: materialList
        })
    }, [materialList, form])

    return (
        <React.Fragment>
            <CustomPaper>
                {
                    (isAdm || quotePage.Creator) && (
                        <Box width={'100%'} display={'flow'}>
                            <FormControl variant="outlined">
                                <InputLabel id="select-outlined-label-item-options">Insumo</InputLabel>
                                <Select
                                    required
                                    labelId="select-outlined-label-item-options"
                                    disabled={!isAdm && !quotePage.Creator}
                                    value={form?.itemCode}
                                    onChange={(e) => {
                                        setForm({ ...form, itemCode: e.target.value })
                                        getBatchesOptions(e.target.value)
                                    }}
                                    label="Insumo"
                                >
                                    <MenuItem value={''}>Selecionar</MenuItem>
                                    {
                                        materialItensOptions?.length > 0 && (
                                            materialItensOptions?.map(elem => (
                                                <MenuItem
                                                    value={elem.itemCode}>{elem.itemCode} - {elem.name}</MenuItem>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>

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

                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-batch-options">Lotes do Item</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-batch-options"
                                        disabled={(!isAdm && !quotePage.Creator) || batchesOptions.length === 0}
                                        value={form?.batchId}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                batchId: e.target.value,
                                                batch: batchesOptions.find(p => p.batch === e.target.value)
                                            })
                                        }}
                                        label="Lotes do Item"
                                    >
                                        <MenuItem value={''}>Selecionar</MenuItem>
                                        {
                                            batchesOptions?.length > 0 && (
                                                batchesOptions?.map(elem => (
                                                    <MenuItem
                                                        value={elem.batch}>{elem.batch} - Disponível: {elem.available} - Custo Unitário: {formatValue(elem.costPerItem)}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>
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
                                    onClick={handleUpdateMaterialList}
                                    disabled={
                                        form.itemCode === '' ||
                                        form.quantity === '' ||
                                        (form.batchId === '' || batchesOptions.length === 0)
                                    }
                                >
                                    Incluir Insumo
                                </SaveButton>
                            </Box>

                        </Box>
                    )
                }
            </CustomPaper>

            <CustomPaper>
                {
                    responseList.materialList?.length > 0 ?
                        <React.Fragment>
                            {responseList.materialList.map(item => (
                                <QuoteMaterialCard
                                    material={item}
                                    key={item._id}
                                    handleDeleteAndReloadList={(itemCode) => {
                                        handleDeleteMaterial(itemCode)
                                    }}
                                />
                            ))
                            }
                        </React.Fragment>
                        : <CustomResponse>
                            <Typography>
                                Sem insumos adicionados
                            </Typography>
                        </CustomResponse>
                }
            </CustomPaper>

        </React.Fragment>
    )
}