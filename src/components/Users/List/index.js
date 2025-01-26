import React, { useState, useEffect } from 'react'
import {
    CustomHeader, CustomPaper, CustomTitlePaper, IconButtons,
    SearchField, ClearButton, AddButton, CustomResponse, CustomPaginator,
} from './styles'
import searchIcon from '../../../assets/search_icon.svg'
import { UserListSkeleton } from './skeleton'
import { UserCard } from '../Card/card'
import api from '../../../services/api'
import { TextField, Typography } from '@mui/material'
import { CustomToast } from '../../Toast'
import { ModalAddUser } from '../ModalAddUser'
import { useAuth } from '../../../context/AuthContext'
import { PageControl } from '../../PageControl'
import { CustomBackdrop } from '../../CustomBackrop'

export const UserList = () => {
    const [itensPerPage, setItensPerPage] = useState(5)
    const [openToast, setOpenToast] = useState(false)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState('')
    const [responseUserList, setResponseUserList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const { isAdm, userPage } = useAuth()

    const handleOpenAddModal = () => { setOpenAddModal(true) }
    const handleCloseAddModal = () => { setOpenAddModal(false) }
    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload) => {
        if (reload) {
            setCurrentPage(1)
            getUserList(1, itensPerPage)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        if (filter === '')
            getUserList(value, itensPerPage)
        else
            getUserListByName(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function getUserList(pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedUserList(pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseUserList({
                totalUsers: response.total,
                totalPages: response.pages,
                userList: response.users
            })
        }
        else {
            setCurrentPage(1)
            setResponseUserList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    async function getUserListByName(name, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedUserListByName(name, pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseUserList({
                totalUsers: response.total,
                totalPages: response.pages,
                userList: response.users
            })
        }
        else {
            setCurrentPage(1)
            setResponseUserList({})
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    useEffect(() => {
        getUserList(currentPage, itensPerPage)
    }, [])

    return (
        <React.Fragment>
            <CustomBackdrop open={loadingList} />

            <CustomTitlePaper>
                <Typography>
                    Usuários
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

                        <IconButtons
                            src={searchIcon}
                            onClick={() => {
                                setCurrentPage(1)
                                getUserListByName(filter, 1, itensPerPage)
                            }}
                        />
                        <ClearButton
                            onClick={() => {
                                setFilter('')
                                setCurrentPage(1)
                                getUserList(1, itensPerPage)
                            }
                            }>
                            Limpar
                        </ClearButton>
                    </SearchField>

                    {
                        (isAdm || userPage.Creator) && (
                            <AddButton onClick={handleOpenAddModal}>
                                Cadastrar
                            </AddButton>
                        )
                    }
                </CustomHeader>

                {
                    loadingList ?
                        <UserListSkeleton /> :
                        <React.Fragment>
                            {
                                (responseUserList && responseUserList.totalUsers > 0) ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseUserList?.userList?.length}
                                            total={responseUserList?.totalUsers}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)

                                                filter === '' ? getUserList(1, itensPerPage) : getUserListByName(filter, 1, itensPerPage)
                                            }}
                                        />


                                        {responseUserList?.userList?.map(user => (
                                            <UserCard
                                                user={user}
                                                key={user._id}
                                                handleReloadPage={handleReloadPage}
                                            />
                                        ))
                                        }

                                        {responseUserList.totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={responseUserList.totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </React.Fragment>
                                    : <CustomResponse>
                                        <Typography>
                                            Usuário não encontrado. Verifique o nome informado e tente novamente
                                        </Typography>
                                    </CustomResponse>
                            }
                        </React.Fragment>
                }
            </CustomPaper>

            <ModalAddUser
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