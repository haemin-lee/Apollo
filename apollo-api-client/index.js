const axios = require('axios')

const api_function_names = ['appointments', 'patients']
const unauthenticated_api_function_names = ['patients']

// Returns an API instance for Apollo
// Inspired by code from https://github.com/Schmavery/facebook-chat-api/blob/master/index.js
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
    if (token)
        api_function_names.map((name) => {
            api[name] = require(`./src/${name}`)(instance, options)
        })
    else
        unauthenticated_api_function_names.map((name) => {
            api[name] = require(`./src/${name}`)(instance, options)
        })

    return api
}

module.exports = { get_client }
