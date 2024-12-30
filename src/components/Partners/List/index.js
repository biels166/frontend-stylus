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
    CustomOutsourcedIcon,
    CustomSupplierIcon,
    CustomAccordion,
} from './styles'
import searchIcon from '../../../assets/search_icon.svg'
import { ListSkeleton } from './skeleton'
import { PartnerCard } from '../Card/card'
import api from '../../../services/api'
import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../../../context/AuthContext'
import { ModalAddPartner } from '../ModalAddPartner'
import { CustomToast } from '../../Toast'
import { PageControl } from '../../PageControl'
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { List, ListItem, Radio, RadioGroup } from '@mui/joy'
import { ChipsCategories } from '../ChipsCategories'

export const PartnerList = () => {
    const defaultFilter = {
        name: '',
        partnerType: 'Fornecedores'
    }
    const filterOptions = [
        {
            icon: <CustomSupplierIcon />,
            value: 'Fornecedores'
        },
        {
            icon: <CustomOutsourcedIcon />,
            value: 'Terceiros'
        },
    ]
    const [filter, setFilter] = useState(defaultFilter)
    const [itensPerPage, setItensPerPage] = useState(5)
    const [openToast, setOpenToast] = useState(false)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [responsePartnerList, setResponsePartnerList] = useState({})
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const { isAdm, partnerPage } = useAuth()

    const handleOpenAddModal = () => { setOpenAddModal(true) }
    const handleCloseAddModal = () => { setOpenAddModal(false) }
    const handleCloseToast = () => { setOpenToast(false) }
    const handleReloadPage = (reload) => {
        if (reload) {
            setCurrentPage(1)
            getPartnerListByFilter(filter, 1, itensPerPage)
        }
    }
    const handleChangePage = (event, value) => {
        setCurrentPage(value)

        getPartnerListByFilter(filter, value, itensPerPage)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function getPartnerListByFilter(filter, pageNumber, rowsPage) {
        setLoadingList(true)

        const response = await api.PaginatedPartnerList(
            {
                ...filter,
                filterChips: filter?.filterChips?.map(chips => (chips.value))
            },
            pageNumber, rowsPage)

        if (response.success) {
            setCurrentPage(pageNumber)
            setResponsePartnerList({
                totalPartners: response.total,
                totalPages: response.pages,
                partnerList: response.partners
            })
        }
        else {
            setCurrentPage(1)
            setResponsePartnerList({})
            setInfoToCustomToast({
                severity: response.status,
                info: response.message,
            })
        }

        setLoadingList(false)
        setOpenToast(!response.success)
    }

    useEffect(() => {
        getPartnerListByFilter(filter, currentPage, itensPerPage)
    }, [])

    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    {filter.partnerType === 'Fornecedores' ? 'Fornecedores' : 'Terceiros / Prestadores de serviço'}
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <CustomHeader>
                    <SearchField>
                        <TextField
                            required
                            id="outlined-required-name"
                            label={`Nome do ${filter.partnerType === 'Fornecedores' ? 'Fornecedor' : 'Terceiro'}`}
                            placeholder={`digite o nome do ${filter.partnerType === 'Fornecedores' ? 'Fornecedor' : 'Terceiro'}}`}
                            value={filter.name}
                            onChange={(e) => {
                                setFilter({ ...filter, name: e.target.value })
                            }}
                        />

                        <RadioGroup
                            name="partner-types"
                            value={filter.partnerType}
                            onChange={(e) => {
                                let newFilter = { ...filter, partnerType: e.target.value, filterChips: null }
                                setFilter(newFilter)
                                getPartnerListByFilter(newFilter, currentPage, itensPerPage)
                            }}
                        >
                            <List
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    margin: '10px 0px 0px 10px',
                                    alignItems: 'center',
                                    '--ListItem-paddingY': '1rem',
                                    '--ListItem-radius': '8px',
                                    '--ListItemDecorator-size': '32px',
                                    '--ListItem-minHeight': '3.55rem'
                                }}
                            >
                                {filterOptions.map(item => (
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
                                ))}
                            </List>
                        </RadioGroup>

                        <IconButtons src={searchIcon}
                            onClick={() => {
                                setCurrentPage(1)
                                getPartnerListByFilter(filter, 1, itensPerPage)
                            }}
                        />

                        <ClearButton
                            onClick={() => {
                                setFilter(defaultFilter)
                                setCurrentPage(1)
                                getPartnerListByFilter(defaultFilter, 1, itensPerPage)
                            }
                            }>
                            Limpar
                        </ClearButton>
                    </SearchField>

                    {
                        (isAdm || partnerPage.Creator) && (
                            <AddButton onClick={handleOpenAddModal}>
                                {`Cadastrar ${filter.partnerType === 'Fornecedores' ? 'Fornecedor' : 'Terceiro'}`}
                            </AddButton>
                        )
                    }
                </CustomHeader>

                <CustomAccordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>
                            Filtrar por categorias de {
                                filter.partnerType === 'Fornecedores' ? 'Fornecedor' : 'Terceiro / Prestador de serviço'
                            }
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ChipsCategories
                            isSupplier={filter.partnerType === 'Fornecedores'}
                            accordionStyle={true}
                            hanleUpdateForm={(updatedData) => {
                                setFilter({ ...filter, filterChips: updatedData })
                            }}
                        />
                    </AccordionDetails>
                </CustomAccordion>

                {
                    loadingList ?
                        <ListSkeleton /> :
                        <React.Fragment>
                            {
                                (responsePartnerList && responsePartnerList.totalPartners > 0) ?
                                    (
                                        <React.Fragment>
                                            <PageControl
                                                itens={responsePartnerList?.partnerList?.length}
                                                total={responsePartnerList?.totalPartners}
                                                cacheItensPerPage={itensPerPage}
                                                handleOnChange={(newValue) => setItensPerPage(newValue)}
                                                handleOnClick={() => {
                                                    setCurrentPage(1)
                                                    getPartnerListByFilter(filter, 1, itensPerPage)
                                                }}
                                            />

                                            {responsePartnerList.partnerList.map(partner => (
                                                <PartnerCard
                                                    partner={partner}
                                                    key={partner._id}
                                                    handleReloadPage={handleReloadPage}
                                                />
                                            ))
                                            }

                                            {responsePartnerList.totalPages > 1 && (
                                                <CustomPaginator
                                                    boundaryCount={0}
                                                    count={responsePartnerList.totalPages}
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
                                                Não existem {filter.partnerType} cadastrados ou não forem encontrados itens para o filtro informado.
                                            </Typography>
                                        </CustomResponse>
                                    )
                            }
                        </React.Fragment>
                }
            </CustomPaper>

            <ModalAddPartner
                partnerType={filter.partnerType}
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