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
import { ContactCard } from '../Card/card'
import { Box, TextField, Typography } from '@mui/material'
import { SaveButton } from '../Card/styles'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { CustomToast } from '../../../../Toast'
import api from '../../../../../services/api'
import { formatCellphone, formatPhone } from '../../../../../utils'
import { useAuth } from '../../../../../context/AuthContext'
import { PageControl } from '../../../../PageControl'

export const ContactsList = () => {
    const { partnerId } = useParams()
    const location = useLocation()
    const partnerType = location.state?.isSupplier ? 'Fornecedor' : 'Terceiro / Prestador de serviço'

    const defaultForm = {
        name: '',
        position: '',
        cellphone: '',
        telephone: '',
        email: '',
        personId: partnerId
    }

    const [itensPerPage, setItensPerPage] = useState(5)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [form, setForm] = useState(defaultForm)
    const [openToast, setOpenToast] = useState(false)
    const [responseContactList, setResponseContactList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [disableButton, setDisableButton] = useState(false)
    const { isAdm, partnerPage } = useAuth()

    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload, sequenceRequest = false) => {
        if (reload) {
            setForm(defaultForm)
            paginatedContactListByPerson(partnerId, 1, itensPerPage, sequenceRequest)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
        paginatedContactListByPerson(partnerId, value, itensPerPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function paginatedContactListByPerson(personId, pageNumber, rowsPage, sequenceRequest = false) {
        setLoadingList(true)

        const response = await api.PaginatedContactListByPerson(personId, pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseContactList({
                totalContacts: response.total,
                totalPages: response.pages,
                contactList: response.contacts
            })
        }
        else {
            setCurrentPage(1)
            setResponseContactList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast((response.success && sequenceRequest) || !response.success)
    }

    async function createContact() {
        setDisableButton(true)

        const response = await api.CreateContact(form)

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
        paginatedContactListByPerson(partnerId, 1, itensPerPage)
    }, [])

    return (
        <React.Fragment>
            <CustomPaper>
                <CustomHeader>
                    <Typography id="title" variant="h6" component="h2">
                        Contatos do {partnerType}
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
                                <TextField
                                    required
                                    id="outlined-required-name"
                                    label="Nome"
                                    placeholder="digite o nome do contato"
                                    value={form.name}
                                    onChange={(e) => {
                                        setForm({ ...form, name: e.target.value })
                                    }}
                                />


                                <TextField
                                    fullWidth
                                    id="outlined-required-position"
                                    label="Cargo / Setor"
                                    placeholder="digite o cargo/setor do contato"
                                    value={form.position}
                                    onChange={(e) => {
                                        setForm({ ...form, position: e.target.value })
                                    }}
                                />

                                <TextField
                                    id="outlined-required-phone"
                                    label="Telefone"
                                    placeholder="digite o telefone do contato"
                                    value={form.telephone}
                                    onChange={(e) => {
                                        setForm({ ...form, telephone: formatPhone(e.target.value) })
                                    }}
                                />

                                <TextField
                                    id="outlined-required-cellphone"
                                    label="Celular"
                                    placeholder="digite o celular do contato"
                                    value={form.cellphone}
                                    onChange={(e) => {
                                        setForm({ ...form, cellphone: formatCellphone(e.target.value) })
                                    }}
                                />

                                <TextField
                                    id="outlined-required-email"
                                    label="E-mail"
                                    value={form.email}
                                    onChange={(e) => {
                                        setForm({ ...form, email: e.target.value })
                                    }}
                                />

                                <ClearButton
                                    onClick={() => { setForm(defaultForm) }}>
                                    Limpar
                                </ClearButton>

                                <SaveButton
                                    onClick={() => { createContact() }}
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
                                responseContactList.totalContacts > 0 ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseContactList?.contactList?.length}
                                            total={responseContactList?.totalContacts}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)
                                                paginatedContactListByPerson(partnerId, 1, itensPerPage)
                                            }}
                                        />

                                        {responseContactList.contactList.map(item => (
                                            <ContactCard
                                                contact={item}
                                                key={item._id}
                                                handleReloadPage={(reload) => handleReloadPage(reload)}
                                            />
                                        ))
                                        }

                                        {responseContactList.totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={responseContactList.totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </React.Fragment>
                                    : <CustomResponse>
                                        <Typography>
                                            Não há Contatos para este {partnerType}.
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