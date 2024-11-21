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
import searchIcon from '../../../assets/search_icon.svg'
import closeIcon from '../../../assets/close_icon.svg'
import { UserListSkeleton } from './skeleton'
import { UserCard } from '../Card/card'
import api from '../../../services/api'
import { Alert, Box, Modal, Pagination, Paper, Snackbar, TextField, Typography } from '@mui/material'

export const UserList = () => {
    const ITENS_PER_PERGE = 3
    const [openToast, setOpenToast] = useState(false)
    const [registerStatus, setRegisterStatus] = useState('')
    const [registerInfo, setRegisterInfo] = useState('')
    const [openAddModal, setOpenAddModal] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [filter, setFilter] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [roles, setRoles] = useState('')
    const [userList, setUserList] = useState([])

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
            getUserByName(filter, value)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCloseAddModal = () => {
        setOpenAddModal(false)
    }

    const handleCloseToast = () => {
        setOpenToast(false)
    }

    async function list(pageNumber) {
        setLoadingList(true)
        await api.get('/user/list')
            .then(
                response => {
                    let total = response.data.length
                    let pages = Math.ceil(total / ITENS_PER_PERGE)
                    let skip = (pageNumber - 1) * ITENS_PER_PERGE
                    let take = skip + ITENS_PER_PERGE
                    let filtered = response.data.slice(skip, take)

                    if (pageNumber === 1) setCurrentPage(1)
                    setUserList(filtered)
                    setTotalUsers(total)
                    setTotalPages(pages)
                    setLoadingList(false)
                }
            ).catch(erro => {
                console.log(erro)
                setUserList([])
                setTotalUsers(0)
                setTotalPages(0)
                setLoadingList(false)
            })
    }

    async function getUserByName(name, pageNumber) {
        setLoadingList(true)

        await api.get(`/user/filter/name/${name}`)
            .then(
                response => {
                    let total = response.data.length
                    let pages = Math.ceil(total / ITENS_PER_PERGE)
                    let skip = (pageNumber - 1) * ITENS_PER_PERGE
                    let take = skip + ITENS_PER_PERGE
                    let filtered = response.data.slice(skip, take)
                    if (pageNumber === 1) setCurrentPage(1)
                    setUserList(filtered)
                    setTotalUsers(total)
                    setTotalPages(pages)
                    setLoadingList(false)
                }
            ).catch(erro => {
                console.log(erro)
                setUserList([])
                setTotalUsers(0)
                setTotalPages(0)
                setLoadingList(false)
            })
    }

    async function registerUSer() {
        let body = {
            name: `${name}`,
            user: `${login}`,
            email: `${email}`,
            password: `${password}`,
            roles: `${roles}`
        }

        await api.post(`/user`, body)
            .then(
                response => {
                    setRegisterStatus('success')
                    setRegisterInfo('Usuário cadastrado com sucesso')
                    setOpenToast(true)
                    list(1)
                    setOpenAddModal(false)
                    setDisableButton(false)
                    setName('')
                    setEmail('')
                    setPassword('')
                    setRoles('')
                    setLogin('')
                }
            ).catch(erro => {
                setDisableButton(false)
                setRegisterStatus('error')
                setRegisterInfo(erro.response.data.error)
                setOpenToast(true)
            })
    }

    useEffect(() => {
        list(1)
    }, [])

    return (
        <>
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
                            onChange={(e) => {
                                let searchValue = e.target.value
                                setFilter(searchValue)
                            }}
                        />

                        <IconButtons src={searchIcon}
                            onClick={() => {

                                getUserByName(filter, 1)
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
                        <UserListSkeleton /> :
                        <div>
                            {
                                totalUsers > 0 ?
                                    <>
                                        {userList.map(item => (
                                            <UserCard
                                                nameInput={item.name}
                                                emailInput={item.email}
                                                loginInput={item.user}
                                                rolesInput={item.roles}
                                                passwordInput={item.password}
                                                _id={item._id}
                                                key={item._id}
                                                handleReloadPage={handleReloadPage}
                                            />
                                        ))
                                        }

                                        {totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </>
                                    : <CustomResponse>
                                        <Typography>
                                            Usuário não encontrado. Verifique o nome informado e tente novamente
                                        </Typography>
                                    </CustomResponse>
                            }
                        </div>
                }
            </CustomPaper>

            <div>
                <Modal
                    open={openAddModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CustomModalPaper>
                        <CustomModalHeader>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Cadastrar Novo Usuário
                            </Typography>

                            <CloseIcon src={closeIcon}
                                onClick={handleCloseAddModal}
                            />
                        </CustomModalHeader>

                        <Box>
                            <CustomModalBody>
                                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                    <TextField
                                        required
                                        id="outlined-required-name"
                                        label="Nome"
                                        placeholder="digite o nome do usuário"
                                        value={name}
                                        onChange={(e) => {
                                            let newName = e.target.value
                                            setName(newName)
                                        }}
                                    />

                                    <TextField
                                        type='password'
                                        required
                                        id="outlined-required-password"
                                        label="Senha"
                                        placeholder="digite a senha do usuário"
                                        value={password}
                                        onChange={(e) => {
                                            let newPass = e.target.value
                                            setPassword(newPass)
                                        }}
                                    />
                                </Box>
                                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
                                    <TextField
                                        required
                                        id="outlined-required-email"
                                        label="E-mail"
                                        placeholder="digite o email do usuário"
                                        value={email}
                                        onChange={(e) => {
                                            let newEmail = e.target.value
                                            setEmail(newEmail)
                                        }}
                                    />

                                    <TextField
                                        required
                                        id="outlined-required-login"
                                        label="Login"
                                        placeholder="digite o login do usuário"
                                        value={login}
                                        onChange={(e) => {
                                            let newLogin = e.target.value
                                            setLogin(newLogin)
                                        }}
                                    />
                                </Box>

                                <TextField
                                    fullWidth={true}
                                    id="outlined-required-roles"
                                    label="Permissões"
                                    placeholder="digite as permissões do usuário"
                                    value={roles}
                                    onChange={(e) => {
                                        let newRoles = e.target.value
                                        setRoles(newRoles)
                                    }}
                                />
                            </CustomModalBody>

                            <CustomModalFooter>
                                <RegisterNewUserButton
                                    disabled={disableButton}
                                    onClick={() => {
                                        setDisableButton(true)
                                        registerUSer()
                                    }}
                                >
                                    Salvar
                                </RegisterNewUserButton>
                            </CustomModalFooter>
                        </Box>

                    </CustomModalPaper>
                </Modal>
            </div>

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
        </>
    )
}