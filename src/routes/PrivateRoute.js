import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './../context/AuthContext';
import LoadingValiationPage from '../components/LoadingValiationPage';

export const PrivateRoute = () => {
    const {
        isValidToken,
        user,
        loading,
        isAdm,
        userPage,
        clientPage,
        partnerPage,
        productPage,
        materialPage,
        quotePage,
        orderPage
    } = useAuth()

    const location = useLocation()
    const currentPath = location.pathname

    React.useEffect(() => {
    }, [location])

    if (loading)
        return <LoadingValiationPage />


    if (!isValidToken)
        return <Navigate to='/login' />


    if (currentPath === '/')
        return <Navigate to='/home' />

    if (
        !isAdm && (
            (currentPath === '/usuarios' && !userPage.Viewer) ||
            (currentPath.includes('/clientes') && !clientPage.Viewer) ||
            (currentPath.includes('/parceiros') && !partnerPage.Viewer) ||
            (currentPath === '/produtos' && !productPage.Viewer) ||
            (currentPath === '/materiais' && !materialPage.Viewer) ||
            (currentPath.includes('/estoque') && !materialPage.Viewer) ||
            (currentPath === '/listagem-cotacao' && !quotePage.Viewer) ||
            (currentPath === '/visualizar-cotacao' && !quotePage.Viewer) ||
            (currentPath === '/criar-cotacao' && !quotePage.Creator) ||
            (currentPath === '/visualizar-ordem' && !orderPage.Viewer) ||
            (currentPath === '/ordens' && !orderPage.Viewer)
        )
    )
        return <Navigate to='/401' />

    return (user && isValidToken) ? <Outlet /> : <Navigate to='/login' />
}


