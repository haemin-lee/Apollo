import express from 'express'

import Appointment from '@app/models/appointment'
import Document from '@app/models/document'

let router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        // TODO: filter by user id
        const appointments = await Appointment.find()

        res.json(appointments)
    } catch (e) {
        next(e)
    }
})

router.get('/:id/documents', async (req, res, next) => {
    const id = req.params.id
    try {
        const documents = await Document.find({
            appointment: id,
        })

        res.json(documents)
    } catch (e) {
        next(e)
    }
})

router.post('/:id/documents', async (req, res, next) => {
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
