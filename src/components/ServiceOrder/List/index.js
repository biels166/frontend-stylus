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
    CustomAllIcon,
    CustomLateIcon,
    CustomThisWeekIcon,
    CustomTomorrowIcon,
    CustomTodayIcon,
} from './styles'
import searchIcon from '../../../assets/search_icon.svg'
import { ListSkeleton } from './skeleton'
import api from '../../../services/api'
import { Badge, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import { CustomToast } from '../../Toast'
import { PageControl } from '../../PageControl'
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { List, ListItem, Radio, RadioGroup } from '@mui/joy'
import { ServiceOrderCard } from '../Card/card'
import { getOnlyNumber } from '../../../utils'
import { CustomBackdrop } from '../../CustomBackrop'

export const ServiceOrderList = () => {
    const defaultFilter = {
        number: '',
        dateFilter: 'Todas',
        status: 'Todas'
    }

    const filterOptions = [
        {
            icon: <CustomTodayIcon />,
            value: 'Hoje'
        },
        {
            icon: <CustomTomorrowIcon />,
            value: 'Amanhã'
        },
        {
            icon: <CustomThisWeekIcon />,
            value: 'Essa Semana'
        },
        {
            icon: <CustomLateIcon />,
            value: 'Atrasada'
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
    const [responseOrderList, setResponseOrderList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const { isAdm, partnerPage } = useAuth()

    const statusOptions = [
        { description: 'Em Execução', value: 'Em Execução' },
        { description: 'Concluídas', value: 'Concluída' },
        { description: 'Todas', value: 'Todas' }
    ]

    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload) => {
        if (reload) {
            setCurrentPage(1)
            getOrderListByFilter(filter, 1, itensPerPage)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        getOrderListByFilter(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function getOrderListByFilter(filter, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedServiceOrderList(
            {
                ...filter,
                dateFilter: filter.dateFilter === 'Todas' ? '' : filter.dateFilter,
                status: filter.status === 'Todas' ? '' : filter.status,
                filterChips: filter?.filterChips?.map(chips => (chips.value))
            },
            pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseOrderList({
                totalOrders: response.total,
                totalPages: response.pages,
                orderList: response.serviceOrders,
                totalToday: response.totalToday,
                totalTomorrow: response.totalTomorrow,
                totalThisWeek: response.totalThisWeek,
                totalLate: response.totalLate
            })
        }
        else {
            setCurrentPage(1)
            setResponseOrderList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    const handleBadgeContent = (status) => {
        if (status === 'Hoje')
            return responseOrderList.totalToday

        if (status === 'Amanhã')
            return responseOrderList.totalTomorrow

        if (status === 'Atrasada')
            return responseOrderList.totalLate

        if (status === 'Essa Semana')
            return responseOrderList.totalThisWeek

        return 0
    }

    useEffect(() => {
        getOrderListByFilter(filter, currentPage, itensPerPage)
    }, [])

    return (
        <React.Fragment>
            <CustomBackdrop open={loadingList} />
            <CustomTitlePaper>
                <Typography>
                    Ordens de Serviço
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <CustomHeader>
                    <SearchField>
                        <TextField
                            id="outlined-required-number"
                            label='Número da Ordem de Serviço'
                            placeholder='digite o número da ordem'
                            value={filter.number}
                            onChange={(e) => {
                                setFilter({ ...filter, number: getOnlyNumber(e.target.value).toString() })
                            }}
                            sx={{ marginRight: '10px' }}
                        />

                        <FormControl variant="outlined" >
                            <InputLabel id="select-outlined-label-status">Status</InputLabel>
                            <Select
                                labelId="select-outlined-label-status"
                                value={filter.status}
                                onChange={(evt) => {
                                    setFilter({ ...filter, status: evt.target.value })
                                }}
                                label="Status"
                                sx={{ width: '20ch' }}
                            >
                                {
                                    statusOptions.map(elem => (
                                        <MenuItem
                                            selected={filter.status === elem.value}
                                            value={elem.value}
                                        >
                                            {elem.description}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        {
                            filter?.status !== 'Concluída' && (
                                <RadioGroup
                                    name="dateFilter"
                                    value={filter.dateFilter}
                                    onChange={(e) => {
                                        let newFilter = { ...filter, dateFilter: e.target.value, filterChips: null }
                                        setFilter(newFilter)
                                        getOrderListByFilter(newFilter, currentPage, itensPerPage)
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
                                                invisible={item.value === 'Todas'}
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
                            )
                        }

                        <IconButtons src={searchIcon}
                            onClick={() => {
                                setCurrentPage(1)
                                getOrderListByFilter(filter, 1, itensPerPage)
                            }}
                        />

                        <ClearButton
                            onClick={() => {
                                setFilter(defaultFilter)
                                setCurrentPage(1)
                                getOrderListByFilter(defaultFilter, 1, itensPerPage)
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
                                (responseOrderList && responseOrderList.totalOrders > 0) ?
                                    (
                                        <React.Fragment>
                                            <PageControl
                                                itens={responseOrderList?.orderList?.length}
                                                total={responseOrderList?.totalOrders}
                                                cacheItensPerPage={itensPerPage}
                                                handleOnChange={(newValue) => setItensPerPage(newValue)}
                                                handleOnClick={() => {
                                                    setCurrentPage(1)
                                                    getOrderListByFilter(filter, 1, itensPerPage)
                                                }}
                                            />

                                            {responseOrderList.orderList.map(order => (
                                                <ServiceOrderCard
                                                    order={order}
                                                    key={order._id}
                                                    handleReloadPage={handleReloadPage}
                                                />
                                            ))
                                            }

                                            {responseOrderList.totalPages > 1 && (
                                                <CustomPaginator
                                                    boundaryCount={0}
                                                    count={responseOrderList.totalPages}
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
                                                Não existem ordens de serviço cadastradas ou não forem encontrados itens para o filtro informado.
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