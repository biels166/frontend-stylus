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

export const ClientList = () => {
    const ITENS_PER_PERGE = 6
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
            getClientList(1, ITENS_PER_PERGE)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        if (filter === '')
            getClientList(value, ITENS_PER_PERGE)
        else
            getClientListByName(filter, value, ITENS_PER_PERGE)

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
        getClientList(currentPage, ITENS_PER_PERGE)
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
                            placeholder="digite o nome do usuário"
                            value={filter}
                            onChange={(e) => { setFilter(e.target.value) }}
                        />

                        <IconButtons src={searchIcon}
                            onClick={() => {
                                setCurrentPage(1)
                                getClientListByName(filter, 1, ITENS_PER_PERGE)
                            }}
                        />
                        <ClearButton
                            onClick={() => {
                                setFilter('')
                                setCurrentPage(1)
                                getClientList(1, ITENS_PER_PERGE)
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