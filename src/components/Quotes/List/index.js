import React, { useState, useEffect } from 'react'
import {
    CustomHeader,
    CustomPaper,
    CustomTitlePaper,
    IconButtons,
    SearchField,
    ClearButton,
    CustomResponse,
    CustomPaginator,
    CustomCancelIcon,
    CustomDraftIcon,
    CustomPendingIcon,
    CustomApprovedIcon,
    CustomAllIcon,
} from './styles'
import searchIcon from '../../../assets/search_icon.svg'
import { ListSkeleton } from './skeleton'
import api from '../../../services/api'
import { Badge, TextField, Typography } from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import { CustomToast } from '../../Toast'
import { PageControl } from '../../PageControl'
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { List, ListItem, Radio, RadioGroup } from '@mui/joy'
import { QuoteCard } from '../Card/card'
import { getOnlyNumber } from '../../../utils'
import { CustomBackdrop } from '../../CustomBackrop'

export const QuoteList = () => {
    const defaultFilter = {
        number: '',
        status: 'Todas'
    }

    const filterOptions = [
        {
            icon: <CustomDraftIcon />,
            value: 'Em Rascunho'
        },
        {
            icon: <CustomPendingIcon />,
            value: 'Em Aprovação'
        },
        {
            icon: <CustomApprovedIcon />,
            value: 'Aprovada'
        },
        {
            icon: <CustomCancelIcon />,
            value: 'Cancelada'
        },
        {
            icon: <CustomAllIcon />,
            value: 'Todas'
        },
    ]
    const [filter, setFilter] = useState(defaultFilter)
    const [itensPerPage, setItensPerPage] = useState(5)
    const [openToast, setOpenToast] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [responseQuoteList, setResponseQuoteList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const { isAdm, partnerPage } = useAuth()

    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload) => {
        if (reload) {
            setCurrentPage(1)
            getQuoteListByFilter(filter, 1, itensPerPage)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        getQuoteListByFilter(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function getQuoteListByFilter(filter, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedQuoteList(
            {
                ...filter,
                status: filter.status === 'Todas' ? '' : filter.status,
                filterChips: filter?.filterChips?.map(chips => (chips.value))
            },
            pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseQuoteList({
                totalQuotes: response.total,
                totalPages: response.pages,
                quoteList: response.quotes,
                totalDrafts: response.totalDrafts,
                totalPending: response.totalPending
            })
        }
        else {
            setCurrentPage(1)
            setResponseQuoteList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    const handleBadgeContent = (status) => {
        if (status === 'Em Rascunho')
            return responseQuoteList.totalDrafts

        if (status === 'Em Aprovação')
            return responseQuoteList.totalPending

        return 0
    }

    useEffect(() => {
        getQuoteListByFilter(filter, currentPage, itensPerPage)
    }, [])

    return (
        <React.Fragment>
            <CustomBackdrop open={loadingList} />
            <CustomTitlePaper>
                <Typography>
                    Lista de Cotações
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <CustomHeader>
                    <SearchField>
                        <TextField
                            id="outlined-required-number"
                            label='Número da Cotação'
                            placeholder='digite o número da cotação'
                            value={filter.number}
                            onChange={(e) => {
                                setFilter({ ...filter, number: getOnlyNumber(e.target.value).toString() })
                            }}
                        />

                        <RadioGroup
                            name="status"
                            value={filter.status}
                            onChange={(e) => {
                                let newFilter = { ...filter, status: e.target.value, filterChips: null }
                                setFilter(newFilter)
                                getQuoteListByFilter(newFilter, currentPage, itensPerPage)
                            }}
                        >
                            <List
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '20px',
                                    margin: '10px 0px 0px 10px',
                                    alignItems: 'center',
                                    '--ListItem-paddingY': '1rem',
                                    '--ListItem-radius': '8px',
                                    '--ListItemDecorator-size': '32px',
                                    '--ListItem-minHeight': '3.55rem'
                                }}
                            >
                                {filterOptions.map(item => (
                                    <Badge
                                        invisible={
                                            item.value !== 'Em Rascunho' &&
                                            item.value !== 'Em Aprovação'
                                        }
                                        color='error'
                                        badgeContent={handleBadgeContent(item.value)}
                                        max={99}
                                    >
                                        <ListItem
                                            key={item.value}
                                            variant="outlined"
                                            sx={{
                                                boxShadow: 'sm',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '0.5rem 1rem',
                                            }}
                                        >
                                            <ListItemDecorator>
                                                {item.icon}
                                            </ListItemDecorator>

                                            <Radio
                                                overlay
                                                value={item.value}
                                                label={item.value}
                                                sx={{
                                                    flexGrow: 1,
                                                    flexDirection: 'row-reverse',
                                                }}
                                                slotProps={{
                                                    action: ({ checked }) => ({
                                                        sx: {
                                                            ...(checked && {
                                                                inset: -1,
                                                                border: '2px solid',
                                                                borderColor: '#003C73',
                                                                borderRadius: '10px',
                                                                color: '#003C73',
                                                            }),
                                                        },
                                                    }),
                                                }}
                                            />
                                        </ListItem>
                                    </Badge>
                                ))}
                            </List>
                        </RadioGroup>

                        <IconButtons src={searchIcon}
                            onClick={() => {
                                setCurrentPage(1)
                                getQuoteListByFilter(filter, 1, itensPerPage)
                            }}
                        />

                        <ClearButton
                            onClick={() => {
                                setFilter(defaultFilter)
                                setCurrentPage(1)
                                getQuoteListByFilter(defaultFilter, 1, itensPerPage)
                            }
                            }>
                            Limpar
                        </ClearButton>
                    </SearchField>
                </CustomHeader>

                {
                    loadingList ?
                        <ListSkeleton /> :
                        <React.Fragment>
                            {
                                (responseQuoteList && responseQuoteList.totalQuotes > 0) ?
                                    (
                                        <React.Fragment>
                                            <PageControl
                                                itens={responseQuoteList?.quoteList?.length}
                                                total={responseQuoteList?.totalQuotes}
                                                cacheItensPerPage={itensPerPage}
                                                handleOnChange={(newValue) => setItensPerPage(newValue)}
                                                handleOnClick={() => {
                                                    setCurrentPage(1)
                                                    getQuoteListByFilter(filter, 1, itensPerPage)
                                                }}
                                            />

                                            {responseQuoteList.quoteList.map(quote => (
                                                <QuoteCard
                                                    quote={quote}
                                                    key={quote._id}
                                                    handleReloadPage={handleReloadPage}
                                                />
                                            ))
                                            }

                                            {responseQuoteList.totalPages > 1 && (
                                                <CustomPaginator
                                                    boundaryCount={0}
                                                    count={responseQuoteList.totalPages}
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
                                                Não existem cotações cadastradas ou não forem encontrados itens para o filtro informado.
                                            </Typography>
                                        </CustomResponse>
                                    )
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
        </React.Fragment >
    )
}