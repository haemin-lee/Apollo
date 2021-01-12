import express from 'express'
import appointments from './appointments'
import patients from './patients'

let router = express.Router()

router.use('/appointments', appointments)
router.use('/patients', patients)

export default router
