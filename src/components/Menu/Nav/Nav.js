import {
    CustomUserIcon,
    CustomClientIcon,
    CustomProductIcon,
    CustomMaterialsIcon,
    CustomQuoteIcon,
    CustomOSIcon,
    CustomHomeIcon,
    PartnersIcon,
    CustomCategoryIcon,
    CustomCreateQuoteIcon,
    CustomListQuoteIcon
} from './styles'
import { UserList } from '../../Users/List'
import { ClientList } from '../../Clientes/List'
import { MaterialList } from '../../Materials/List'
import { ProductsAndServices } from '../../Products'
import { useAuth } from '../../../context/AuthContext'
import UnauthorizedPage from '../../../views/Errors/Unauthorized'
import NotFoundPage from '../../../views/Errors/NotFound'
import InternalErrorPage from '../../../views/Errors/InternalError'
import { ClientDataTabs } from '../../Clientes/ClientData'
import { TaskBoard } from '../../../views/TaskBoard'
import { CategoryTabs } from '../../Category'
import { PartnerList } from './../../Partners/List/index';
import { StockList } from '../../stock/List'
import { CreateQuotePage } from '../../Quotes/CreateQuote'
import { QuoteList } from '../../Quotes/List'
import { QuoteVisualizer } from '../../Quotes/Viewer'
import { ServiceOrderList } from '../../ServiceOrder/List'
import { ServiceOrderVisualizer } from '../../ServiceOrder/Viewer'

export const NavErrors = () => {
    return [
        {
            path: '/401',
            element: <UnauthorizedPage />,
        },
        {
            path: '/404',
            element: <NotFoundPage />,
        },
        {
            path: '/500',
            element: <InternalErrorPage />,
        },
    ]
}

export const NavItems = () => {
    const { isAdm, userPage, clientPage, partnerPage, productPage, materialPage, quotePage, orderPage } = useAuth()
    return [
        //Homa
        {
            index: 0,
            name: 'Home',
            path: '/home',
            icon: CustomHomeIcon,
            roles: [],
            element: <TaskBoard />,
            enable: true,
            show: true
        },
        //Usuários
        {
            index: 1,
            name: 'Usuários',
            path: '/usuarios',
            icon: CustomUserIcon,
            element: <UserList />,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_USUARIO
            ],
            enable: isAdm || userPage.Viewer,
            show: true
        },
        //Cliente
        {
            index: 2,
            name: 'Clientes',
            path: '/clientes',
            icon: CustomClientIcon,
            element: <ClientList />,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_CLIENTE
            ],
            enable: isAdm || clientPage.Viewer,
            show: true,
            children: [
                {
                    index: 2,
                    name: 'Dados do Clientes',
                    path: '/clientes/:clientId',
                    enable: isAdm || clientPage.Viewer,
                    show: true,
                    element: <ClientDataTabs />,
                }
            ]
        },
        //Parceiros
        {
            index: 3,
            name: 'Parceiros',
            path: '/parceiros',
            icon: PartnersIcon,
            element: <PartnerList />,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_PARCEIRO
            ],
            enable: isAdm || partnerPage.Viewer,
            show: true,
            children: [
                {
                    index: 3,
                    name: 'Dados do Parceiro',
                    path: '/parceiros/:partnerId',
                    enable: isAdm || partnerPage.Viewer,
                    show: true,
                    element: <ClientDataTabs />,
                }
            ]
        },
        //Produtos e Serviços
        {
            index: 4,
            name: 'Produtos e Serviços',
            path: '/produtos',
            icon: CustomProductIcon,
            element: <ProductsAndServices />,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_PRODUTO
            ],
            enable: isAdm || productPage.Viewer,
            show: true
        },
        //Categoria de Materiais
        {
            index: 5,
            name: 'Categoria de Materiais',
            path: '/materiais',
            icon: CustomCategoryIcon,
            element: <CategoryTabs />,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_MATERIAL
            ],
            enable: isAdm || materialPage.Viewer,
            show: true
        },
        //Estoque
        {
            index: 6,
            name: 'Estoque',
            path: '/estoque',
            icon: CustomMaterialsIcon,
            element: <StockList />,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_MATERIAL
            ],
            enable: isAdm || materialPage.Viewer,
            show: true,
            children: [
                {
                    index: 6,
                    name: 'Estoque',
                    path: '/estoque/:itemId',
                    enable: isAdm || materialPage.Viewer,
                    show: true,
                    element: <MaterialList />,
                }
            ]
        },
        //Cotações
        {
            index: 7,
            name: 'Cotações',
            path: '/cotacoes',
            icon: CustomQuoteIcon,
           // element: <CreateQuotePage />,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_COTACAO
            ],
            enable: isAdm || quotePage.Viewer,
            show: true,
            subItens: [
                {
                    index: 8,
                    name: 'Lista de Cotações',
                    path: '/listagem-cotacao',
                    icon: CustomListQuoteIcon,
                    enable: isAdm || quotePage.Viewer,
                    show: true,
                    element: <QuoteList/>,
                    children: [
                        {
                            index: 8,
                            name: 'Visualizar Cotação',
                            path: '/visualizar-cotacao/:number',
                            enable: isAdm || quotePage.Viewer,
                            show: true,
                            element: <QuoteVisualizer />,
                        }
                    ]
                },
                {
                    index: 9,
                    name: 'Criar Nova Cotação',
                    path: '/criar-cotacao',
                    icon: CustomCreateQuoteIcon,
                    enable: isAdm || quotePage.Creator,
                    show: true,
                    element: <CreateQuotePage />,
                },
            ]
        },
        //Ordens de Serviço
        {
            index: 10,
            name: 'Ordens de Serviço',
            path: '/ordens',
            icon: CustomOSIcon,
            element: <ServiceOrderList />,
            enable: isAdm,
            show: true,
            children: [
                {
                    index: 10,
                    name: 'Visualizar Ordem de Serviço',
                    path: '/visualizar-ordem/:number',
                    enable: isAdm || orderPage.Viewer,
                    show: true,
                    element: <ServiceOrderVisualizer />,
                }
            ]
        },
    ]
}
