import axios from 'axios';

const api = axios.create({
    baseURL:
        process.env.REACT_APP_ENVCONFIG === "DEV"
            ? process.env.REACT_APP_LOCALHOST
            : process.env.REACT_APP_STYLUS_API,
})

function ConfigureHeader() {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('StylusToken')}`
}

//#region AuthController
api.AuthUserLogin = async (login, password) => {
    const body = { login, password, callFromFront: true }

    return await api.post('/auth/login', body)
        .then(response => {

            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                data: response.data
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error
            }
        })
}
//#endregion

//#region UserController
api.PaginatedUserList = async (pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/user/list', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                users: response.data.users
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error,
                total: 0,
                pages: 0,
                users: []
            }
        })

}

api.PaginatedUserListByName = async (name, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { name, pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/user/filterByName', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                users: response.data.users
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                total: 0,
                pages: 0,
                users: []
            }
        })
}

api.CreateUser = async (userData) => {
    ConfigureHeader()

    const body = { ...userData, callFromFront: true }
    return await api.post('/user', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                user: response.data.user
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                user: null
            }
        })
}

api.UpdateUser = async (userData) => {
    ConfigureHeader()

    const body = { ...userData, callFromFront: true }

    return await api.put(`/user/${userData._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                user: response.data.user
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                user: null
            }
        })
}

api.DeleteUser = async (userID) => {
    ConfigureHeader()

    return await api.delete(`/user/${userID}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.message
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
            }
        })
}
//#endregion

//#region ClientController
api.PaginatedClientList = async (pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/client/list', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                clients: response.data.clients
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error,
                total: 0,
                pages: 0,
                clients: []
            }
        })

}

api.PaginatedClientListByName = async (name, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { name, pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/client/filterByName', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                clients: response.data.clients
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                total: 0,
                pages: 0,
                clients: []
            }
        })
}

api.CreateClient = async (clientData) => {
    ConfigureHeader()

    const body = { ...clientData, callFromFront: true }
    return await api.post('/client', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                client: response.data.client
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                client: null
            }
        })
}

api.UpdateClient = async (clientData) => {
    ConfigureHeader()

    const body = { ...clientData, callFromFront: true }

    return await api.put(`/client/${clientData._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                client: response.data.client
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                client: null
            }
        })
}

api.GetClientById = async (clientId) => {
    ConfigureHeader()

    return await api.get(`/client/${clientId}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: 'Dados carregados com sucesso.',
                client: response.data
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                client: null
            }
        })
}

api.DeleteClient = async (clientId) => {
    ConfigureHeader()

    return await api.delete(`/client/${clientId}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.message
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
            }
        })
}
//#endregion

//#region ContactsController
api.PaginatedContactListByClient = async (clientId, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = {clientId, pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/client-contact/list', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                contacts: response.data.contacts
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error,
                total: 0,
                pages: 0,
                contacts: []
            }
        })

}


api.CreateContact = async (contactData) => {
    ConfigureHeader()

    const body = { ...contactData}
    return await api.post('/client-contact', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                contact: response.data.contact
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                contact: null
            }
        })
}

api.UpdateContact = async (contactData) => {
    ConfigureHeader()

    const body = { ...contactData}

    return await api.put(`/client-contact/${contactData._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                contact: response.data.contact
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                contact: null
            }
        })
}

api.DeleteContact = async (contactId) => {
    ConfigureHeader()

    return await api.delete(`/client-contact/${contactId}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.message
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
            }
        })
}
//#endregion

//#region NFController
api.PaginatedNFListByClient = async (clientId, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { clientId, pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/nf/getNFByClient', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                nfs: response.data.nfs
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                total: 0,
                pages: 0,
                nfs: []
            }
        })
}

api.CreateNFByClientClient = async (NFe) => {
    ConfigureHeader()

    const body = { ...NFe }
    return await api.post('/nf', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                nf: response.data.nf
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                nf: null
            }
        })
}

api.UpdateNF = async (NFe) => {
    ConfigureHeader()

    const body = { ...NFe}
    return await api.put(`/nf/${NFe._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                nf: response.data.nf
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                nf: null
            }
        })
}

api.DeleteNF = async (id) => {
    ConfigureHeader()

    return await api.delete(`/nf/${id}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.message
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
            }
        })
}
//#endregion

//#region TaskController
api.PaginatedTaskByUser = async (filter, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { ...filter, pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/task/list', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                tasks: response.data.tasks
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                total: 0,
                pages: 0,
                tasks: []
            }
        })
}

api.CreateTaskByUser = async (task) => {
    ConfigureHeader()

    const body = { ...task }
    return await api.post('/task', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                task: response.data.task
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                task: null
            }
        })
}

api.UpdateTask = async (task) => {
    ConfigureHeader()

    const body = { ...task}
    return await api.put(`/task/${task._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                task: response.data.task
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                task: null
            }
        })
}

api.DeleteTask = async (id) => {
    ConfigureHeader()

    return await api.delete(`/task/${id}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.message
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
            }
        })
}
//#endregion
export default api 
