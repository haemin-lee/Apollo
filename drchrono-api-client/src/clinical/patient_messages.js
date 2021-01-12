const endpoints = require('../endpoint')
const validate_params = require('../helpers/validate_params')

// Implements the DrChrono appointments API
// https://devinmui.drchrono.com/api-docs/#operation/appointments_list
module.exports = (instance, options = {}) => {
    const url = (options.url ? options.url : endpoints.ROOT) + '/appointments'

    async function get_appointments(options) {
        const res = await instance.get(url)
        return res.data
    }

    return {
        get_appointments,
    }
}
