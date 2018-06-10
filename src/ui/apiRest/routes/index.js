import express from 'express'
import { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'
import statusMonitor from 'express-status-monitor'
import userRoutes from './users'
import statisticsRoutes from './statistics'
import networkStructureRoutes from './networkStructure'
import networkServiceRoutes from './networkService'
import technologyRoutes from './technology'
import kpiRoutes from './kpi'

export default ({
  config,
  containerMiddleware,
  loggerMiddleware,
  errorHandler,
}) => {
  const router = Router()

  /* istanbul ignore if */
  /*
  if (config.ENV === 'development') {
    router.use(statusMonitor())
  }
  */
  router.use(statusMonitor())
  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(loggerMiddleware)
  }
  router
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

  //Pendiente Configurar headers

  // probar dejar a cors sin objeto
  // app.use(
  //   cors({
  //     allowedHeaders: ['sessionId', 'Content-Type'],
  //     exposedHeaders: ['sessionId'],
  //     origin: '*',
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     preflightContinue: false
  //   })
  // )

  /** GET /api-status - Check service status **/
  router.get('/api-status', (req, res) =>
    res.json({
      status: 'ok',
    })
  )
  //Monitor de carga de express http://10.96.10.131:3000/api/status
  router.get('/status', statusMonitor)

  //Montaje de rutas
  router.use('/users', userRoutes)
  router.use('/statistics', statisticsRoutes)
  router.use('/statistics', networkStructureRoutes)
  router.use('/statistics', networkServiceRoutes)
  router.use('/statistics', technologyRoutes)
  router.use('/statistics', kpiRoutes)

  router.use(errorHandler)
  return router
}
