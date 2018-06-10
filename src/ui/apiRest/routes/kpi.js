import { KpiController } from '../controller'
import express from 'express'

const router = express.Router()
//Retorna la tecnologia dado un servicio
router.route('/kpi/:idService').get(KpiController.getKpi)

export default router
