import express from 'express'
import axios from 'axios'
import qs from 'qs'

import config from '@app/config'

let router = express.Router()

// Send OAuth callback code to get OAuth access token
router.get('/token', async (req, res, next) => {
    const code = req.query.code

    const body = {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: config.drchrono_redirect_uri,
        client_id: config.drchrono_client_id,
        client_secret: config.drchrono_client_secret,
    }

    const headers = {
        'Content-Type': 'application/x-www-urlencoded;charset=utf-8',
    }

    try {
        const { data } = await axios({
            method: 'POST',
            url: config.drchrono_authorize_path,
            data: qs.stringify(body),
            headers: headers,
        })

        // TODO: save in db to refresh tokens
        // const accessToken = data.access_token
        // const refreshToken = data.refresh_token

        res.json(data)
    } catch (err) {
        next(err)
    }
})

export default router
