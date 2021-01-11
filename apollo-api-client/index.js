const axios = require('axios')

// Returns an API instance for Apollo
function get_client(token, options = {}) {
    // use for regular API
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    if (token) headers['X-Authenticated-User'] = token

    const instance = axios.create({
        timeout: 10000,
        headers: headers,
    })

    let api = {}

    // Authenticated routes
    // Removed array to support React Native's Metro bundler
    if (token) {
        api.appointments = require('./src/appointments')(instance, options)
        api.patients = require('./src/patients')(instance, options)
    }
    // Unauthenticated routes
    else {
        api.patients = require('./src/patients')(instance, options)
    }

    return api
}

module.exports = { get_client }
