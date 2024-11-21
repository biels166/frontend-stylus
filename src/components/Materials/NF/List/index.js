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
//import searchIcon from '../../../assets/search_icon.svg'
//import closeIcon from '../../../assets/close_icon.svg'
import { ListSkeleton } from './skeleton'
import { NFCard } from '../Card/card'
import api from '../../../../services/api'
import { Alert, Box, MenuItem, Modal, Pagination, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { SaveButton } from '../Card/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';


export const NFList = ({ clientId }) => {
    const ITENS_PER_PERGE = 5
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItens, setTotalItens] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [number, setNumber] = useState('')
    const [value, setValue] = useState('')
    const [dateNF, setNFDate] = useState('')
    const [serviceOrder, setServiceOrder] = useState('')
    const [obs, setObs] = useState('')

    const [nfList, setNFList] = useState([])

    const handleReloadPage = (reload) => {
        if (reload) {
            list(1)
        }
    }

    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        list(value)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function list(pageNumber) {
        setLoadingList(true)
        await api.get(`/nf/list/${clientId}`)
            .then(
                response => {
                    let total = response.data.length
                    let pages = Math.ceil(total / ITENS_PER_PERGE)
                    let skip = (pageNumber - 1) * ITENS_PER_PERGE
                    let take = skip + ITENS_PER_PERGE
                    let filtered = response.data.slice(skip, take)

                    if (pageNumber === 1) setCurrentPage(1)
                    setNFList(filtered)
                    setTotalItens(total)
                    setTotalPages(pages)
                    setLoadingList(false)
                }
            ).catch(erro => {
                console.log(erro)
                setNFList([])
                setTotalItens(0)
                setTotalPages(0)
                setLoadingList(false)
            })
    }

    async function registerNF() {
        let date = dateNF.split("/")
        let novadata = new Date(date[2], date[1] - 1, date[0])

        console.log(novadata)

        let body = {
            number: `${number}`,
            value: `${value.replace(",", ".")}`,
            date: `${novadata}`,
            obs: `${obs}`,
            serviceOrder: `${serviceOrder}`,
            clientId: `${clientId}`
        }

        await api.post(`/nf`, body)
            .then(
                response => {
                    list(1)
                    setNumber('')
                    setValue(0)
                    setNFDate('')
                    setServiceOrder('')
                    setObs('')
                }
            ).catch(erro => {
                console.log(erro.response.data.error)
            })
    }

    useEffect(() => {
        list(1)
    }, [])

    return (
        <>
            <CustomPaper>
                <CustomModalBody>
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
                            value={number}
                            onChange={(e) => {
                                let newValue = e.target.value
                                setNumber(newValue)
                            }}
                        />


                        <TextField
                            fullWidth
                            required
                            id="outlined-required-vlue"
                            label="Valor"
                            placeholder="digite o valor da NFSe"
                            value={value}
                            onChange={(e) => {
                                let newValue = e.target.value.replace(/[^\d.,]/g, '')
                                setValue(newValue)
                            }}
                        />

                        <TextField
                            required
                            id="outlined-required-date"
                            label="Data de Emissão"
                            placeholder="DD/MM/AAAA"
                            value={dateNF}
                            onChange={(e) => {
                                let newValue = e.target.value.replace(/[^\d/]/g, '');
                                setNFDate(newValue)
                            }}
                        />

                        <TextField
                            required
                            id="outlined-required-serviceOrder"
                            label="Ordem de Serviço"
                            placeholder="digite a ordem de serviço"
                            value={serviceOrder}
                            onChange={(e) => {
                                let newValue = e.target.value
                                setServiceOrder(newValue)
                            }}
                        />

                        <TextField
                            required
                            id="outlined-required-obs"
                            label="Observações"
                            value={obs}
                            onChange={(e) => {
                                let newValue = e.target.value
                                setObs(newValue)
                            }}
                        />

                        <SaveButton
                            onClick={() => {
                                registerNF()
                            }}
                        >
                            Salvar
                        </SaveButton>
                    </Box>

                </CustomModalBody>
                {
                    loadingList ?
                        <ListSkeleton /> :
                        <div>
                            {
                                totalItens > 0 ?
                                    <>
                                        {nfList.map(item => (
                                            <NFCard
                                                numberInput={item.number}
                                                dateInput={item.date}
                                                valueInput={item.value}
                                                obsInput={item.obs}
                                                OSInput={item.serviceOrder}
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
                                            Não há NFs emitidas para este cliente.
                                        </Typography>
                                    </CustomResponse>
                            }
                        </div>
                }
            </CustomPaper>
        </>
    )
}