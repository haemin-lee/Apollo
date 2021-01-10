import express from 'express'

import Document from '@app/models/document'

let router = express.Router()

router.get('/', async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    try {
        const documents = await Document.find({
            appointment: id,
        })

        res.json(documents)
    } catch (e) {
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    const id = req.params.id
    req.body.appointment = id
    try {
        const doc = await new Document(req.body).save()

        res.json(doc)
    } catch (e) {
        next(e)
    }
})

export default router
