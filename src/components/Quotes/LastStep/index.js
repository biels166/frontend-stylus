import React, { useCallback, useEffect, useState } from 'react'
import { Box, Grid, TextField } from '@mui/material'
import { CustomBody, CustomDivider, CustomTitlePaper } from './styles'
import { CustomToast } from '../../Toast'
import Typography from '@mui/joy/Typography'
import { docType, formatDateFromFront, formatValue } from '../../../utils'

export const LastQuoteStep = ({
    quote, cacheQuote = () => { }
}) => {
    const [openToast, setOpenToast] = useState(false)
    const [infoToCustomToast, setInfoToCustomToast] = useState({})

    const hasRegister = (value = '') => { return value.length > 0 ? value : '-' }

    const getTotalValueWithRates = useCallback(() => {
        let deliveryRate = 0
        let urgencyRate = 0
        let discount = 0

        try {
            deliveryRate = parseFloat(quote.deliveryRate)
        } catch { }

        try {
            urgencyRate = parseFloat(quote.urgencyRate) / 100
        } catch { }

        try {
            discount = parseFloat(quote.discount) / 100
        } catch { }

        let totalWithRate = quote.totalWithoutRate

        let totalRate = 0

        if (urgencyRate > 0) totalRate += urgencyRate

        if (discount > 0) totalRate -= discount

        totalWithRate = totalWithRate * (1 + totalRate)

        if (deliveryRate > 0) totalWithRate = totalWithRate + deliveryRate

        return totalWithRate

    }, [quote])

    useEffect(() => {
        getTotalValueWithRates()
    }, [])

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
                                Valor Total dos Produtos: <span>{formatValue(quote.productsValue)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <Typography>
                                Valor Total dos Serviços: <span>{formatValue(quote.servicesValue)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <Typography>
                                Custo Total dos Insumo: <span>{formatValue(quote.materialsCost)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <Typography>
                                Custo Total da Terceirização: <span>{formatValue(quote.partnerServicesCost)}</span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        gap={'10px'}
                        marginBottom={'20px'}
                        sx={{
                            '& .MuiTextField-root': {
                                m: 1,
                                '& .MuiInputBase-root': {
                                    '&:before': {
                                        borderColor: '#2775A2', // Borda padrão
                                    },
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderColor: '#2775A2', // Borda ao passar o mouse
                                    },
                                    '&.Mui-focused:before': {
                                        borderColor: '#2775A2', // Borda ao focar no campo
                                    },
                                },
                            },
                        }}
                    >
                        <TextField
                            variant='standard'
                            id="outlined-required-deliveryRate"
                            label="Taxa de Entrega (R$)"
                            placeholder="digite o valor da taxa de entrega"
                            value={quote?.deliveryRate}
                            onChange={(e) => {
                                cacheQuote({ ...quote, deliveryRate: e.target.value.replace(/[^\d.,]/g, '') })
                            }}
                        />

                        <TextField
                            variant='standard'
                            id="outlined-required-urgencyRate"
                            label="Taxa de Urgência (%)"
                            placeholder="digite o valor da taxa de urgência"
                            value={quote?.urgencyRate}
                            onChange={(e) => {
                                cacheQuote({ ...quote, urgencyRate: e.target.value.replace(/[^\d.,]/g, '') })
                            }}
                        />

                        <TextField
                            variant='standard'
                            id="outlined-required-discount"
                            label="Desconto (%)"
                            placeholder="digite o valor do desconto"
                            value={quote?.discount}
                            onChange={(e) => {
                                cacheQuote({ ...quote, discount: e.target.value.replace(/[^\d.,]/g, '') })
                            }}
                        />
                    </Box>

                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
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
                                        color: '#363636',
                                    },
                                },
                            }}
                        >
                            <Typography >
                                Valor Bruto Total: <span>{formatValue(getTotalValueWithRates())}</span>
                            </Typography>
                        </Box>

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
                                        color: getTotalValueWithRates() > 0 ? '#1F7A1F' : '#FF0000',
                                    },
                                },
                            }}
                        >
                            <Typography >
                                Lucro Liquido: <span>{formatValue(getTotalValueWithRates() - (quote.materialsCost + quote.partnerServicesCost))}</span>
                            </Typography>
                        </Box>
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
