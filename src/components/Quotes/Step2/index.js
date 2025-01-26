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
import { useParams } from 'react-router-dom'
import { getOnlyNumber } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import { QuoteProductCard } from './Card/card'


export const QuoteProduct = ({
    productOptions = [],
    productList = [],
    handleUpdate = () => Array
}) => {

    const defaultForm = {
        quantity: '',
        productId: ''
    }

    const [form, setForm] = useState(defaultForm)
    const [responseList, setResponseList] = useState({})
    const { isAdm, quotePage } = useAuth()

    const handleUpdateProductList = () => {
        let updatedList = productList
        let selected = productOptions.find(p => p._id === form.productId)

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

    const handleDeleteProduct = (id) => {
        let updatedList = productList.filter(p => p.productId !== id)

        setForm(defaultForm)
        handleUpdate(updatedList)
    }

    useEffect(() => {
        setResponseList({
            productList: productList
        })
    }, [productList, form])

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
                                    <InputLabel id="select-outlined-label-product-options">Produtos</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-product-options"
                                        disabled={!isAdm && !quotePage.Creator}
                                        value={form?.productId}
                                        onChange={(e) => {
                                            setForm({ ...form, productId: e.target.value })
                                        }}
                                        label="Produtos"
                                    >
                                        <MenuItem value={''}>Selecionar</MenuItem>
                                        {
                                            productOptions?.length > 0 && (
                                                productOptions?.map(elem => (
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
                                    onClick={handleUpdateProductList}
                                    disabled={
                                        form.productId === '' ||
                                        form.quantity === ''
                                    }
                                >
                                    Incluir Produto
                                </SaveButton>
                            </Box>
                        </Box>
                    )
                }
            </CustomPaper>

            <CustomPaper>
                {
                    responseList.productList?.length > 0 ?
                        <React.Fragment>
                            {responseList.productList.map(item => (
                                <QuoteProductCard
                                    product={item}
                                    key={item._id}
                                    handleDeleteAndReloadList={(id) => {
                                        handleDeleteProduct(id)
                                    }}
                                />
                            ))
                            }
                        </React.Fragment>
                        : <CustomResponse>
                            <Typography>
                                Sem produtos adicionados
                            </Typography>
                        </CustomResponse>
                }
            </CustomPaper>

        </React.Fragment>
    )
}