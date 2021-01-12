import { get_client as gc } from 'apollo-api-client'
// native has no .env config
import endpoint from './endpoint'

export default function get_client(token) {
    return gc(token, { url: endpoint })
}
