const endpoints = require('../endpoint')
const validate_params = require('../helpers/validate_params')

module.exports = (instance, options = {}) => {
    const url = (options.url ? options.url : endpoints.ROOT) + '/appointments'

    async function get_appointments(options) {
        const res = await instance.get(url)
        return res.data
    }

    async function get_appointment_documents(id, options) {
        const uri = `/${id}/documents`
        const res = await instance.get(url + uri)
        return res.data
    }

    async function post_appointment_document(id, doc, options) {
        const uri = `/${id}/documents`
        const res = await instance.post(url + uri, doc)
        return res.data
    }

    return {
        get_appointments,
        get_appointment_documents,
        post_appointment_document,
    }
}
