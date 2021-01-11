import express from 'express'
import crypto from 'crypto'

import Patient from '@app/models/patient'
import Appointment from '@app/models/appointment'

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

const DrChronoEnums = {
    PATIENT_MODIFY: 'PATIENT_MODIFY',
    APPOINTMENT_CREATE: 'APPOINTMENT_CREATE',
    APPOINTMENT_MODIFY: 'APPOINTMENT_MODIFY',
}

router.post('/', async (req, res) => {
    const trigger = req.header('X-drchrono-event')
    const data = req.body.object
    console.log(`[${trigger}]`, data)

    switch (trigger) {
        case DrChronoEnums.PATIENT_MODIFY:
            await handlePatient(data)
            break
        case DrChronoEnums.APPOINTMENT_CREATE:
            await handleAppointment(data)
            break
        case DrChronoEnums.APPOINTMENT_MODIFY:
            await handleAppointmentModify(data)
            break
        default:
            break
    }

    res.json({})
})

const handlePatient = async (data) => {
    const id = data.id

    const patient = await Patient.findOne({
        drchrono_id: id,
    })

    // Update patient
    if (patient) {
        await Patient.findOneAndUpdate(
            {
                drchrono_id: id,
            },
            {
                data: data,
            }
        )
    }

    // Create new patient
    else {
        await new Patient({
            drchrono_id: id,
            data: data,
        }).save()
    }
}

const handleAppointment = async (data) => {
    const id = data.id

    await new Appointment({
        drchrono_id: id,
        data: data,
    }).save()
}

const handleAppointmentModify = async (data) => {
    const id = data.id

    await Appointment.findOneAndUpdate(
        {
            drchrono_id: id,
        },
        {
            data: data,
        }
    )
}

export default router
