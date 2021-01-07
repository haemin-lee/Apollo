import express from 'express'

import Patient from '@app/models/patient'

let router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const patients = await Patient.find()
        res.json(patients)
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id)
        res.json(patient)
    } catch (e) {
        next(e)
    }
})

// Authentication
router.post('/login', async (req, res, next) => {
    const contact = req.body.contact
    const password = req.body.password
    try {
        const patient = await Patient.findOne({
            'data.email': contact,
        })

        if (!patient) throw 'patient does not exist'

        // TODO: hash password
        if (patient.password !== password) throw 'incorrect password'

        res.json(patient)
    } catch (e) {
        next(e)
    }
})

// Set password
router.post('/create-account', async (req, res, next) => {
    const contact = req.body.contact
    const password = req.body.password
    try {
        let patient = await Patient.findOne({
            'data.email': contact,
        })

        if (!patient) throw 'patient does not exist'

        patient = await Patient.findOneAndUpdate(
            {
                'data.email': contact,
            },
            {
                password: password,
            }
        )

        res.json(patient)
    } catch (e) {
        next(e)
    }
})

export default router
