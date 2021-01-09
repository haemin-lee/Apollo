const endpoints = require('./endpoint')
const validate_params = require('./helpers/validate_params')

module.exports = (instance, options = {}) => {
    const url =
        (options.url !== false ? options.url : endpoints.ROOT) + '/patients'

    async function get_patients(options) {
        const res = await instance.get(url)
        return res.data
    }

    async function get_patient(id, options) {
        const uri = `/${id}`
        const res = await instance.get(url + uri)
        return res.data
    }

    async function login(contact, password) {
        const uri = '/login'
        const res = await instance.post(url + uri, {
            contact: contact,
            password: password,
        })
        return res.data
    }

    async function create_account(contact, password) {
        const uri = '/create-account'
        const res = await instance.post(url + uri, {
            contact: contact,
            password: password,
        })
        return res.data
    }

    return {
        get_patients,
        get_patient,
        login,
        create_account,
    }
}
