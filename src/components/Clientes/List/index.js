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
import { ClientCard } from '../Card/card'
import api from '../../../services/api'
import { TextField, Typography } from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import { ModalAddClient } from '../ModalAddClient'
import { CustomToast } from '../../Toast'
import { PageControl } from '../../PageControl'

export const ClientList = () => {
    const [itensPerPage, setItensPerPage] = useState(5)
    const [openToast, setOpenToast] = useState(false)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState('')
    const [responseClientList, setResponseClientList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const { isAdm, clientPage } = useAuth()

    const handleOpenAddModal = () => { setOpenAddModal(true) }
    const handleCloseAddModal = () => { setOpenAddModal(false) }
    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload) => {
        if (reload) {
            setCurrentPage(1)
            getClientList(1, itensPerPage)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        if (filter === '')
            getClientList(value, itensPerPage)
        else
            getClientListByName(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function getClientList(pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedClientList(pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseClientList({
                totalClients: response.total,
                totalPages: response.pages,
                clientList: response.clients
            })
        }
        else {
            setCurrentPage(1)
            setResponseClientList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    async function getClientListByName(name, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedClientListByName(name, pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseClientList({
                totalClients: response.total,
                totalPages: response.pages,
                clientList: response.clients
            })
        }
        else {
            setCurrentPage(1)
            setResponseClientList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    useEffect(() => {
        getClientList(currentPage, itensPerPage)
    }, [])

    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    Clientes
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <CustomHeader>
                    <SearchField>
                        <TextField
                            required
                            id="outlined-required-name"
                            label="Nome"
                            placeholder="digite o nome do cliente"
                            value={filter}
                            onChange={(e) => { setFilter(e.target.value) }}
                        />

                        <IconButtons src={searchIcon}
                            onClick={() => {
                                setCurrentPage(1)
                                getClientListByName(filter, 1, itensPerPage)
                            }}
                        />
                        <ClearButton
                            onClick={() => {
                                setFilter('')
                                setCurrentPage(1)
                                getClientList(1, itensPerPage)
                            }
                            }>
                            Limpar
                        </ClearButton>
                    </SearchField>

                    {
                        (isAdm || clientPage.Creator) && (
                            <AddButton onClick={handleOpenAddModal}>
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
                                (responseClientList && responseClientList.totalClients > 0) ?
                                    (
                                        <React.Fragment>
                                            <PageControl
                                                itens={responseClientList?.clientList?.length}
                                                total={responseClientList?.totalClients}
                                                cacheItensPerPage={itensPerPage}
                                                handleOnChange={(newValue) => setItensPerPage(newValue)}
                                                handleOnClick={() => {
                                                    setCurrentPage(1)

                                                    filter === '' ? getClientList(1, itensPerPage) : getClientListByName(filter, 1, itensPerPage)
                                                }}
                                            />

                                            {responseClientList.clientList.map(client => (
                                                <ClientCard
                                                    client={client}
                                                    key={client._id}
                                                    handleReloadPage={handleReloadPage}
                                                />
                                            ))
                                            }

                                            {responseClientList.totalPages > 1 && (



                                                <CustomPaginator
                                                    boundaryCount={0}
                                                    count={responseClientList.totalPages}
                                                    page={currentPage}
                                                    size='large'
                                                    showFirstButton
                                                    showLastButton
                                                    onChange={handleChangePage} />
                                            )}
                                        </React.Fragment>
                                    ) : (
                                        <CustomResponse>
                                            <Typography>
                                                Cliente não encontrado. Verifique o nome informado e tente novamente
                                            </Typography>
                                        </CustomResponse>
                                    )
                            }
                        </React.Fragment>
                }
            </CustomPaper>

            <ModalAddClient
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