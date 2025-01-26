import React, { useEffect, useState } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import {
    CreateQuote,
    CustomBody,
    CustomPaper,
    CustomTitlePaper,
    Next,
    Previous,
    SaveDraft
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
import { QuoteProduct } from '../Step2'
import { QuoteService } from '../Step4'
import { QuotePartnerService } from '../Step5'
import { QuoteMaterials } from '../Step3'
import { LastQuoteStep } from '../LastStep'
import { DateInput } from './../../DateInput/index'
import { ConfirmAction } from '../../ConfirmAction'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const CreateQuotePage = () => {
    const params = useParams()
    const number = params.number
    const location = useLocation()
    const quoteDraft = location.state
    const formFromDrfat = {
        ...quoteDraft,
        clientId: quoteDraft?.client?._id,
        deliveryDate: new Date(quoteDraft?.deliveryDate),
    }
    const defaultForm = {
        deliveryDate: new Date(),
        clientId: '',
        client: {},
        productList: [],
        productsValue: 0,
        serviceList: [],
        servicesValue: 0,
        materialList: [],
        materialsCost: 0,
        partnerServiceList: [],
        partnerServicesCost: 0,
        deliveryRate: '',
        urgencyRate: '',
        discount: '',
        totalWithoutRate: 0,
        totalWithRate: '',
        status: '',
    }

    const initialForm = quoteDraft ? formFromDrfat : defaultForm

    const navigate = useNavigate()
    const { isAdm, quotePage } = useAuth()
    const [form, setForm] = useState(initialForm)
    const [openToast, setOpenToast] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [activeStep, setActiveStep] = useState(1)
    const [clientOptions, setClientOptions] = useState([])
    const [productOptions, setProductOptions] = useState([])
    const [serviceOptions, setServiceOptions] = useState([])
    const [materialItensOptions, setMaterialItensOptions] = useState([])
    const [outsourcedItensOptions, setOutsourcedItensOptions] = useState([])
    const [disableButton, setDisableButton] = useState(false)

    const handleUpdateProductList = (newList) => {
        let productsValue = newList?.reduce((accumulator, item) => accumulator + item.total, 0)

        setForm({
            ...form,
            productList: newList,
            productsValue,
            totalWithoutRate: productsValue + form.servicesValue
        })
    }

    const handleUpdateServiceList = (newList) => {
        let servicesValue = newList?.reduce((accumulator, item) => accumulator + item.total, 0)

        setForm({
            ...form,
            serviceList: newList,
            servicesValue,
            totalWithoutRate: form.productsValue + servicesValue
        })
    }

    const handleUpdatePartnerServiceList = (newList) => {
        let partnerServicesCost = newList?.reduce((accumulator, item) => accumulator + item.totalCost, 0)

        setForm({
            ...form,
            partnerServiceList: newList,
            partnerServicesCost,
            totalWithoutRate: form.productsValue + form.servicesValue + partnerServicesCost + form.materialsCost
        })
    }

    const handleUpdateMaterialList = (newList) => {
        let materialsCost = newList?.reduce((accumulator, item) => accumulator + item.totalCost, 0)

        setForm({
            ...form,
            materialList: newList,
            materialsCost,
            totalWithoutRate: form.productsValue + form.servicesValue + form.partnerServicesCost + materialsCost
        })
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

        if (activeStep === 1 && (!form?.clientId || form.deliveryDate?.getFullYear() < 2000))
            return true

        if (activeStep === 3 && form?.productList?.length > 0 && form?.materialList?.length === 0)
            return true

        if (activeStep === 5 && form?.serviceList?.length > 0 && form?.partnerServiceList?.length === 0)
            return true
    }

    const handleConitionsToSubmit = () => {
        let condition = form?.productList.length === 0 &&
            form?.materialList.length === 0 &&
            form?.serviceList.length === 0 &&
            form?.partnerServiceList.length === 0

        if (condition)
            return true
    }

    useEffect(() => {
        setActiveStep(1)
        setForm(initialForm)
    }, [location])

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

    async function saveDraftOrCreateQuote(status = "") {
        let deliveryRate = 0
        let urgencyRate = 0
        let discount = 0

        try {
            deliveryRate = parseFloat(form.deliveryRate)
        } catch { }

        try {
            urgencyRate = parseFloat(form.urgencyRate) / 100
        } catch { }

        try {
            discount = parseFloat(form.discount) / 100
        } catch { }

        let totalWithRate = form.totalWithoutRate

        let totalRate = 0

        if (urgencyRate > 0) totalRate += urgencyRate

        if (discount > 0) totalRate -= discount

        totalWithRate = totalWithRate * (1 + totalRate)

        if (deliveryRate > 0) totalWithRate = totalWithRate + deliveryRate

        const updateDraft = form.number && status === 'Em Rascunho'

        //Todo > Ao consolidar integrar com a collection de lotes
        //const consolidateDraft = form.number && status === 'Em Aprovação' 

        const body = {
            ...form,
            status,
            totalWithRate: totalWithRate,
            deliveryRate: deliveryRate > 0 ? deliveryRate : 0,
            urgencyRate: urgencyRate > 0 ? urgencyRate : 0,
            discount: discount > 0 ? discount : 0,
        }

        const response = updateDraft ? await api.UpdateOrConsolidateDraft(body)
            : await api.SaveDraftOrCreateQuote(body)

        if (response.success) {
            setTimeout(() => { navigate('/listagem-cotacao') }, 4000)
        }

        setInfoToCustomToast({
            severity: response.status,
            info: response.message,
        })
        setOpenToast(true)
        setDisableButton(false)
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
                    {number ? `Continuar Rascunho ${number}` : 'Criar Nova Cotação'}
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
                                cacheQuote={(quoteData) => { setForm(quoteData) }}
                            />
                        )
                    }


                </React.Fragment>
            </CustomPaper>

            <Box
                width={'100%'}
                alignSelf={'flex-end'}
                display={'flex'}
                justifyContent={'space-between'}
                paddingTop={'20px'}
                margin={'auto 0px 5px'}
            >
                <Previous
                    disabled={activeStep === 1 || disableButton}
                    onClick={() => setActiveStep(activeStep - 1)}
                >
                    Anterior
                </Previous>

                <Box>
                    {
                        activeStep > 1 && (
                            <SaveDraft
                                disabled={handleConitionsToSubmit() || disableButton}
                                onClick={() => { setOpenConfirm(true) }}
                            >
                                Salvar Rascunho
                            </SaveDraft>
                        )
                    }

                    {
                        activeStep === 6 && (
                            <CreateQuote
                                disabled={handleConitionsToSubmit() || disableButton}
                                onClick={() => {
                                    saveDraftOrCreateQuote("Em Aprovação")
                                }}
                            >
                                Gerar Cotação
                            </CreateQuote>
                        )
                    }
                </Box>


                <Next
                    disabled={handleDisableNextButtonRules() || disableButton}
                    onClick={() => setActiveStep(activeStep + 1)}
                >
                    Próximo
                </Next>

            </Box>

            <ConfirmAction
                open={openConfirm}
                title={'Salvar Rascunho'}
                text={'Ao salvar o rascunho, os materiais não serão reservados no estoque, somente após a geração da cotação. Deseja seguir ?'}
                handleClose={() => { setOpenConfirm(false) }}
                returnDecision={(decision) => {
                    setOpenConfirm(false)

                    if (decision) {
                        saveDraftOrCreateQuote("Em Rascunho")
                        console.log('salvamento de rascunho confirmado')
                    }
                }}
            />
            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={() => setOpenToast(false)}
            />
        </React.Fragment>
    )
}
