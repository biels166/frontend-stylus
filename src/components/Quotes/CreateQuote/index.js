import React, { useEffect, useState } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import {
    CustomBody,
    CustomPaginator,
    CustomPaper,
    CustomResponse,
    CustomStepIndicator,
    CustomTitlePaper,
    IconButtons,
    Next,
    Previous,
    SaveButton
} from './styles'
import api from '../../../services/api'
import { CustomToast } from '../../Toast'
import { useAuth } from '../../../context/AuthContext'
import Stepper from '@mui/joy/Stepper'
import Step, { stepClasses } from '@mui/joy/Step'
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator'
import Typography, { typographyClasses } from '@mui/joy/Typography'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import EditOffIcon from '@mui/icons-material/EditOff'
import { StepButton } from '@mui/joy'
import { QuoteProduct } from '../Step2'
import { QuoteService } from '../Step4'
import { QuotePartnerService } from '../Step5'
import { QuoteMaterials } from '../Step3'
import { LastQuoteStep } from '../LastStep'
import { DateInput } from './../../DateInput/index';

export const CreateQuotePage = () => {
    const defaultForm = {
        deliveryDate: new Date(),
        clientId: '',
        client: {},
        productList: [],
        materialList: [],
        serviceList: [],
        partnerServiceList: [],
    }

    const [form, setForm] = useState(defaultForm)
    const { isAdm, quotePage } = useAuth()
    const [openToast, setOpenToast] = useState(false)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [activeStep, setActiveStep] = useState(1)
    const [clientOptions, setClientOptions] = useState([])
    const [productOptions, setProductOptions] = useState([])
    const [serviceOptions, setServiceOptions] = useState([])
    const [materialItensOptions, setMaterialItensOptions] = useState([])
    const [outsourcedItensOptions, setOutsourcedItensOptions] = useState([])

    const handleUpdateProductList = (newList) => {
        setForm({ ...form, productList: newList })
    }

    const handleUpdateServiceList = (newList) => {
        setForm({ ...form, serviceList: newList })
    }

    const handleUpdatePartnerServiceList = (newList) => {
        setForm({ ...form, partnerServiceList: newList })
    }

    const handleUpdateMaterialList = (newList) => {
        setForm({ ...form, materialList: newList })
    }

    const steperStyle = () => (theme) => ({
        '--Stepper-verticalGap': '2.5rem',
        '--StepIndicator-size': '2.5rem',
        '--Step-gap': '1rem',
        '--Step-connectorInset': '0.5rem',
        '--Step-connectorRadius': '1rem',
        '--Step-connectorThickness': '4px',
        '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',

        [`& .${stepClasses.completed}`]: {
            '&::after': { bgcolor: 'success.solidBg' },
        },
        [`& .${stepClasses.active}`]: {
            [`& .${stepIndicatorClasses.root}`]: {
                border: '4px solid',
                borderColor: '#fff',
                boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
            },
        },
        [`& .${typographyClasses['title-sm']}`]: {
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '14px',
            justifySelf: 'center',
        },
    })

    const currentStyle = (step) => {

        const styleByProps = [
            {
                completed: true,
                active: false,
                wait: false,
                warning: false,
                disabled: false,
                icon: <CheckRoundedIcon />,
                iconStyle: {
                    borderColor: '#1F7A1F',
                    background: '#1F7A1F',
                    color: '#FFF'
                },
                textStyle: {
                    color: '#1F7A1F'
                }
            },
            {
                completed: false,
                active: true,
                wait: false,
                warning: false,
                disabled: false,
                icon: <AppRegistrationRoundedIcon />,
                iconStyle: {
                    borderColor: '#003C73',
                    background: '#003C73',
                    color: '#FFF'
                },
                textStyle: {
                    color: '#003C73'
                }
            },
            {
                completed: false,
                active: false,
                wait: true,
                warning: false,
                disabled: false,
                icon: <React.Fragment>{step}</React.Fragment>,
                iconStyle: {
                    borderColor: '#9FA6AD',
                    background: '#9FA6AD',
                    color: '#FFF'
                },
                textStyle: {
                    color: '#9FA6AD'
                }
            },
            {
                completed: false,
                active: false,
                wait: false,
                warning: false,
                disabled: true,
                icon: <EditOffIcon />,
                iconStyle: {
                    borderColor: '#9FA6AD',
                    background: '#9FA6AD',
                    color: '#FFF'
                },
                textStyle: {
                    color: '#9FA6AD'
                }
            },
        ]

        if (activeStep === step) return styleByProps.find(s => s.active === true)
        if (activeStep > step) return styleByProps.find(s => s.completed === true)
        if (activeStep < step) return styleByProps.find(s => s.wait === true)
    }

    const handleDisableNextButtonRules = () => {
        if (activeStep === 6)
            return true

        if (activeStep === 1 && (!form?.clientId || form.deliveryDate.getFullYear() < 2000))
            return true

        if (activeStep === 3 && form?.productList.length > 0 && form?.materialList.length === 0)
            return true

        if (activeStep === 5 && form?.serviceList.length > 0 && form?.partnerServiceList.length === 0)
            return true

    }

    useEffect(() => {
        console.log('formulário de cotação', form)
    }, [form])

    async function listAllClients() {
        const response = await api.ListAllClients()
        setClientOptions(response.clients)
    }

    async function listAllProducts() {
        const response = await api.ListAllProducts()
        setProductOptions(response.products)
    }

    async function listAllServices() {
        const response = await api.ListAllServices()
        setServiceOptions(response.services)
    }

    async function listAllMaterialItens() {
        const response = await api.GetAllSupplierItens()
        setMaterialItensOptions(response.itens)
    }

    async function listAllOutsourcedItens() {
        const response = await api.GetAllOutsourcedItens()
        setOutsourcedItensOptions(response.itens)
    }

    useEffect(() => {
        if (activeStep === 1) {
            listAllClients()
        }

        if (activeStep === 2) {
            listAllProducts()
        }

        if (activeStep === 3) {
            listAllMaterialItens()
        }

        if (activeStep === 4) {
            listAllServices()
        }

        if (activeStep === 5) {
            listAllOutsourcedItens()
        }
    }, [activeStep])

    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    Criar Nova Cotação
                </Typography>
            </CustomTitlePaper>

            <CustomBody>
                <Stepper
                    orientation="horizontal"
                    sx={steperStyle()}
                >
                    <Step
                        orientation='vertical'
                        completed={activeStep > 1}
                        active={activeStep === 1}
                        indicator={
                            <StepIndicator
                                variant="solid"
                                sx={{
                                    ...currentStyle(1).iconStyle,
                                }}
                            >
                                {currentStyle(1).icon}
                            </StepIndicator>
                        }
                    >
                        <div>
                            <Typography level="title-sm" sx={currentStyle(1).textStyle}>
                                Cliente
                            </Typography>
                        </div>
                    </Step>

                    <Step
                        orientation='vertical'
                        completed={activeStep > 2}
                        active={activeStep === 2}
                        indicator={
                            <StepIndicator
                                variant="solid"
                                sx={{
                                    ...currentStyle(2).iconStyle,
                                }}
                            >
                                {currentStyle(2).icon}
                            </StepIndicator>
                        }
                    >
                        <div>
                            <Typography level="title-sm" sx={currentStyle(2).textStyle}>
                                Produtos
                            </Typography>
                        </div>
                    </Step>

                    <Step
                        orientation='vertical'
                        completed={activeStep > 3}
                        active={activeStep === 3}
                        indicator={
                            <StepIndicator
                                variant="solid"
                                sx={{
                                    ...currentStyle(3).iconStyle,
                                }}
                            >
                                {currentStyle(3).icon}
                            </StepIndicator>
                        }
                    >
                        <div>
                            <Typography level="title-sm" sx={currentStyle(3).textStyle}>
                                Insumos
                            </Typography>
                        </div>
                    </Step>

                    <Step
                        orientation='vertical'
                        completed={activeStep > 4}
                        active={activeStep === 4}
                        indicator={
                            <StepIndicator
                                variant="solid"
                                sx={{
                                    ...currentStyle(4).iconStyle,
                                }}
                            >
                                {currentStyle(4).icon}
                            </StepIndicator>
                        }
                    >
                        <div>
                            <Typography level="title-sm" sx={currentStyle(4).textStyle}>
                                Serviços
                            </Typography>
                        </div>
                    </Step>

                    <Step
                        orientation='vertical'
                        completed={activeStep > 5}
                        active={activeStep === 5}
                        indicator={
                            <StepIndicator
                                variant="solid"
                                sx={{
                                    ...currentStyle(5).iconStyle,
                                }}
                            >
                                {currentStyle(5).icon}
                            </StepIndicator>
                        }
                    >
                        <div>
                            <Typography level="title-sm" sx={currentStyle(5).textStyle}>
                                Serviço de Terceiros
                            </Typography>
                        </div>
                    </Step>

                    <Step
                        orientation='vertical'
                        completed={activeStep > 6}
                        active={activeStep === 6}
                        indicator={
                            <StepIndicator
                                variant="solid"
                                sx={{
                                    ...currentStyle(6).iconStyle,
                                }}
                            >
                                {currentStyle(6).icon}
                            </StepIndicator>
                        }
                    >
                        <div>
                            <Typography level="title-sm" sx={currentStyle(6).textStyle}>
                                Visão Geral
                            </Typography>
                        </div>
                    </Step>

                </Stepper>
            </CustomBody>

            <CustomPaper>
                <React.Fragment>
                    {
                        activeStep === 1 && (
                            <React.Fragment>
                                <Box width={'30%'}>
                                    <DateInput
                                        label='Data de Entrega*'
                                        selectedDate={form.deliveryDate}
                                        disablePast={true}
                                        valueCallback={(newDate) => {
                                            setForm({ ...form, deliveryDate: newDate })
                                        }}
                                    />
                                </Box>

                                <FormControl variant="outlined">
                                    <InputLabel id="select-outlined-label-client-options">Cliente</InputLabel>
                                    <Select
                                        required
                                        labelId="select-outlined-label-client-options"
                                        disabled={!isAdm && !quotePage.Creator}
                                        value={form?.clientId}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                clientId: e.target.value,
                                                client: clientOptions.find(c => c._id === e.target.value)
                                            })
                                        }}
                                        label="Cliente"
                                    >
                                        <MenuItem value={''}>Selecionar</MenuItem>
                                        {
                                            clientOptions?.length > 0 && (
                                                clientOptions?.map(elem => (
                                                    <MenuItem
                                                        value={elem._id}>{elem.name}</MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </React.Fragment>
                        )
                    }

                    {
                        activeStep === 2 && (
                            <QuoteProduct
                                productOptions={productOptions}
                                productList={form?.productList}
                                handleUpdate={(newList) => {
                                    handleUpdateProductList(newList)
                                }}
                            />
                        )
                    }

                    {
                        activeStep === 3 && (
                            <QuoteMaterials
                                materialItensOptions={materialItensOptions}
                                materialList={form?.materialList}
                                handleUpdate={(newList) => {
                                    handleUpdateMaterialList(newList)
                                }}
                            />
                        )
                    }

                    {
                        activeStep === 4 && (
                            <QuoteService
                                serviceOptions={serviceOptions}
                                servicetList={form?.serviceList}
                                handleUpdate={(newList) => {
                                    handleUpdateServiceList(newList)
                                }}
                            />
                        )
                    }

                    {
                        activeStep === 5 && (
                            <QuotePartnerService
                                outsourcedItensOptions={outsourcedItensOptions}
                                partnerServiceList={form?.partnerServiceList}
                                handleUpdate={(newList) => {
                                    handleUpdatePartnerServiceList(newList)
                                }}
                            />
                        )
                    }

                    {
                        activeStep === 6 && (
                            <LastQuoteStep
                                quote={form}
                            />
                        )
                    }

                    <Box
                        width={'100%'}
                        alignSelf={'flex-end'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        paddingTop={'20px'}
                        margin={'auto 0px 5px'}
                    >
                        <Previous
                            disabled={activeStep === 1}
                            onClick={() => setActiveStep(activeStep - 1)}
                        >
                            Anterior
                        </Previous>

                        <Next
                            disabled={handleDisableNextButtonRules()}
                            onClick={() => setActiveStep(activeStep + 1)}
                        >
                            Próximo
                        </Next>
                    </Box>
                </React.Fragment>
            </CustomPaper>

            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={() => setOpenToast(false)}
            />
        </React.Fragment>
    )
}
