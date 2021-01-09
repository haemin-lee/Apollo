import { get_client as gc } from 'apollo-api-client'

export default function get_client() {
    //const user = JSON.parse(localStorage.getItem('user'))
    //const access_token = user.access_token

    const access_token =  "";

    return gc(access_token, {url: new String("/api")})
}