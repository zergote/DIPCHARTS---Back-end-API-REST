import { NetworkServiceController } from '../controller'
import express from 'express'

const router = express.Router()
//Retorna los servicios de voz y datos disponibles
router.route('/service').get(NetworkServiceController.getServices)
router.route('/service/:idService').get(NetworkServiceController.getTableName)

export default router
