export const docType = (documentInput = '') => {
    let docLength = documentInput?.replace(/\D/g, '').length

    return docLength === 14 ? 'CNPJ' : 'CPF'
}

export const formatCellphone = (cellphone = '') => {
    let onlyNumber = cellphone.replace(/\D/g, '')

    const regex = /^(\d{2})(\d{5})(\d{4})$/;

    if (onlyNumber.match(regex)) {
        return onlyNumber.replace(regex, '($1) $2-$3')
    }

    return cellphone

}

export const formatPhone = (phoneNumber = '') => {
    let onlyNumber = phoneNumber.replace(/\D/g, '')

    const regex = /^(\d{2})(\d{4})(\d{4})$/;

    if (onlyNumber.match(regex)) {
        return onlyNumber.replace(regex, '($1) $2-$3')
    }

    return phoneNumber

}

export const formatDocument = (documentNumber = '') => {

    let doc = documentNumber.replace(/\D/g, '')
    let docType = doc.length === 14 ? 'CNPJ' : 'CPF'

    return docType === 'CPF' ?
        doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        : doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

}

export const formatDate = (date = new Date()) => {
    return new Date(date).toLocaleDateString('pt-BR')
}

export const formatValue = (value = 0) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}