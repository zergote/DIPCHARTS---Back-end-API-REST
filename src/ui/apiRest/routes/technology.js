import { TechnologyController } from '../controller'
import express from 'express'

const router = express.Router()
//Retorna la tecnologia dado un servicio
router.route('/technology/:idService').get(TechnologyController.getTechnology)

export default router
