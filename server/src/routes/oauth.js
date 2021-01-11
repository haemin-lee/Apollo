import express from 'express'
import axios from 'axios'

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

    try {
        const { data } = await axios.post(config.drchrono_authorize_path, body)

        // TODO: save in db to refresh tokens
        // const accessToken = data.access_token
        // const refreshToken = data.refresh_token

        res.json(data)
    } catch (err) {
        console.log("bitch");
        console.log(err);
        next(err)
    }
})

export default router
