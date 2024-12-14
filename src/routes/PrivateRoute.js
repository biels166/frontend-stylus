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
        productPage,
        materialPage,
        quotePage,
        orderPage
    } = useAuth()

    const location = useLocation()
    const currentPath = location.pathname

    React.useEffect(() => {
        console.log("provate router currente page", location)
    },[location])

    if (loading)
        return <LoadingValiationPage />


    if (!isValidToken)
        return <Navigate to='/login' />

    if (
        !isAdm && (
            (currentPath === '/usuarios' && !userPage.Viewer) ||
            (currentPath.includes('/clientes') && !clientPage.Viewer) ||
            (currentPath === '/produtos' && !productPage.Viewer) ||
            (currentPath === '/materiais' && !materialPage.Viewer) ||
            (currentPath === '/cotacoes' && !quotePage.Viewer) ||
            (currentPath === '/ordens' && !orderPage.Viewer)
        )
    )
        return <Navigate to='/401' />


    return (user && isValidToken) ? <Outlet /> : <Navigate to='/login' />
}


