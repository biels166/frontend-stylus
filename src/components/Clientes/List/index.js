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
import { ListSkeleton } from './skeleton'
import { ClientCard } from '../Card/card'
import api from '../../../services/api'
import { Alert, Box, MenuItem, Modal, Pagination, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { UFS } from '../../../constants/UFS'

export const ClientList = () => {
    const ITENS_PER_PERGE = 2
    const [openToast, setOpenToast] = useState(false)
    const [registerStatus, setRegisterStatus] = useState('')
    const [registerInfo, setRegisterInfo] = useState('')
    const [openAddModal, setOpenAddModal] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItens, setTotalItens] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [filter, setFilter] = useState('')
    const [name, setName] = useState('')
    const [document, setDocument] = useState('')
    const [email, setEmail] = useState('')
    const [cellPhone, setCellPhone] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [clientList, setClientList] = useState([])

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
            getClientByName(filter, value)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCloseAddModal = () => {
        setOpenAddModal(false)
    }

    const handleCloseToast = () => {
        setOpenToast(false)
    }

    const formatDocument = (documentNumber) => {

        let doc = documentNumber.replace(/\D/g, '')
        let docType = doc.length === 14 ? 'CNPJ' : 'CPF'

        return docType === 'CPF' ?
            doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            : doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

    }

    const formatCellphone = (cellphone) => {
        let onlyNumber = cellphone.replace(/\D/g, '')

        const regex = /^(\d{2})(\d{5})(\d{4})$/;

        if (onlyNumber.match(regex)) {
            return onlyNumber.replace(regex, '($1) $2-$3')
        }

    }

    const formatPhone = (phoneNumber) => {
        let onlyNumber = phoneNumber.replace(/\D/g, '')

        const regex = /^(\d{2})(\d{4})(\d{4})$/;

        if (onlyNumber.match(regex)) {
            return onlyNumber.replace(regex, '($1) $2-$3')
        }

    }

    async function list(pageNumber) {
        setLoadingList(true)
        await api.get('/client/list')
            .then(
                response => {
                    let total = response.data.length
                    let pages = Math.ceil(total / ITENS_PER_PERGE)
                    let skip = (pageNumber - 1) * ITENS_PER_PERGE
                    let take = skip + ITENS_PER_PERGE
                    let filtered = response.data.slice(skip, take)

                    if (pageNumber === 1) setCurrentPage(1)
                    setClientList(filtered)
                    setTotalItens(total)
                    setTotalPages(pages)
                    setLoadingList(false)
                }
            ).catch(erro => {
                console.log(erro)
                setClientList([])
                setTotalItens(0)
                setTotalPages(0)
                setLoadingList(false)
            })
    }

    async function getClientByName(name, pageNumber) {
        setLoadingList(true)

        await api.get(`/client/filter/name/${name}`)
            .then(
                response => {
                    let total = response.data.length
                    let pages = Math.ceil(total / ITENS_PER_PERGE)
                    let skip = (pageNumber - 1) * ITENS_PER_PERGE
                    let take = skip + ITENS_PER_PERGE
                    let filtered = response.data.slice(skip, take)
                    if (pageNumber === 1) setCurrentPage(1)
                    setClientList(filtered)
                    setTotalItens(total)
                    setTotalPages(pages)
                    setLoadingList(false)
                }
            ).catch(erro => {
                console.log(erro)
                setClientList([])
                setTotalItens(0)
                setTotalPages(0)
                setLoadingList(false)
            })
    }

    async function registerClient() {
        let body = {
            name: `${name}`,
            document: `${document}`,
            email: `${email}`,
            telephone: `${phone}`,
            cellphone: `${cellPhone}`,
            street: `${street}`,
            number: `${number}`,
            complement: `${complement}`,
            district: `${district}`,
            city: `${city}`,
            state: `${state}`
        }

        await api.post(`/client`, body)
            .then(
                response => {
                    setRegisterStatus('success')
                    setRegisterInfo('Cliente cadastrado com sucesso')
                    setOpenToast(true)
                    list(1)
                    setOpenAddModal(false)
                    setDisableButton(false)
                    setName('')
                    setEmail('')
                    setDocument('')
                    setStreet('')
                    setNumber('')
                    setComplement('')
                    setDistrict('')
                    setState('')
                    setCity('')
                    setCellPhone('')
                    setPhone('')
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
                            onChange={(e) => {
                                let searchValue = e.target.value
                                setFilter(searchValue)
                            }}
                        />

                        <IconButtons src={searchIcon}
                            onClick={() => {

                                getClientByName(filter, 1)
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
                        <ListSkeleton /> :
                        <div>
                            {
                                totalItens > 0 ?
                                    <>
                                        {clientList.map(item => (
                                            <ClientCard
                                                nameInput={item.name}
                                                documentInput={item.document}
                                                emailInput={item.email}
                                                phoneInput={item.telephone}
                                                cellphoneInput={item.cellphone}
                                                streetInput={item.street}
                                                numberImput={item.number}
                                                complementInput={item.complement}
                                                districtInput={item.district}
                                                cityInput={item.city}
                                                stateInput={item.state}
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
                                            Cliente não encontrado. Verifique o nome informado e tente novamente
                                        </Typography>
                                    </CustomResponse>
                            }
                        </div>
                }
            </CustomPaper>

            <div >
                <Modal
                    open={openAddModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CustomModalPaper>
                        <CustomModalHeader>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Cadastrar Novo Cliente
                            </Typography>

                            <CloseIcon src={closeIcon}
                                onClick={handleCloseAddModal}
                            />
                        </CustomModalHeader>

                        <Box>
                            <CustomModalBody>
                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    flexDirection={'row'}
                                >
                                    <TextField
                                        required
                                        id="outlined-required-name"
                                        label="Nome"
                                        placeholder="digite o nome do cliente"
                                        value={name}
                                        onChange={(e) => {
                                            let newName = e.target.value
                                            setName(newName)
                                        }}
                                    />

                                    <TextField
                                        required
                                        id="outlined-required-document"
                                        label="Documento"
                                        placeholder="digite o documento do cliente"
                                        value={document}
                                        onChange={(e) => {
                                            let newDoc = formatDocument(e.target.value)
                                            setDocument(newDoc)
                                        }}
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required-email"
                                    label="E-mail"
                                    placeholder="digite o email do cliente"
                                    value={email}
                                    onChange={(e) => {
                                        let newEmail = e.target.value
                                        setEmail(newEmail)
                                    }}
                                />

                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    flexDirection={'row'}
                                >
                                    <TextField
                                        required
                                        id="outlined-required-phone"
                                        label="Telefone"
                                        placeholder="digite o telefone do cliente"
                                        value={phone}
                                        onChange={(e) => {
                                            let newPhone = formatPhone(e.target.value)
                                            setPhone(newPhone)
                                        }}
                                    />

                                    <TextField
                                        required
                                        id="outlined-required-cellphone"
                                        label="Celular"
                                        placeholder="digite o login do cliente"
                                        value={cellPhone}
                                        onChange={(e) => {
                                            let newcell = formatCellphone(e.target.value)
                                            setCellPhone(newcell)
                                        }}
                                    />
                                </Box>

                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-required-street"
                                    label="Logradouro"
                                    placeholder="digite o logradouro do cliente"
                                    value={street}
                                    onChange={(e) => {
                                        let newStreet = e.target.value
                                        setStreet(newStreet)
                                    }}
                                />

                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    flexDirection={'row'}
                                >
                                    <TextField
                                        required
                                        id="outlined-required-number"
                                        label="Número"
                                        placeholder="digite o número do logradouro do cliente"
                                        value={number}
                                        onChange={(e) => {
                                            let newNum = e.target.value
                                            setNumber(newNum)
                                        }}
                                    />

                                    <TextField
                                        required
                                        id="outlined-required-complement"
                                        label="Complemento"
                                        placeholder="digite o compplemento do logradouro do cliente"
                                        value={complement}
                                        onChange={(e) => {
                                            let newComp = e.target.value
                                            setComplement(newComp)
                                        }}
                                    />
                                </Box>

                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    flexDirection={'row'}
                                >
                                    <TextField
                                        required
                                        id="outlined-required-district"
                                        label="Bairro"
                                        placeholder="digite o bairro do logradouro do cliente"
                                        value={district}
                                        onChange={(e) => {
                                            let newDistrict = e.target.value
                                            setDistrict(newDistrict)
                                        }}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required-city"
                                        label="Cidade"
                                        placeholder="digite a cidade do logradouro do cliente"
                                        value={city}
                                        onChange={(e) => {
                                            let newcity = e.target.value
                                            setCity(newcity)
                                        }}
                                    />


                                    <TextField
                                        required
                                        id="outlined-required-state"
                                        label="Estado"
                                        select
                                        placeholder="selecione o estado do logradouro do cliente"
                                        value={state}
                                        onChange={(e) => {
                                            let newState = e.target.value
                                            setState(newState)
                                        }}
                                    >
                                        {UFS.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </CustomModalBody>

                            <CustomModalFooter>
                                <RegisterNewUserButton
                                    disabled={disableButton}
                                    onClick={() => {
                                        setDisableButton(true)
                                        registerClient()
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