<<<<<<< HEAD
import { get_client as gc } from 'apollo-api-client'

export default function get_client() {
    //const user = JSON.parse(localStorage.getItem('user'))
    //const access_token = user.access_token

    const access_token =  "s";

    return gc(access_token, {url: new String("/api")})
=======
import { get_client as gc } from 'apollo-api-client'

export default function get_client() {
    //const user = JSON.parse(localStorage.getItem('user'))
    //const access_token = user.access_token

    const access_token =  "a";

    return gc(access_token, {url: new String("/api")})
>>>>>>> 80426730e0ccc1ae8a7add6c99f4cde3c280d837
}