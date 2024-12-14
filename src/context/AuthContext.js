import { createContext, useContext, useEffect, useState } from "react"
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const defaultPermissionObject = {
        Viewer: false,
        Creator: false,
        Editor: false,
        Exclusor: false
    }

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [stylusToken, setStylusToken] = useState('')
    const [isValidToken, setIsValidToken] = useState(false)
    const [isAdm, setIsAdm] = useState(false)
    const [userPage, setUserPage] = useState(defaultPermissionObject)
    const [clientPage, setClientPage] = useState(defaultPermissionObject)
    const [productPage, setProductPage] = useState(defaultPermissionObject)
    const [materialPage, setMaterialPage] = useState(defaultPermissionObject)
    const [quotePage, setQuotePage] = useState(defaultPermissionObject)
    const [orderPage, setOrderPage] = useState(defaultPermissionObject)
    const [allRoles, setAllRoles] = useState([])

    const handleResetRoleStates = () => {
        setIsAdm(false)
        setUserPage(defaultPermissionObject)
        setClientPage(defaultPermissionObject)
        setProductPage(defaultPermissionObject)
        setMaterialPage(defaultPermissionObject)
        setQuotePage(defaultPermissionObject)
        setOrderPage(defaultPermissionObject)
        setAllRoles([])
    }

    const validateToken = () => {
        const token = localStorage.getItem('StylusToken')
        const localUser = localStorage.getItem('User')

        if (!token) {
            handleResetRoleStates()
            setUser(null)
            setIsValidToken(false)
            setLoading(false)
            return
        }

        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            //opção para pegar os dados do token, mais seguro pois não expõem os dados do usuário no storage
            const dynLocalUser = JSON.parse(localUser)
            const expiresIn = JSON.parse(atob(token.split('.')[1])).exp
            const isValid = expiresIn * 1000 > Date.now()

            setIsValidToken(isValid)

            const roles = dynLocalUser.roles.filter(r => r.value)

            setStylusToken(token)
            
            setUser(dynLocalUser)

            setIsAdm(dynLocalUser.admnistrator)

            setAllRoles(roles)

            const rolesUserPage = roles.filter(r => r.category === 'usuario')
            setUserPage({
                Viewer: rolesUserPage.some(r => r.description.includes('VISUALIZAR')),
                Creator: rolesUserPage.some(r => r.description.includes('ADICIONAR')),
                Editor: rolesUserPage.some(r => r.description.includes('EDITAR')),
                Exclusor: rolesUserPage.some(r => r.description.includes('REMOVER')),
            })

            const rolesClientPage = roles.filter(r => r.category === 'cliente')
            setClientPage({
                Viewer: rolesClientPage.some(r => r.description.includes('VISUALIZAR')),
                Creator: rolesClientPage.some(r => r.description.includes('ADICIONAR')),
                Editor: rolesClientPage.some(r => r.description.includes('EDITAR')),
                Exclusor: rolesClientPage.some(r => r.description.includes('REMOVER')),
            })

            const rolesProductPage = roles.filter(r => r.category === 'produto')
            setProductPage({
                Viewer: rolesProductPage.some(r => r.description.includes('VISUALIZAR')),
                Creator: rolesProductPage.some(r => r.description.includes('ADICIONAR')),
                Editor: rolesProductPage.some(r => r.description.includes('EDITAR')),
                Exclusor: rolesProductPage.some(r => r.description.includes('REMOVER')),
            })

            const rolesMaterialPage = roles.filter(r => r.category === 'material')
            setMaterialPage({
                Viewer: rolesMaterialPage.some(r => r.description.includes('VISUALIZAR')),
                Creator: rolesMaterialPage.some(r => r.description.includes('ADICIONAR')),
                Editor: rolesMaterialPage.some(r => r.description.includes('EDITAR')),
                Exclusor: rolesMaterialPage.some(r => r.description.includes('REMOVER')),
            })

            const rolesQuotePage = roles.filter(r => r.category === 'cotacao')
            setQuotePage({
                Viewer: rolesQuotePage.some(r => r.description.includes('VISUALIZAR')),
                Creator: rolesQuotePage.some(r => r.description.includes('ADICIONAR')),
                Editor: rolesQuotePage.some(r => r.description.includes('EDITAR')),
                Exclusor: rolesQuotePage.some(r => r.description.includes('REMOVER')),
            })

            const rolesOSPage = roles.filter(r => r.category === 'ordem')
            setOrderPage({
                Viewer: rolesOSPage.some(r => r.description.includes('VISUALIZAR')),
                Creator: rolesOSPage.some(r => r.description.includes('ADICIONAR')),
                Editor: rolesOSPage.some(r => r.description.includes('EDITAR')),
                Exclusor: rolesOSPage.some(r => r.description.includes('REMOVER')),
            })
        }
        catch (error) {
            console.error('Token inválido', error)

            localStorage.removeItem('StylusToken')
            localStorage.removeItem('User')

            handleResetRoleStates()
            setUser(null)
        }

        setLoading(false)
    }

    const login = (token, userLogin, navigate) => {
        localStorage.setItem('StylusToken', token)
        localStorage.setItem('User', JSON.stringify(userLogin))

        validateToken()
    //    navigate('/home')
    }

    const logout = (navigate) => {
        localStorage.removeItem('StylusToken')
        localStorage.removeItem('User')

        handleResetRoleStates()
        setUser(null)

        //navigate('/login')
    }


    useEffect(() => {
        validateToken()
    }, [])

    return (
        <AuthContext.Provider
            value={
                { 
                    stylusToken, 
                    isValidToken, 
                    user, 
                    isAdm, 
                    userPage, 
                    clientPage, 
                    productPage, 
                    materialPage, 
                    quotePage,
                    orderPage,
                    allRoles,
                    login, 
                    logout, 
                    loading
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
