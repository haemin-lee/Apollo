import express from 'express'

import Appointment from '@app/models/appointment'

import documents from './documents'

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

router.use('/:id', documents)

export default router
