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
import { NFCard } from '../Card/card'
import { Box, TextField, Typography } from '@mui/material'
import { SaveButton } from '../Card/styles'
import { useParams } from 'react-router-dom'
import { CustomToast } from '../../../../Toast'
import api from '../../../../../services/api'
import { useAuth } from '../../../../../context/AuthContext'
import { DateInput } from '../../../../DateInput'
import { PageControl } from '../../../../PageControl'


export const ClientNFList = () => {
    const { clientId } = useParams()

    const defaultForm = {
        number: '',
        value: '',
        date: null,
        serviceOrder: '',
        obs: '',
        clientId: clientId
    }

    const ITENS_PER_PERGE = 10
    const [itensPerPage, setItensPerPage] = useState(5)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [form, setForm] = useState(defaultForm)
    const [openToast, setOpenToast] = useState(false)
    const [responseNFList, setResponseNFList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm, clientPage } = useAuth()

    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload, sequenceRequest = false) => {
        if (reload) {
            setForm(defaultForm)
            paginatedNFListByClient(clientId, 1, ITENS_PER_PERGE, sequenceRequest)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
        paginatedNFListByClient(clientId, value, ITENS_PER_PERGE)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function paginatedNFListByClient(clientId, pageNumber, rowsPage, sequenceRequest = false) {
        setLoadingList(true)

        const response = await api.PaginatedNFListByClient(clientId, pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseNFList({
                totalNfs: response.total,
                totalPages: response.pages,
                nfList: response.nfs
            })
        }
        else {
            setCurrentPage(1)
            setResponseNFList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast((response.success && sequenceRequest) || !response.success)
    }

    async function createNF() {
        setDisableButton(true)

        const response = await api.CreateNFByClientClient(form)

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

    useEffect(() => {
        paginatedNFListByClient(clientId, 1, ITENS_PER_PERGE)
    }, [])

    return (
        <React.Fragment>
            <CustomPaper>
                <CustomHeader>
                    <Typography id="title" variant="h6" component="h2">
                        Notas Ficas Eletrônicas
                    </Typography>
                </CustomHeader>
                <CustomModalBody>
                    {
                        (isAdm || clientPage.Editor) && (
                            <Box
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'row'}
                            >
                                <TextField
                                    required
                                    id="outlined-required-number"
                                    label="Número da NFSe"
                                    placeholder="digite o número da NFSe"
                                    value={form.number}
                                    onChange={(e) => {
                                        setForm({ ...form, number: e.target.value })
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required-vlue"
                                    label="Valor"
                                    placeholder="digite o valor da NFSe"
                                    value={form.value}
                                    onChange={(e) => {
                                        setForm({ ...form, value: e.target.value.replace(/[^\d.,]/g, '') })
                                    }}
                                />

                                <DateInput
                                    label='Data de Emissão*'
                                    selectedDate={form.date}
                                    disableFuture={true}
                                    valueCallback={(newDate) => {
                                        setForm({ ...form, date: newDate })
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-serviceOrder"
                                    label="Ordem de Serviço"
                                    placeholder="digite a ordem de serviço"
                                    value={form.serviceOrder}
                                    onChange={(e) => {
                                        setForm({ ...form, serviceOrder: e.target.value })
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-required-obs"
                                    label="Observações"
                                    value={form.obs}
                                    onChange={(e) => {
                                        setForm({ ...form, obs: e.target.value })
                                    }}
                                />

                                <ClearButton
                                    onClick={() => { setForm(defaultForm) }}>
                                    Limpar
                                </ClearButton>

                                <SaveButton
                                    onClick={() => { createNF() }}
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
                                responseNFList.totalNfs > 0 ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseNFList?.nfList?.length}
                                            total={responseNFList?.totalNfs}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)
                                                paginatedNFListByClient(clientId, 1, itensPerPage)
                                            }}
                                        />

                                        {responseNFList.nfList.map(item => (
                                            <NFCard
                                                NFe={item}
                                                key={item._id}
                                                handleReloadPage={(reload) => handleReloadPage(reload)}
                                            />
                                        ))
                                        }

                                        {responseNFList.totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={responseNFList.totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </React.Fragment>
                                    : <CustomResponse>
                                        <Typography>
                                            Não há NFSEs emitidas para este cliente.
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