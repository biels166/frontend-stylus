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

    const body = { ...task }
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

//#region PartnerController
api.PaginatedPartnerList = async (filter, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { ...filter, pageNumber: pageNumber - 1, rowsPage }

    console.log('body PaginatedPartnerList', body)
    
    return await api.post('/partner/list', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                partners: response.data.partners
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
                partners: []
            }
        })
}

api.GetSupplierOptions = async (category) => {
    ConfigureHeader()

    return await api.get(`/partner/suppliers/${category}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                partners: response.data.partners
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
                partners: []
            }
        })
}

api.CreatePartner = async (partnerData) => {
    ConfigureHeader()

    const body = { ...partnerData }

    return await api.post('/partner', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                partner: response.data.partner
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                partner: null
            }
        })
}

api.UpdatePartner = async (partnerData) => {
    ConfigureHeader()

    const body = { ...partnerData }

    return await api.put(`/partner/${partnerData._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                partner: response.data.partner
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                partner: null
            }
        })
}

api.GetPartnerById = async (partnerId) => {
    ConfigureHeader()

    return await api.get(`/partner/${partnerId}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: 'Dados carregados com sucesso.',
                partner: response.data
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                partner: null
            }
        })
}

api.DeletePartner = async (partnerId) => {
    ConfigureHeader()

    return await api.delete(`/partner/${partnerId}`)
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

api.PaginatedOfferedList = async (partnerId, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = {
        partnerId, pageNumber: pageNumber - 1, rowsPage
    }

    return await api.post('/partner/offered/list', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                offered: response.data.offered
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
                offered: []
            }
        })
}

api.CreateOffered = async (offeredData) => {
    ConfigureHeader()

    const body = { ...offeredData }

    return await api.post('/partner/offered', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                offered: response.data.offered
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                offered: null
            }
        })
}

api.UpdateOffered = async (offeredData) => {
    ConfigureHeader()

    const body = { ...offeredData }

    return await api.put(`/partner/offered/${offeredData._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                offered: response.data.offered
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                offered: null
            }
        })
}

api.DeleteOffered = async (offeredId) => {
    ConfigureHeader()

    return await api.delete(`/partner/offered/${offeredId}`)
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
api.PaginatedContactListByPerson = async (personId, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { personId, pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/contacts/list', body)
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

    const body = { ...contactData }
    return await api.post('/contacts', body)
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

    const body = { ...contactData }

    return await api.put(`/contacts/${contactData._id}`, body)
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

    return await api.delete(`/contacts/${contactId}`)
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

    const body = { ...NFe }
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

//#region CategoryController
api.CreateCategory = async (category) => {
    ConfigureHeader()

    const body = { ...category }
    return await api.post('/category', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                category: response.data.category
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                category: null
            }
        })
}

api.GetCategoryOptions = async () => {
    ConfigureHeader()

    return await api.get('/category/listCategories')
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                categories: response.data.options
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                categories: null
            }
        })
}

api.CreateItemCategory = async (item) => {
    ConfigureHeader()

    const body = { ...item }
    return await api.post('/category/item', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                item: response.data.item
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                item: null
            }
        })
}

api.UpdateItemCategory = async (item) => {
    ConfigureHeader()

    const body = { ...item }
    return await api.put(`/category/item/${item._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                item: response.data.item
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                item: null
            }
        })
}

api.DeleteItemCategory = async (id) => {
    ConfigureHeader()

    return await api.delete(`/category/item/${id}`)
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

api.GetByItemCode = async (itemCode) => {
    ConfigureHeader()

    return await api.get(`category/item/${itemCode}`)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: 'Dados carregados com sucesso.',
                item: response.data
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                item: null
            }
        })
}

api.PaginatedItensByCategory = async (filter, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { ...filter, pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/category/listItemByCategory', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                itens: response.data.itens
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
                itens: []
            }
        })
}

api.GetAllItensByCategory = async (categoriesCode) => {
    ConfigureHeader()

    return await api.post('/category/getItemByCategory', categoriesCode)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                itens: response.data.itens
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
                itens: []
            }
        })
}
//#endregion

//#region MaterialController
api.PaginatedMaterialListByFilter = async (filter, pageNumber, rowsPage) => {
    ConfigureHeader()

    const body = { filter, pageNumber: pageNumber - 1, rowsPage }

    return await api.post('/material/listByFilter', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: '',
                total: response.data.total,
                pages: response.data.pages,
                materials: response.data.materials
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
                materials: []
            }
        })
}

api.CreateMaterial = async (materialData) => {
    ConfigureHeader()

    const body = { ...materialData, callFromFront: true }
    return await api.post('/material', body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                material: response.data.material
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                material: null
            }
        })
}

api.UpdateMaterial = async (materialData) => {
    ConfigureHeader()

    const body = { ...materialData, callFromFront: true }

    return await api.put(`/material/${materialData._id}`, body)
        .then(response => {
            return {
                success: true,
                status: 'success',
                message: response.data.msg,
                material: response.data.material
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                message: error.response.data.error ?? error,
                material: null
            }
        })
}

api.DeleteMaterial = async (materialID) => {
    ConfigureHeader()

    return await api.delete(`/material/${materialID}`)
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

api.GetMaterialCodeOptions = async () => {
    ConfigureHeader()

    return await api.get('/material/list/codeMaterial')
        .then(response => {
            return {
                success: true,
                status: 'success',
                options: response.data.options
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                options: []
            }
        })
}

api.GetMaterialTypeOptions = async () => {
    ConfigureHeader()

    return await api.get('/material/list/type')
        .then(response => {
            return {
                success: true,
                status: 'success',
                options: response.data.options
            }
        })
        .catch(error => {
            console.error(error)
            return {
                success: false,
                status: 'error',
                options: []
            }
        })
}
//#endregion
export default api 
