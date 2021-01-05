import express from 'express'
import crypto from 'crypto'

import config from '@app/config'

let router = express.Router()

// webhook verification
router.get('/', (req, res) => {
    const msg = req.query.msg
    const secretToken = crypto
        .createHmac('sha256', config.drchrono_webhook_secret_token)
        .update(msg)
        .digest('hex')

    res.json({
        secret_token: secretToken,
    })
})

router.post('/', (req, res) => {
    const trigger = req.header('X-drchrono-event')
    const data = req.body.object
    console.log(`[${trigger}]`, data)

    switch (trigger) {
        default:
            break
    }

    res.json({})
})

export default router
