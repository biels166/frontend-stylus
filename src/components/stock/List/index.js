import React, { useState, useEffect } from 'react'
import {
    CustomHeader,
    CustomPaper,
    CustomTitlePaper,
    IconButtons,
    SearchField,
    ClearButton,
    CustomResponse,
    CustomPaginator,
    AddButton,
} from './styles'
import searchIcon from '../../../assets/search_icon.svg'
import { ListSkeleton } from './skeleton'
import { StockCard } from '../Card/card'
import api from '../../../services/api'
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import { CustomToast } from '../../Toast'
import { PageControl } from '../../PageControl'
import { ModalAddMaterial } from '../ModalAddMaterial'
import { CustomBackdrop } from '../../CustomBackrop'

export const StockList = () => {
    const defaultFilter = {
        itemId: ''
    }
    const [filter, setFilter] = useState(defaultFilter)
    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [responseStockList, setResponseStockList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [loadingList, setLoadingList] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [itensOptions, setItensOptions] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false)

    const { isAdm, materialPage } = useAuth()

    const handleCloseAddModal = () => { setOpenAddModal(false) }
    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload) => {
        if (reload) {
            listStockControl(filter, 1, itensPerPage)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
        listStockControl(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function listStockControl(filter, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.ListStockControl(filter, pageNumber, rowsPage)

        console.log(response)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseStockList({
                totalStock: response.total,
                totalPages: response.pages,
                stockList: response.stocks
            })
        }
        else {
            setCurrentPage(1)
            setResponseStockList({})
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    async function getAllSupplierItens() {
        const response = await api.GetAllSupplierItens()
        setItensOptions(response.itens)
    }

    useEffect(() => {
        listStockControl(filter, 1, itensPerPage)
        getAllSupplierItens()
    }, [])

    return (
        <React.Fragment>
            <CustomBackdrop open={loadingList} />
            
            <CustomTitlePaper>
                <Typography>
                    Controle de Estoque
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <CustomHeader>
                    {
                        (isAdm && materialPage.Viewer) && (
                            <SearchField>
                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-item-options">Item da Categoria</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-item-options"
                                        disabled={!isAdm && !materialPage.Viewer}
                                        value={filter?.itemId}
                                        onChange={(e) => {
                                            setFilter({ ...filter, itemId: e.target.value })
                                        }}
                                        label="Item da Categoria"
                                    >
                                        <MenuItem value={''}>Selecionar</MenuItem>
                                        {
                                            itensOptions?.length > 0 && (
                                                itensOptions?.map(elem => (
                                                    <MenuItem
                                                        value={elem.itemCode}>{elem.itemCode} - {elem.name}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <IconButtons src={searchIcon}
                                    onClick={() => {
                                        listStockControl(filter, currentPage, itensPerPage)
                                    }}
                                />

                                <ClearButton
                                    onClick={() => {
                                        setFilter(defaultFilter)
                                        setCurrentPage(1)
                                        listStockControl(defaultFilter, 1, itensPerPage)
                                    }
                                    }>
                                    Limpar
                                </ClearButton>

                            </SearchField>
                        )
                    }


                    {
                        (isAdm || materialPage.Creator) && (
                            <AddButton
                                onClick={() => setOpenAddModal(true)}>
                                Cadastrar
                            </AddButton>
                        )
                    }
                </CustomHeader>

                {
                    loadingList ?
                        <ListSkeleton /> :
                        <React.Fragment>
                            {
                                responseStockList?.totalStock > 0 ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseStockList?.stockList?.length}
                                            total={responseStockList?.totalStock}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)
                                                listStockControl(filter, currentPage, itensPerPage)
                                            }}
                                        />

                                        {
                                            responseStockList?.stockList.map(item => (
                                                <StockCard
                                                    stock={item}
                                                    key={item._id}
                                                />
                                            ))
                                        }

                                        {responseStockList?.totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={responseStockList?.totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </React.Fragment>
                                    : <CustomResponse>
                                        <Typography>
                                            Não existem material cadastrados no estoque ou não foi possível encontrar nenhum insumo para o iltro informado.
                                        </Typography>
                                    </CustomResponse>
                            }
                        </React.Fragment>
                }
            </CustomPaper>

            <ModalAddMaterial
                open={openAddModal}
                handleClose={handleCloseAddModal}
                handleReloadPage={(reload) => { handleReloadPage(reload) }}
            />

            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={handleCloseToast}
            />
        </React.Fragment>
    )
}