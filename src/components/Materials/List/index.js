import React, { useState, useEffect } from 'react'
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
} from './styles'
import searchIcon from '../../../assets/search_icon.svg'
import { ListSkeleton } from './skeleton'
import { MaterialCard } from '../Card/card'
import api from '../../../services/api'
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import { CustomToast } from '../../Toast'
import { PageControl } from '../../PageControl'
import { ModalAddMaterial } from '../ModalAddMaterial'
import { useLocation, useParams } from 'react-router-dom'
import { CustomBackdrop } from '../../CustomBackrop'

export const MaterialList = () => {
    const { itemId } = useParams()
    const location = useLocation()
    const dataFromStockPage = location?.state

    const defaultFilter = {
        itemId: itemId,
        supplierId: '',
        batch: '',
    }
    const [filter, setFilter] = useState(defaultFilter)

    const [itensPerPage, setItensPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [supplierOptions, setSupplierOptions] = useState([])
    const [batchOptions, setBatchOptions] = useState([])
    const [optionsMaterialCode, setOptionsMaterialCode] = useState([])
    const [responseMaterialList, setResponseMaterialList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [loadingList, setLoadingList] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [openAddModal, setOpenAddModal] = useState(false)

    const { isAdm, materialPage } = useAuth()

    const handleCloseAddModal = () => { setOpenAddModal(false) }
    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload) => {
        if (reload) {
            paginatedMaterialListByFilter(filter, 1, itensPerPage)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
        paginatedMaterialListByFilter(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function paginatedMaterialListByFilter(filter, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedMaterialListByFilter(filter, pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseMaterialList({
                totalMaterial: response.total,
                totalPages: response.pages,
                materialList: response.materials
            })
        }
        else {
            setCurrentPage(1)
            setResponseMaterialList({})
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    async function getSupplierOptions(categoryCode) {
        const response = await api.GetSupplierOptions(categoryCode)
        setSupplierOptions(response.partners)
    }

    async function listBatchesOptions(itemCode) {
        const response = await api.ListBatchesOptions(itemCode)
        setBatchOptions(response.batch)
    }

    useEffect(() => {
        paginatedMaterialListByFilter(filter, currentPage, itensPerPage)
        listBatchesOptions(dataFromStockPage.itemCode)
        getSupplierOptions(dataFromStockPage.categoryCode)
    }, [])


    return (
        <React.Fragment>
            <CustomBackdrop open={loadingList} />

            <CustomTitlePaper>
                <Typography>
                    {dataFromStockPage.description}
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <CustomHeader>

                    <SearchField>
                        <FormControl variant="outlined">
                            <InputLabel id="select-outlined-label-item-options">Fornecedor</InputLabel>
                            <Select
                                required
                                labelId="select-outlined-label-supplier-options"
                                disabled={!isAdm && !materialPage.Creator}
                                value={filter?.supplierId}
                                onChange={(e) => {
                                    setFilter({ ...filter, supplierId: e.target.value })
                                }}
                                label="Fornecedor"
                            >
                                <MenuItem value={''}>Selecionar</MenuItem>
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

                        <FormControl variant="outlined">
                            <InputLabel id="select-outlined-label-batch-options">Lotes</InputLabel>
                            <Select
                                required
                                labelId="select-outlined-label-batch-options"
                                disabled={!isAdm && !materialPage.Viewer}
                                value={filter?.batch}
                                onChange={(e) => {
                                    setFilter({ ...filter, batch: e.target.value })
                                }}
                                label="Lotes"
                            >
                                <MenuItem value={''}>Selecionar</MenuItem>
                                {
                                    batchOptions?.length > 0 && (
                                        batchOptions?.map(elem => (
                                            <MenuItem
                                                value={elem.batch}>{elem.batch}</MenuItem>
                                        ))
                                    )
                                }
                            </Select>
                        </FormControl>
                        <IconButtons src={searchIcon}
                            onClick={() => {
                                paginatedMaterialListByFilter(filter, currentPage, itensPerPage)
                            }}
                        />

                        <ClearButton
                            onClick={() => {
                                setFilter(defaultFilter)
                                setCurrentPage(1)
                                paginatedMaterialListByFilter(defaultFilter, 1, itensPerPage)
                            }
                            }>
                            Limpar
                        </ClearButton>

                    </SearchField>

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
                                responseMaterialList?.totalMaterial > 0 ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseMaterialList?.materialList?.length}
                                            total={responseMaterialList?.totalMaterial}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)
                                                paginatedMaterialListByFilter(filter, 1, itensPerPage)
                                            }}
                                        />

                                        {responseMaterialList?.materialList.map(item => (
                                            <MaterialCard
                                                material={item}
                                                key={item._id}
                                            />
                                        ))
                                        }

                                        {responseMaterialList?.totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={responseMaterialList?.totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </React.Fragment>
                                    : <CustomResponse>
                                        <Typography>
                                            Não existem insumos cadastrados ou não foi possível encontrar nenhum insumo para o iltro informado.
                                        </Typography>
                                    </CustomResponse>
                            }
                        </React.Fragment>
                }
            </CustomPaper>

            <ModalAddMaterial
                stockData={dataFromStockPage}
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