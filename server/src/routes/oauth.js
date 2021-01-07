import express from 'express'

import config from '@app/config'

let router = express.Router()

// Get the OAuth URL
router.get('/auth', (req, res) => {
    // TODO
})

// Send OAuth callback code to get OAuth access token
router.get('/token', async (req, res, next) => {
    // TODO
})

export default router
