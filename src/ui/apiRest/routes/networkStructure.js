import { NetworkStructureController } from '../controller'
import express from 'express'

const router = express.Router()
///////API VIEJA ////
//Retorna las regiones
router.route('/region').get(NetworkStructureController.getAllRegion)

//Retornar estaciones por tecnologia y region
router
  .route('/station/:idRegion/:idTech')
  .get(NetworkStructureController.getStationFromIdTechAndIdRegion)

//Retornar sectores
router
  .route('/sector/:idStation/:idTech')
  .get(NetworkStructureController.getSectorFromIdTechAndIdStation)

///////API NUEVA ////
//Retorna las regiones
router.route('/region').get(NetworkStructureController.getAllRegion)

//Retornar estaciones por tecnologia y region
router
  .route('/region/station/:idRegion/:idTech')
  .get(NetworkStructureController.getStationFromIdTechAndIdRegion)

//Retornar sectores
router
  .route('/region/sector/:idStation/:idTech')
  .get(NetworkStructureController.getSectorFromIdTechAndIdStation)

//Retorna las subregiones
router.route('/subregion').get(NetworkStructureController.getAllSubregion)

//Retornar estaciones por tecnologia y region
router
  .route('/subregion/station/:idSubregion/:idTech')
  .get(NetworkStructureController.getStationFromIdTechAndIdSubregion)

//Retornar sectores
router
  .route('/subregion/sector/:idStation/:idTech')
  .get(NetworkStructureController.getSectorFromIdTechAndIdStation)

//Retorna los clusteres por region
router
  .route('/region/cluster/:idRegion')
  .get(NetworkStructureController.getClusterFromIdRegion)

//Retorna los clusteres por Subregion
router
  .route('/subregion/cluster/:idSubregion')
  .get(NetworkStructureController.getClusterFromIdSubregion)

//Retorna los mercados
//Retorna los clusteres por region
router
  .route('/region/mercado/:idRegion')
  .get(NetworkStructureController.getMercadoFromIdRegion)

//Retorna los clusteres por Subregion
router
  .route('/subregion/mercado/:idSubregion')
  .get(NetworkStructureController.getMercadoFromIdSubregion)

//Retorna los estados
//Retorna los estados por region
router
  .route('/region/estado/:idRegion')
  .get(NetworkStructureController.getStateFromIdRegion)

//Retorna los estados por Subregion
router
  .route('/subregion/estado/:idSubregion')
  .get(NetworkStructureController.getStateFromIdSubregion)

export default router
