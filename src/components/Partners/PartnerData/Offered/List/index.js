import React, { useState, useEffect } from 'react'
import {
    CustomHeader,
    CustomPaper,
    CustomResponse,
    CustomPaginator,
    CustomModalBody,
    ClearButton
} from './styles'
import { ListSkeleton } from './skeleton'
import { OfferedCard } from '../Card/card'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { SaveButton } from '../Card/styles'
import { useLocation, useParams } from 'react-router-dom'
import { CustomToast } from '../../../../Toast'
import api from '../../../../../services/api'
import { useAuth } from '../../../../../context/AuthContext'
import { PageControl } from '../../../../PageControl'

export const OfferedList = () => {
    const { partnerId } = useParams()
    const location = useLocation()
    const dynamicOffered = location.state?.isSupplier ? 'Produtos Fornecidos' : 'Serviços Oferecidos'
    const partnerType = location.state?.isSupplier ? 'Fornecedor' : 'Terceiro / Prestador de serviço'

    const defaultForm = {
        name: '',
        value: '',
        observation: '',
        partnerId: partnerId
    }

    const [itensPerPage, setItensPerPage] = useState(5)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [form, setForm] = useState(defaultForm)
    const [openToast, setOpenToast] = useState(false)
    const [responseOfferedList, setResponseOfferedList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [disableButton, setDisableButton] = useState(false)
    const [options, setOptions] = useState([])
    const { isAdm, partnerPage } = useAuth()

    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload, sequenceRequest = false) => {
        if (reload) {
            setForm(defaultForm)
            paginatedOfferedList(partnerId, 1, itensPerPage, sequenceRequest)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
        paginatedOfferedList(partnerId, value, itensPerPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function paginatedOfferedList(partnerId, pageNumber, rowsPage, sequenceRequest = false) {
        setLoadingList(true)

        const response = await api.PaginatedOfferedList(partnerId, pageNumber, rowsPage)
        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseOfferedList({
                totalOffered: response.total,
                totalPages: response.pages,
                offeredList: response.offered
            })
        }
        else {
            setCurrentPage(1)
            setResponseOfferedList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast((response.success && sequenceRequest) || !response.success)
    }

    async function createOffered() {
        setDisableButton(true)

        const response = await api.CreateOffered(form)

        if (response.success) {
            setTimeout(() => {
                handleReloadPage(true, true)
            }, 3000)
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })
        setOpenToast(true)
        setDisableButton(false)
    }

    async function getProductOrServiceNameOptions(partnerId) {
        const partner = await api.GetPartnerById(partnerId)
        const categories = partner?.partner?.categories

        let partnerCategories = !categories?.includes(";") ? [categories] :
            categories?.split(";").map(categoryCode => parseInt(categoryCode))

        const response = await api.GetAllItensByCategory(partnerCategories)
        setOptions(response.itens)
    }

    useEffect(() => {
        if (partnerId) {
            paginatedOfferedList(partnerId, 1, itensPerPage)
            getProductOrServiceNameOptions(partnerId)
        }
    }, [partnerId])

    return (
        <React.Fragment>
            <CustomPaper>
                <CustomHeader>
                    <Typography id="title" variant="h6" component="h2">
                        {dynamicOffered}
                    </Typography>
                </CustomHeader>
                <CustomModalBody>
                    {
                        (isAdm || partnerPage.Editor) && (
                            <Box
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'row'}
                            >
                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-item-options">Nome do produto ou serviço</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-item-options"
                                        value={form?.name}
                                        onChange={(e) => {
                                            setForm({ ...form, name: e.target.value })
                                        }}
                                        label="Nome do produto ou serviço"
                                    >
                                        {
                                            options?.length > 0 && (
                                                options?.map(elem => (
                                                    <MenuItem
                                                        value={elem.name}>{elem.itemCode} - {elem.name}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <TextField
                                    required
                                    id="outlined-required-value"
                                    label="Valor"
                                    placeholder="digite o valor do produto ou serviço"
                                    value={form.value}
                                    onChange={(e) => {
                                        setForm({ ...form, value: e.target.value.replace(/[^\d.,]/g, '') })
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-observation"
                                    label="Observações"
                                    value={form.observation}
                                    onChange={(e) => {
                                        setForm({ ...form, observation: e.target.value })
                                    }}
                                />

                                <ClearButton
                                    onClick={() => { setForm(defaultForm) }}>
                                    Limpar
                                </ClearButton>

                                <SaveButton
                                    onClick={() => { createOffered() }}
                                    disabled={disableButton}
                                >
                                    Salvar
                                </SaveButton>
                            </Box>
                        )
                    }
                </CustomModalBody>

                {
                    loadingList ?
                        <ListSkeleton /> :
                        <React.Fragment>
                            {
                                responseOfferedList.totalOffered > 0 ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseOfferedList?.offeredList?.length}
                                            total={responseOfferedList?.totalOffered}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)
                                                paginatedOfferedList(partnerId, 1, itensPerPage)
                                            }}
                                        />

                                        {responseOfferedList.offeredList?.map(item => (
                                            <OfferedCard
                                                Offered={item}
                                                key={item._id}
                                                handleReloadPage={(reload) => handleReloadPage(reload)}
                                            />
                                        ))
                                        }

                                        {responseOfferedList.totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={responseOfferedList.totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </React.Fragment>
                                    : <CustomResponse>
                                        <Typography>
                                            Não há {dynamicOffered} registrados para este {partnerType}.
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