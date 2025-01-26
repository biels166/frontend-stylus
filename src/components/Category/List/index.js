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
} from './styles'
import searchIcon from '../../../assets/search_icon.svg'
import { ListSkeleton } from './skeleton'
import { CategoryCard } from '../Card/card'
import api from '../../../services/api'
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

import { useAuth } from '../../../context/AuthContext'
import { CustomToast } from '../../Toast'
import { PageControl } from '../../PageControl'
import { CustomBackdrop } from '../../CustomBackrop'

export const ItensByCategoryList = () => {
    const defaultFilter = {
        categoryCode: ''
    }
    const [itensPerPage, setItensPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState(defaultFilter)
    const [options, setOptions] = useState([])
    const [responseList, setResponseList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [openToast, setOpenToast] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const { isAdm, materialPage } = useAuth()

    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload) => {
        if (reload) {
            paginatedItensByCategory(filter, 1, itensPerPage)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
        paginatedItensByCategory(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function paginatedItensByCategory(filter, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedItensByCategory(filter, pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseList({
                totalItens: response.total,
                totalPages: response.pages,
                itensList: response.itens
            })
        }
        else {
            setCurrentPage(1)
            setResponseList({})
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    async function getCategoryOptions() {
        const response = await api.GetCategoryOptions()
        setOptions(response.categories)
    }

    useEffect(() => {
        paginatedItensByCategory(filter, currentPage, itensPerPage)
        getCategoryOptions()
    }, [])


    return (
        <React.Fragment>
            <CustomBackdrop open={loadingList} />

            <CustomPaper>
                <CustomHeader>
                    <CustomHeader>
                        <Typography id="title" variant="h6" component="h2">
                            Lista de Itens por Categoria
                        </Typography>
                    </CustomHeader>

                    <SearchField>
                        <FormControl variant="outlined">
                            <InputLabel id="select-outlined-label-options">Categoria do Material</InputLabel>
                            <Select
                                required
                                labelId="select-outlined-label-options"
                                disabled={!isAdm && !materialPage.Viewer}
                                value={filter?.categoryCode}
                                onChange={(e) => {
                                    setFilter({ ...filter, categoryCode: e.target.value })
                                }}
                                label="Categoria do Material"
                            >
                                <MenuItem value={""} selected={filter?.categoryCode === ''}>Selecionar</MenuItem>
                                {
                                    options?.length > 0 && (
                                        options?.map(elem => (
                                            <MenuItem
                                                value={elem.code}>{elem.description}</MenuItem>
                                        ))
                                    )
                                }
                            </Select>
                        </FormControl>

                        <IconButtons src={searchIcon}
                            onClick={() => {
                                paginatedItensByCategory(filter, currentPage, itensPerPage)
                            }}
                        />

                        <ClearButton
                            onClick={() => {
                                setFilter(defaultFilter)
                                setCurrentPage(1)
                                paginatedItensByCategory(defaultFilter, currentPage, itensPerPage)
                            }
                            }>
                            Limpar
                        </ClearButton>
                    </SearchField>
                </CustomHeader>

                {
                    loadingList ?
                        <ListSkeleton /> :
                        <React.Fragment>
                            {
                                responseList?.totalItens > 0 ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseList?.itensList?.length}
                                            total={responseList?.totalItens}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)
                                                paginatedItensByCategory(filter, currentPage, itensPerPage)
                                            }}
                                        />

                                        {responseList?.itensList.map(item => (
                                            <CategoryCard
                                                item={item}
                                                key={item._id}
                                                handleReloadPageList={(reload) => { handleReloadPage(reload) }}
                                            />
                                        ))
                                        }

                                        {responseList?.totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={responseList?.totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </React.Fragment>
                                    : <CustomResponse>
                                        <Typography>
                                            Não existem itens cadastrados ou não foi possível encontrar nenhum item, para a categoria informada.
                                        </Typography>
                                    </CustomResponse>
                            }
                        </React.Fragment>
                }
            </CustomPaper>

            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={handleCloseToast}
            />
        </React.Fragment>
    )
}