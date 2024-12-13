import * as React from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../services/api'


export function useValidateToken() {
    const [isExpiredOrInvalid, setIsExpiredOrInvalid] = React.useState(false)
    const token = localStorage.getItem('StylusToken')

    React.useEffect(() => {
        const validate = async () => {
            if (token) {
                const decode = jwtDecode(token)

                if (decode) {
                    if (decode.exp * 1000 < Date.now()) {
                        setIsExpiredOrInvalid(true)
                    }
                    else {
                        setIsExpiredOrInvalid(false)
                    }
                }
                else {
                    setIsExpiredOrInvalid(true)
                }
            }
            else {
                setIsExpiredOrInvalid(true)
            }
        }
        validate()

        window.addEventListener('storage', validate)
        return () => window.removeEventListener('storage', validate)
    }, [token])

    return isExpiredOrInvalid
}

export function useToken() {
    const [stylusToken, setStylusToken] = React.useState('');
    const invalidToken = useValidateToken()

    React.useEffect(() => {
        const token = localStorage.getItem('StylusToken') || ''

        const validateAndRefreshToken = async () => {
            const user = localStorage.getItem('User')

            if (invalidToken) {
                localStorage.removeItem('StylusToken');

                if (user) {
                    try {
                        const { login, password } = JSON.parse(user)

                        const response = await api.AuthUserLogin(login, password);
                        const newToken = response.data.token;

                        localStorage.setItem('StylusToken', newToken);
                        setStylusToken(newToken);
                    } catch (error) {
                        console.error('Erro ao renovar o token:', error);
                    }
                }
            } else {
                setStylusToken(token);
            }
        }

        validateAndRefreshToken()

        window.addEventListener('storage', validateAndRefreshToken)
        return () => window.removeEventListener('storage', validateAndRefreshToken)
    }, [])

    return stylusToken;
}

export function useRoles() {
    const [roles, setRoles] = React.useState([])
    const token = localStorage.getItem('StylusToken')

    React.useEffect(() => {
        const loadRoles = () => {
            if (token) {
                try {
                    const stringRoles = jwtDecode(token).roles
                    setRoles(stringRoles.split(' ') || [])
                }
                catch (error) {
                    console.error('Erro ao decodificar Token', error)
                    setRoles([])
                }
            }
            else {
                console.error('Não foi possível encontrar StylusToken')
                setRoles([])
            }
        }

        loadRoles()

        window.addEventListener('storage', loadRoles)
        return () => window.removeEventListener('storage', loadRoles)

    }, [token])

    return roles
}

export function useUserData() {
    const [userData, setUserData] = React.useState({})

    React.useEffect(() => {
        const loadUserData = () => {
            const userLocalStorage = localStorage.getItem('User')

            if (userLocalStorage) {
                try {
                    setUserData(JSON.parse(userLocalStorage) || {})
                }
                catch (error) {
                    console.error('Erro ao obter dados do UserLocal', error)
                    setUserData({})
                }
            }
            else {
                console.error('Não foi possível encontrar UserLocal')
                setUserData({})
            }
        }

        loadUserData()

        window.addEventListener('storage', loadUserData)
        return () => window.removeEventListener('storage', loadUserData)

    }, [])

    return userData
}

export function useLogout() {
    const [loggedOut, setLoggedOut] = React.useState(false)

    React.useEffect(() => {
        const logout = () => {
            localStorage.removeItem('User')
            localStorage.removeItem('StylusToken')

            const user = localStorage.getItem('User')
            const token = localStorage.getItem('StylusToken')

            if (!user && !token)
                setLoggedOut(true)
            else {
                setLoggedOut(false)
                logout()
            }
        }

        logout()
    }, [])

    return loggedOut
}
