const axios = require('axios')

const oauth2_api_function_names = [
    'account_information',
    'consumer',
    'corporate_user_profile',
]

const server_api_function_names = [
    'users',
    'sheets',
    'analyze',
    'translate',
    'loans',
]

// Get the access token to create client
async function get_token(code, options = {}) {
    // specify url or default
    const url = options.url || '/oauth/token'
    const token_res = await axios.get(url, { params: { code: code } })
    return token_res
}

// Returns an API instance for OAuth2 auth with FusionFabric.cloud
// Inspired by code from https://github.com/Schmavery/facebook-chat-api/blob/master/index.js
function get_client(access_token, options = {}) {
    let headers = {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    // use for regular API
    if (options.user_id) headers['X-Authenticated-User'] = options.user_id

    const instance = axios.create({
        timeout: 10000,
        headers: headers,
    })

    let api = {}
    oauth2_api_function_names.map((name) => {
        api[name] = require(`./src/${name}`)(instance, options)
    })

    // requires custom url
    // idk name it server_url
    // also tfw no planning tfw ur bad tfw
    if (options.user_id)
        server_api_function_names.map((name) => {
            api[name] = require(`./src/${name}`)(instance, options)
        })

    return api
}

module.exports = { get_client, get_token }
