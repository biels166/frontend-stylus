import {
    CustomUserIcon,
    CustomClientIcon,
    CustomProductIcon,
    CustomMaterialsIcon,
    CustomQuoteIcon,
    CustomOSIcon,
    CustomHomeIcon
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
    const { isAdm, userPage, clientPage, productPage, materialPage, } = useAuth()
    return [
        //Homa
        {
            index: 0,
            name: 'Home',
            path: '/home',
            icon: CustomHomeIcon,
            roles: [],
            element: <TaskBoard/>,
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
        //Produtos e Serviços
        {
            index: 3,
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
        //Materiais
        {
            index: 4,
            name: 'Materiais',
            path: '/materiais',
            icon: CustomMaterialsIcon,
            element: <MaterialList />,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_MATERIAL
            ],
            enable: isAdm || materialPage.Viewer,
            show: true
        },
        //Cotações
        {
            index: 5,
            name: 'Cotações',
            path: '/cotacoes',
            icon: CustomQuoteIcon,
            element: <h1>Cotações</h1>,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_COTACAO
            ],
            enable: isAdm,
            show: false
        },
        //Ordens de Serviço
        {
            index: 6,
            name: 'Ordens de Serviço',
            path: '/ordens',
            icon: CustomOSIcon,
            element: <h1>Ordens de Serviço</h1>,
            roles: [
                process.env.REACT_APP_ADMINISTRADOR,
                process.env.REACT_APP_VISUALIZAR_OS
            ],
            enable: isAdm,
            show: false
        },
    ]
}
