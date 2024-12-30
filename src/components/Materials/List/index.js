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

export const MaterialList = () => {
    const [itensPerPage, setItensPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState({})
    const [optionsType, setOptionsType] = useState([])
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

    async function getOptions() {
        setLoadingList(true)

        const types = await api.GetMaterialTypeOptions()
        setOptionsType(types.options)

        const materialCodes = await api.GetMaterialCodeOptions()
        setOptionsMaterialCode(materialCodes.options)

        setLoadingList(false)
    }

    useEffect(() => {
        paginatedMaterialListByFilter(filter, currentPage, itensPerPage)
        getOptions()
    }, [])


    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    Controle de Estoque
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <CustomHeader>
                    {
                        isAdm && (
                            <SearchField>
                                <TextField
                                    id="outlined-required-materialNAme"
                                    label="Material"
                                    placeholder="digite o material"
                                    value={filter?.material}
                                    onChange={(e) => {
                                        setFilter({ ...filter, material: e.target.value })
                                    }}
                                />

                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-codemat">Código do Material</InputLabel>
                                    <Select
                                        labelId="select-outlined-label-codemat"
                                        value={filter?.materialCode}
                                        onChange={(e) => {
                                            setFilter({ ...filter, materialCode: e.target.value })
                                        }}
                                        label="Código do Material"
                                    >
                                        <MenuItem value={""} selected><en>Selecionar</en></MenuItem>
                                        {
                                            optionsMaterialCode.length > 0 && (
                                                optionsMaterialCode.map(elem => (
                                                    <MenuItem value={elem}>{elem}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-type">Tipo</InputLabel>
                                    <Select
                                        labelId="select-outlined-label-type"
                                        value={filter?.type}
                                        onChange={(e) => {
                                            setFilter({ ...filter, type: e.target.value })
                                        }}
                                        label="Tipo"
                                    >
                                        <MenuItem value={""} selected><en>Selecionar</en></MenuItem>
                                        {
                                            optionsType.length > 0 && (
                                                optionsType.map(elem => (
                                                    <MenuItem value={elem}>{elem}</MenuItem>
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
                                        setFilter(null)
                                        setCurrentPage(1)
                                        paginatedMaterialListByFilter(filter, currentPage, itensPerPage)
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
                                responseMaterialList?.totalMaterial > 0 ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseMaterialList?.materialList?.length}
                                            total={responseMaterialList?.totalMaterial}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)
                                                paginatedMaterialListByFilter(filter, currentPage, itensPerPage)
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