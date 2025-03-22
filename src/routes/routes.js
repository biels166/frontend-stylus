import * as React from 'react'
import Login from '../views/Login'
import { Menu } from '../views/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LogoutUser from '../views/Logout'
import { NavItems } from '../components/Menu/Nav/Nav'
import NotFoundPage from '../views/Errors/NotFound'
import InternalErrorPage from '../views/Errors/InternalError'
import UnauthorizedPage from '../views/Errors/Unauthorized'
import { PrivateRoute } from './PrivateRoute'
import { ClientDataTabs } from '../components/Clientes/ClientData'
import { PartnerDataTabs } from '../components/Partners/PartnerData'
import { MaterialList } from '../components/Materials/List'
import { CreateQuotePage } from '../components/Quotes/CreateQuote'
import { QuoteList } from '../components/Quotes/List'
import { QuoteVisualizer } from '../components/Quotes/Viewer'
import { ServiceOrderVisualizer } from '../components/ServiceOrder/Viewer'

export const Routering = () => {
    const menuItens = NavItems()

    return (
        <Router>
            <Routes>
                {/*Rotas públicas que não passam pela autenticação*/}
                <Route path='/login' element={<Login />} />

                {/*Rotas privadas que precisam autenticação*/}
                <Route element={<PrivateRoute />} >
                    {menuItens.length > 0 && (
                        <Route path='/' element={<Menu />} >
                            {
                                menuItens.filter(r => r.show).map(item => (
                                    <React.Fragment>
                                        <Route
                                            key={item.index}
                                            path={item.path}
                                            element={item.element}
                                        />

                                        <Route path='/clientes/:clientId' element={<ClientDataTabs />} />
                                        <Route path='/parceiros/:partnerId' element={<PartnerDataTabs />} />
                                        <Route path='/estoque/:itemId' element={<MaterialList />} />
                                        <Route path='/criar-cotacao' element={<CreateQuotePage />} />
                                        <Route path='/rascunho-cotacao/:number' element={<CreateQuotePage />} />
                                        <Route path='/listagem-cotacao' element={<QuoteList />} />
                                        <Route path='/visualizar-cotacao/:number' element={<QuoteVisualizer />} />
                                        <Route path='/visualizar-ordem/:number' element={<ServiceOrderVisualizer />} />
                                    </React.Fragment>
                                ))
                            }
                        </Route>
                    )}

                    <Route path='/logout' element={<LogoutUser />} />
                </Route>

                {/*Redirecionamento das páginas de erro*/}
                <Route path='/404' element={<NotFoundPage />} />
                <Route path='/500' element={<InternalErrorPage />} />
                <Route path='/401' element={<UnauthorizedPage />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

