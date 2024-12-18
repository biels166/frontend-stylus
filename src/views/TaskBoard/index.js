import React, { useEffect, useState } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import TaskCard from '../../components/Tasks'
import { useAuth } from './../../context/AuthContext';
import { ListSkeleton } from './skeleton';
import { ClearButton, CustomBody, CustomPaginator, CustomPaper, CustomResponse, CustomTitlePaper, IconButtons, SaveButton } from './styles';
import { PageControl } from './../../components/PageControl/index';
import api from '../../services/api';
import { CustomToast } from '../../components/Toast';
import searchIcon from '../../assets/search_icon.svg'

const Dictionary = () => {
    return (
        <Box
            marginLeft={'40px'}
            display={'flex'}
            justifyContent={'end'}
        >
            <React.Fragment>
                <Box width={'20px'} height={'20px'} bgcolor={'#FF8C00'} margin={'0px 5px'} />
                <Typography marginRight={'10px'}>Vencem hoje</Typography>
            </React.Fragment>

            <React.Fragment>
                <Box width={'20px'} height={'20px'} bgcolor={'#008B8B'} margin={'0px 5px'} />
                <Typography marginRight={'10px'}>Vencem esta semana</Typography>
            </React.Fragment>

            <React.Fragment>
                <Box width={'20px'} height={'20px'} bgcolor={'#003C73'} margin={'0px 5px'} />
                <Typography marginRight={'10px'}>Vencem neste mês ou no próximo</Typography>
            </React.Fragment>

            <React.Fragment>
                <Box width={'20px'} height={'20px'} bgcolor={'#8B0000'} margin={'0px 5px'} />
                <Typography marginRight={'10px'}>Atrasada</Typography>
            </React.Fragment>

            <React.Fragment>
                <Box width={'20px'} height={'20px'} bgcolor={'#006400'} margin={'0px 5px'} />
                <Typography marginRight={'10px'}>Concluída</Typography>
            </React.Fragment>
        </Box>

    )
}

export const TaskBoard = () => {
    const { user } = useAuth()
    const itensPerRows = 5
    const [openToast, setOpenToast] = useState(false)
    const [responseTaskList, setResponseTaskList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [loadingList, setLoadingList] = useState(true)
    const [disableButton, setDisableButton] = useState(false)

    const defaultFilter = {
        userId: user?._id,
        type: '',
        status: false,
        dateFilter: 'month'
    }

    const defaultNewTask = {
        userId: user?._id,
        title: '',
        state: 'Nova Tarefa',
        description: '',
        status: false,
        type: '',
        date: new Date(),
        _id: null,
    }

    const [filter, setFilter] = useState(defaultFilter)

    const dateFilteredOptions = [
        { description: 'Vencem hoje', value: 'today' },
        { description: 'Vencem esta semana', value: 'week' },
        { description: 'Vencem este mês', value: 'month' },
        { description: 'Atrasadas', value: 'late' },
        { description: 'Todas', value: '' }
    ]

    const typeOptions = [
        { description: 'Compra de Insumos', value: 'Compra de Insumos' },
        { description: 'Entrega', value: 'Entrega' },
        { description: 'Visita / Reunião', value: 'Visita / Reunião' },
        { description: 'Outros', value: 'Outros' },
        { description: 'Todos', value: '' }
    ]

    const statusOptions = [
        { description: 'Sim', value: true },
        { description: 'Não', value: false }
    ]

    const handleCloseToast = () => { setOpenToast(false) }

    const handleReloadPage = (reload) => {
        if (reload) {
            setCurrentPage(1)
            listPaginatedTaskByUser(filter, 1, itensPerPage)
        }
    }

    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        listPaginatedTaskByUser(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function listPaginatedTaskByUser(filter, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedTaskByUser(filter, pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponseTaskList({
                totalTasks: response.total,
                totalPages: response.pages,
                taskList: [defaultNewTask, ...response.tasks]
            })
        }
        else {
            setCurrentPage(1)
            setResponseTaskList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    useEffect(() => {
        if (user)
            listPaginatedTaskByUser(filter, 1, itensPerPage)
    }, [user])

    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    {user?.name?.split(' ')[0]}, aqui estão suas tarefas.
                </Typography>
            </CustomTitlePaper>

            <CustomBody>
                <FormControl variant="outlined" width={'100%'}>
                    <InputLabel id="select-outlined-label-dateFilter">Previsão de datas</InputLabel>
                    <Select
                        labelId="select-outlined-label-dateFilter"
                        value={filter.dateFiltered}
                        onChange={(evt) => {
                            setFilter({ ...filter, dateFilter: evt.target.value })
                        }}
                        label="Previsão de datas"
                    >
                        {
                            dateFilteredOptions.map(elem => (
                                <MenuItem
                                    selected={filter.dateFiltered === elem.value}
                                    value={elem.value}
                                >
                                    {elem.description}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl variant="outlined" width={'100%'}>
                    <InputLabel id="select-outlined-label-type">Tipo de tarefas</InputLabel>
                    <Select
                        labelId="select-outlined-label-type"
                        value={filter.type}
                        onChange={(evt) => {
                            setFilter({ ...filter, type: evt.target.value })
                        }}
                        label="Tipo de tarefas"
                    >
                        {
                            typeOptions.map(elem => (
                                <MenuItem
                                    selected={filter.type === elem.value}
                                    value={elem.value}
                                >
                                    {elem.description}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl variant="outlined" width={'100%'}>
                    <InputLabel id="select-outlined-label-completed">Apenas Concluídas ?</InputLabel>
                    <Select
                        labelId="select-outlined-label-completed"
                        value={filter.status}
                        onChange={(evt) => {
                            setFilter({ ...filter, status: evt.target.value })
                        }}
                        label="Apenas Concluídas"
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

                <IconButtons
                    src={searchIcon}
                    onClick={() => {
                        setCurrentPage(1)
                        listPaginatedTaskByUser(filter, 1, itensPerPage)
                    }}
                />
                <ClearButton
                    onClick={() => {
                        setFilter(defaultFilter)
                        setCurrentPage(1)
                        listPaginatedTaskByUser(defaultFilter, 1, itensPerPage)
                    }}>
                    Limpar
                </ClearButton>

                <Dictionary />

            </CustomBody>

            <CustomPaper>
                {
                    loadingList ?
                        <ListSkeleton /> :
                        <React.Fragment>
                            {
                                responseTaskList.totalTasks > 0 ?
                                    <React.Fragment>
                                        <PageControl
                                            itens={responseTaskList?.taskList?.length}
                                            total={responseTaskList?.totalTasks}
                                            cacheItensPerPage={itensPerPage}
                                            handleOnChange={(newValue) => setItensPerPage(newValue)}
                                            handleOnClick={() => {
                                                setCurrentPage(1)
                                                listPaginatedTaskByUser(filter, 1, itensPerPage)
                                            }}
                                        />

                                        {responseTaskList.taskList.reduce((rows, task, index) => {
                                            const rowIndex = Math.floor(index / itensPerRows);
                                            if (!rows[rowIndex]) rows[rowIndex] = []; // Cria uma nova linha
                                            rows[rowIndex].push(task); // Adiciona a tarefa à linha atual
                                            return rows;
                                        }, []).map((row, rowIndex) => (
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                key={rowIndex}
                                                marginBottom="10px"
                                            >
                                                {row.map(task => (
                                                    <TaskCard
                                                        task={task}
                                                        key={task._id}
                                                        handleReloadPageList={(reload) => { handleReloadPage(reload) }}
                                                    />
                                                ))}
                                            </Box>
                                        ))}

                                        {responseTaskList.totalPages > 1 && (
                                            <CustomPaginator
                                                boundaryCount={0}
                                                count={responseTaskList.totalPages}
                                                page={currentPage}
                                                size='large'
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage} />
                                        )}
                                    </React.Fragment>
                                    : <CustomResponse>
                                        <Typography>
                                            Você ainda não possui tarefas cadastradas ou não foi possível encontrar suas tarefas para o filtro desejado.
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