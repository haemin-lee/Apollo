import express from 'express'
import drchrono from './drchrono'

let router = express.Router()

router.use('/drchrono', drchrono)

export default router
