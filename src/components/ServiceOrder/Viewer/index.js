import React, { useCallback, useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { CustomBody, CustomDivider, CustomTitlePaper, CustomPaper, PageTitle } from './styles'
import Typography from '@mui/joy/Typography'
import { docType, formatDateFromFront, formatValue } from '../../../utils'
import { useLocation } from 'react-router-dom'

export const ServiceOrderVisualizer = () => {
    const location = useLocation()
    const order = location?.state

    const hasRegister = (value = '') => { return value.length > 0 ? value : '-' }

    return (
        <React.Fragment>
            <PageTitle>
                <Typography>
                    {`Ordem de Serviço ${order.number} - Concluída em ${formatDateFromFront(order.deliveryDate)}`}
                </Typography>
            </PageTitle>

            <CustomPaper>
                <Box maxHeight={'700px'} overflow={'scroll'}>
                    <CustomTitlePaper><Typography>Dados do Cliente</Typography></CustomTitlePaper>

                    <CustomBody>
                        <Box>
                            <Grid container spacing={3}
                                sx={{ width: '100%' }}>
                                <Grid item xs={4}>
                                    <Typography>
                                        Nome: <span>{order?.client?.name}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        {docType(order?.client?.document)}: <span>{order?.client?.document}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Data de Entrega: <span>{formatDateFromFront(order.deliveryDate)}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Celular: <span>{hasRegister(order?.client?.cellphone)}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Telefone: <span>{hasRegister(order?.client?.telephone)}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        E-mail: <span>{hasRegister(order?.client?.email)}</span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} sx={{ width: '100%', mt: '1px' }}>
                                <Grid item xs={4}>
                                    <Typography>
                                        Logradouro: <span>{order?.client?.street}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Número: <span>{order?.client?.number}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Complemento: <span>{order?.client?.complement}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Bairro: <span>{order?.client?.district}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Cidade: <span>{order?.client?.city}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Estado: <span>{order?.client?.state}</span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </CustomBody>

                    {
                        order.productList.length > 0 && (
                            <React.Fragment>
                                <CustomTitlePaper><Typography>Produtos</Typography></CustomTitlePaper>

                                <CustomBody>
                                    {order.productList.map((product, index) =>
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

                                            <CustomDivider isLasisLastItem={(order.productList.length - 1) === index} />
                                        </Box>
                                    )}
                                </CustomBody>
                            </React.Fragment>
                        )
                    }

                    {
                        order.serviceList.length > 0 && (
                            <React.Fragment>
                                <CustomTitlePaper><Typography>Serviços</Typography></CustomTitlePaper>

                                <CustomBody>
                                    {order.serviceList.map((service, index) =>
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

                                            <CustomDivider isLasisLastItem={(order.serviceList.length - 1) === index} />
                                        </Box>
                                    )}


                                </CustomBody>
                            </React.Fragment>
                        )
                    }

                    {
                        order.materialList.length > 0 && (
                            <React.Fragment>
                                <CustomTitlePaper><Typography>Insumos</Typography></CustomTitlePaper>

                                <CustomBody sx={{ bgcolor: '#f7dfdf' }}>
                                    {order.materialList.map((material, index) =>
                                        <Box>
                                            <Grid container spacing={3} sx={{ width: '100%' }}>
                                                <Grid item xs={4} lg={4}>
                                                    <Typography>
                                                        Insumo: <span>{material.name}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} lg={2}>
                                                    <Typography>
                                                        Lote: <span>{material.batchId}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} lg={2}>
                                                    <Typography>
                                                        Qtd Prevista: <span>{material.quantity}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} lg={2}>
                                                    <Typography>
                                                        Qtd Utilizada: <span>{material.quantityUsed}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} lg={2}>
                                                    <Typography>
                                                        Custo Total: <span>{formatValue(material.totalCost)}</span>
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <CustomDivider isLasisLastItem={(order.materialList.length - 1) === index} />
                                        </Box>
                                    )}


                                </CustomBody>
                            </React.Fragment>
                        )
                    }

                    {
                        order.partnerServiceList.length > 0 && (
                            <React.Fragment>
                                <CustomTitlePaper><Typography>Serviços de Terceiros</Typography></CustomTitlePaper>

                                <CustomBody sx={{ bgcolor: '#f7dfdf' }}>
                                    {order.partnerServiceList.map((partnerService, index) =>
                                        <Box>
                                            <Grid container spacing={3} sx={{ width: '100%' }}>
                                                <Grid item xs={3} lg={3}>
                                                    <Typography>
                                                        Serviço: <span>{partnerService.service}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3} lg={3}>
                                                    <Typography>
                                                        Parceiro: <span>{partnerService.outsourcedName}</span>
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

                                            <CustomDivider isLastItem={(order.partnerServiceList.length - 1) === index} />
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
                                        Valor Total dos Produtos: <span>{formatValue(order.productsValue)}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={6}>
                                    <Typography>
                                        Valor Total dos Serviços: <span>{formatValue(order.servicesValue)}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={6}>
                                    <Typography>
                                        Custo Total dos Insumo: <span>{formatValue(order.materialsCost)}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={6}>
                                    <Typography>
                                        Custo Total da Terceirização: <span>{formatValue(order.partnerServicesCost)}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={6}>
                                    <Typography>
                                        Taxa de Urgência: <span>{`${order?.urgencyRate * 100}%`}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={6}>
                                    <Typography>
                                        Desconto: <span>{`${order?.discount * 100}%`}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={6}>
                                    <Typography>
                                        Taxa de Entrega: <span>{formatValue(order.deliveryRate)}</span>
                                    </Typography>
                                </Grid>
                            </Grid>

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
                                        Valor Bruto Total: <span>{formatValue(order.totalWithRate)}</span>
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
                                                color: order.totalWithRate > 0 ? '#1F7A1F' : '#FF0000',
                                            },
                                        },
                                    }}
                                >
                                    <Typography >
                                        Lucro Liquido: <span>{formatValue(order.totalWithRate - (order.materialsCost + order.partnerServicesCost))}</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CustomBody >
                </Box >
            </CustomPaper>
        </React.Fragment>

    )
}
