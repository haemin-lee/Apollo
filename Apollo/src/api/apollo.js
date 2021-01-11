import { get_client as gc } from 'apollo-api-client'
// native has no .env config
import endpoint from './endpoint'

export default function get_client() {
    return gc(undefined, { url: endpoint })
    // const user = JSON.parse(localStorage.getItem('user'))
    // const access_token = user.access_token
    // return gc(access_token, { url: '/proxy' , user_id: 1, server_url: ''})
}
