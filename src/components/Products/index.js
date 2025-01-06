import React, { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react'
import {
    CustomHeader,
    CustomPaper,
    CustomTitlePaper,
    IconButtons,
    SearchField,
    ClearButton,
    AddButton,
    CustomResponse,
    CustomPaginator,
    CustomModalPaper,
    CustomModalDiv,
    CloseIcon,
    CustomModalHeader,
    CustomModalFooter,
    RegisterNewUserButton,
    CustomModalBody
} from './styles'
import searchIcon from '../../assets/search_icon.svg'
import closeIcon from '../../assets/close_icon.svg'
import { ListSkeleton } from './skeleton'
import { ClientCard } from '../Clientes/Card/card'
import api from '../../services/api'
import { Alert, Box, MenuItem, Modal, Pagination, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { UFS } from '../../constants/UFS'
import ProductTabel from './tabel'
import { ModalAddProduct } from './ModalAddProduct'

export const ProductsAndServices = () => {
    const ITENS_PER_PERGE = 2
    const [openToast, setOpenToast] = useState(false)
    const [registerStatus, setRegisterStatus] = useState('')
    const [registerInfo, setRegisterInfo] = useState('')
    const [openAddModal, setOpenAddModal] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItens, setTotalItens] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [filter, setFilter] = useState('')
    const [productName, setProductName] = useState('')
    const [productValue, setProductValue] = useState('')
    const [obs, setObs] = useState('')
    const [productList, setProductList] = useState([])
    const [initialData, setInitialData] = useState({ rows: [], columns: [] });

    const handleReloadPage = (reload) => {
        if (reload) {
            list(1)
        }
    }

    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        if (filter === '')
            list(value)
        else
            getProductByName(filter, value)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCloseAddModal = () => {
        setOpenAddModal(false)
        setProductName('')
        setObs('')
        setProductValue('')
    }

    const handleCloseToast = () => {
        setOpenToast(false)
    }

    async function list(pageNumber) {
        setLoadingList(true)
        await api.get('/product/list')
            .then(
                response => {
                    let total = response.data.length
                    let pages = Math.ceil(total / ITENS_PER_PERGE)
                    let skip = (pageNumber - 1) * ITENS_PER_PERGE
                    let take = skip + ITENS_PER_PERGE
                    let filtered = response.data.slice(skip, take)

                    if (pageNumber === 1) setCurrentPage(1)
                    setProductList(filtered)
                    setTotalItens(total)
                    setTotalPages(pages)
                    setLoadingList(false)

                    let rows = []
                    response.data.forEach(item => {
                        rows.push({ 
                            ...item,
                            type: item.isProduct === true ? 'PRODUTO' : 'SERVIÇO'
                        })
                    })

                    let aux = {
                        rows: [rows],
                        columns: [
                            { field: 'product', headerName: 'PRODUTO' },
                            { field: 'value', headerName: 'VALOR' },
                            { field: 'obs', headerName: 'OBSERVAÇÕES' },
                            { field: 'type', headerName: 'TIPO' },
                        ]
                    }
                    setInitialData(aux)
                }
            ).catch(erro => {
                console.log(erro)
                setProductList([])
                setTotalItens(0)
                setTotalPages(0)
                setLoadingList(false)
            })
    }

    async function getProductByName(productName, pageNumber) {
        setLoadingList(true)

        await api.get(`/product/filter/description/${productName}`)
            .then(
                response => {
                    let total = response.data.length
                    let pages = Math.ceil(total / ITENS_PER_PERGE)
                    let skip = (pageNumber - 1) * ITENS_PER_PERGE
                    let take = skip + ITENS_PER_PERGE
                    let filtered = response.data.slice(skip, take)
                    if (pageNumber === 1) setCurrentPage(1)
                    setProductList(filtered)
                    setTotalItens(total)
                    setTotalPages(pages)
                    setLoadingList(false)

                    let rows = []
                    response.data.forEach(item => {
                        rows.push({ 
                            ...item,
                            type: item.isProduct === true ? 'PRODUTO' : 'SERVIÇO'
                        })
                    })

                    let aux = {
                        rows: [rows],
                        columns: [
                            { field: 'product', headerName: 'PRODUTO' },
                            { field: 'value', headerName: 'VALOR' },
                            { field: 'obs', headerName: 'OBSERVAÇÕES' },
                            { field: 'type', headerName: 'TIPO' },
                        ]
                    }
                    setInitialData(aux)
                }
            ).catch(erro => {
                console.log(erro)
                setProductList([])
                setTotalItens(0)
                setTotalPages(0)
                setLoadingList(false)
            })
    }

    useEffect(() => {
        list(1)
    }, [])

    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    Produtos e Serviços
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <CustomHeader>
                    <SearchField>
                        <TextField
                            required
                            id="outlined-required-name"
                            label="Produto"
                            placeholder="digite o produto"
                            value={filter}
                            onChange={(e) => {
                                let searchValue = e.target.value
                                setFilter(searchValue)
                            }}
                        />

                        <IconButtons src={searchIcon}
                            onClick={() => {

                                getProductByName(filter, 1)
                            }}
                        />
                        <ClearButton
                            onClick={() => {
                                setFilter('')
                                setCurrentPage(1)
                                list(1)
                            }
                            }>
                            Limpar
                        </ClearButton>
                    </SearchField>

                    <AddButton
                        onClick={() => setOpenAddModal(true)}>
                        Cadastrar
                    </AddButton>
                </CustomHeader>

                {
                    loadingList ?
                        <ListSkeleton /> :
                        <React.Fragment>
                            {
                                totalItens > 0 && initialData.rows?.length > 0 && initialData.columns?.length > 0 ? (
                                    <Box
                                        display={'flex'}
                                        marginTop={'10 px'}>
                                        <ProductTabel
                                            initialData={initialData}
                                            handleReloadPage={handleReloadPage}
                                        />
                                    </Box>
                                )
                                    : <CustomResponse>
                                        <Typography>
                                            Produto não encontrado. Verifique o nome informado e tente novamente
                                        </Typography>
                                    </CustomResponse>
                            }
                        </React.Fragment>
                }
            </CustomPaper>

            <ModalAddProduct
                open={openAddModal}
                handleClose={handleCloseAddModal}
                handleReloadPage={(reload) => handleReloadPage(reload)}
            />

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openToast}
                autoHideDuration={6000}
                onClose={handleCloseToast}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity={`${registerStatus}`}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {registerInfo}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}