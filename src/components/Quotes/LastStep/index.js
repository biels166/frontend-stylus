import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { CustomBody, CustomDivider, CustomTitlePaper } from './styles'
import { CustomToast } from '../../Toast'
import Typography from '@mui/joy/Typography'
import { docType, formatDateFromFront, formatValue } from '../../../utils'

export const LastQuoteStep = ({
    quote
}) => {
    const [openToast, setOpenToast] = useState(false)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})
    const [totalQuote, setTotalQuote] = useState(0)

    const hasRegister = (value = '') => { return value.length > 0 ? value : '-' }

    const getTotalProductValue = () => {
        if (quote?.productList?.length === 0) return formatValue(0)

        let value = quote?.productList?.reduce((accumulator, item) => accumulator + item.total, 0)

        return formatValue(value)
    }

    const getTotalServiceValue = () => {
        if (quote?.serviceList?.length === 0) return formatValue(0)

        let value = quote?.serviceList?.reduce((accumulator, item) => accumulator + item.total, 0)

        return formatValue(value)
    }

    const getMaterialTotalCost = () => {
        if (quote?.materialList?.length === 0) return formatValue(0)

        let value = quote?.materialList?.reduce((accumulator, item) => accumulator + item.totalCost, 0)

        return formatValue(value)
    }

    const getPartnerServiceListTotalCost = () => {
        if (quote?.partnerServiceList?.length === 0) return formatValue(0)

        let value = quote?.partnerServiceList?.reduce((accumulator, item) => accumulator + item.totalCost, 0)

        return formatValue(value)
    }

    const getTotalValue = () => {
        let products = quote?.productList?.reduce((accumulator, item) => accumulator + item.total, 0)
        let services = quote?.serviceList?.reduce((accumulator, item) => accumulator + item.total, 0)
        let materials = quote?.materialList?.reduce((accumulator, item) => accumulator + item.totalCost, 0)
        let partnerServices = quote?.partnerServiceList?.reduce((accumulator, item) => accumulator + item.totalCost, 0)

        let total = products + services - (materials + partnerServices)

        setTotalQuote(total)
    }

    useEffect(() => {
        getTotalValue()
    }, [quote])

    return (
        <Box maxHeight={'700px'} overflow={'scroll'}>
            <CustomTitlePaper><Typography>Dados do Cliente</Typography></CustomTitlePaper>

            <CustomBody>
                <Box>
                    <Grid container spacing={3}
                        sx={{ width: '100%' }}>
                        <Grid item xs={4}>
                            <Typography>
                                Nome: <span>{quote?.client?.name}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                {docType(quote?.client?.document)}: <span>{quote?.client?.document}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Data de Entrega: <span>{formatDateFromFront(quote.deliveryDate)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Celular: <span>{hasRegister(quote?.client?.cellphone)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Telefone: <span>{hasRegister(quote?.client?.telephone)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                E-mail: <span>{hasRegister(quote?.client?.email)}</span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ width: '100%', mt: '1px' }}>
                        <Grid item xs={4}>
                            <Typography>
                                Logradouro: <span>{quote?.client?.street}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Número: <span>{quote?.client?.number}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Complemento: <span>{quote?.client?.complement}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Bairro: <span>{quote?.client?.district}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Cidade: <span>{quote?.client?.city}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                Estado: <span>{quote?.client?.state}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CustomBody>

            {
                quote.productList.length > 0 && (
                    <React.Fragment>
                        <CustomTitlePaper><Typography>Produtos</Typography></CustomTitlePaper>

                        <CustomBody>
                            {quote.productList.map((product, index) =>
                                <Box>
                                    <Grid container spacing={3} sx={{ width: '100%' }}>
                                        <Grid item xs={6} lg={6}>
                                            <Typography>
                                                Produto: <span>{product.product}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Quantidade: <span>{product.quantity}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Valor Total: <span>{formatValue(product.total)}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <CustomDivider isLasisLastItem={(quote.productList.length - 1) === index} />
                                </Box>
                            )}
                        </CustomBody>
                    </React.Fragment>
                )
            }

            {
                quote.serviceList.length > 0 && (
                    <React.Fragment>
                        <CustomTitlePaper><Typography>Serviços</Typography></CustomTitlePaper>

                        <CustomBody>
                            {quote.serviceList.map((service, index) =>
                                <Box>
                                    <Grid container spacing={3} sx={{ width: '100%' }}>
                                        <Grid item xs={6} lg={6}>
                                            <Typography>
                                                Serviço: <span>{service.product}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Quantidade: <span>{service.quantity}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Valor Total: <span>{formatValue(service.total)}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <CustomDivider isLasisLastItem={(quote.serviceList.length - 1) === index} />
                                </Box>
                            )}


                        </CustomBody>
                    </React.Fragment>
                )
            }

            {
                quote.materialList.length > 0 && (
                    <React.Fragment>
                        <CustomTitlePaper><Typography>Insumos</Typography></CustomTitlePaper>

                        <CustomBody sx={{ bgcolor: '#f7dfdf' }}>
                            {quote.materialList.map((material, index) =>
                                <Box>
                                    <Grid container spacing={3} sx={{ width: '100%' }}>
                                        <Grid item xs={4} lg={4}>
                                            <Typography>
                                                Insumo: <span>{material.name}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} lg={2}>
                                            <Typography>
                                                Lote: <span>{material.batch?.batch}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Quantidade: <span>{material.quantity}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Custo Total: <span>{formatValue(material.totalCost)}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <CustomDivider isLasisLastItem={(quote.materialList.length - 1) === index} />
                                </Box>
                            )}


                        </CustomBody>
                    </React.Fragment>
                )
            }

            {
                quote.partnerServiceList.length > 0 && (
                    <React.Fragment>
                        <CustomTitlePaper><Typography>Serviços de Terceiros</Typography></CustomTitlePaper>

                        <CustomBody sx={{ bgcolor: '#f7dfdf' }}>
                            {quote.partnerServiceList.map((partnerService, index) =>
                                <Box>
                                    <Grid container spacing={3} sx={{ width: '100%' }}>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Serviço: <span>{partnerService.name}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Parceiro: <span>{partnerService.outsourced?.name}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Quantidade: <span>{partnerService.quantity}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} lg={3}>
                                            <Typography>
                                                Custo Total: <span>{formatValue(partnerService.totalCost)}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <CustomDivider isLastItem={(quote.partnerServiceList.length - 1) === index} />
                                </Box>
                            )}
                        </CustomBody>
                    </React.Fragment>
                )
            }

            <CustomTitlePaper><Typography>Cálculos Finais</Typography></CustomTitlePaper>

            <CustomBody>
                <Box>
                    <Grid container spacing={3} sx={{ width: '100%' }}>
                        <Grid item xs={6} lg={6}>
                            <Typography>
                                Valor Total dos Produtos: <span>{getTotalProductValue()}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <Typography>
                                Valor Total dos Serviços: <span>{getTotalServiceValue()}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <Typography>
                                Custo Total dos Insumo: <span>{getMaterialTotalCost()}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <Typography>
                                Custo Total da Terceirização: <span>{getPartnerServiceListTotalCost()}</span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        marginTop={'15px'}
                        width={'100%'}
                        sx={{
                            background: '#e8fcfc',
                            '& .MuiTypography-root': {
                                color: '#2775A2',
                                fontWeight: 'bolder',
                                fontFamily: 'sans-serif',
                                fontSize: '20px',
                                '& span': {
                                    color: totalQuote > 0 ? '#1F7A1F' : '#FF0000',
                                },
                            },
                        }}
                    >
                        <Typography >
                            TOTAL: <span>{formatValue(totalQuote)}</span>
                        </Typography>
                    </Box>
                </Box>
            </CustomBody >

            <CustomToast
                open={openToast}
                severity={infoToCustomToast.severity}
                info={infoToCustomToast.info}
                handleOnClose={() => setOpenToast(false)}
            />
        </Box >
    )
}
