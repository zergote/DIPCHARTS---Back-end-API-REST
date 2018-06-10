import cron from 'node-cron'
import moment from 'moment'
import { Model } from 'objection'
import { Region } from '../domain/model/networkStructure'
import { knexPg } from '../../config'
import { rulesVoz } from './rules/'
import { rulesDatos } from './rules/'
import { Alerts, AlertsAndUsers } from '../domain/model/alerts'
//import { rulesNuevaEstacion } from './rules'
import acho from 'acho'

//Configuración de salidas por consola
const log = acho()

Model.knex(knexPg)
let nowDate = moment()
  .subtract(1, 'days')
  .format('YYYYMMDD')
let nowHour = moment()
  .subtract(6, 'hours')
  .format('H')

//Segun Luis los umbrales recomendados para las alertas serian:
//para CCR 80 %
//para PCR 50 %

let umbralCCR = '80'
let umbralPCR = '50'
let umbralErlang = '0'
let umbralPayload = '0'

let alertsVoz = cron.schedule(
  '0 1 * * *',
  async function() {
  	log.info('Detectando valores anormales en CCR y ERLANG')
    log.info('Tarea díaria, empieza a las 01:00am')
    let regions = await Region.query()
    Promise.all(
      Object.keys(regions).map(async (element, index) => {
        await rulesVoz(
          regions[index].REGION,
          regions[index].ID.toString(),
          nowDate,
          nowHour,
          umbralCCR,
          umbralErlang
        )
        log.debug('Buscando anormalidades en CCR y ERLANG en la region ' + regions[index].REGION)
      })
    )
  },
  false
)

let alertsDatos = cron.schedule(
  '0 1 * * *',
  async function() {
  	log.info('Detectando valores anormales en PCR y PAYLOAD')
  	log.info('Tarea díaria, empieza a las 01:30am')
    let regions = await Region.query()
    Promise.all(
      Object.keys(regions).map(async (element, index) => {
        await rulesDatos(
          regions[index].REGION,
          regions[index].ID.toString(),
          nowDate,
          nowHour,
          umbralPCR,
          umbralPayload
        )
        log.debug('Buscando anormalidades en PCR y PAYLOAD en la region ' + regions[index].REGION)
      })
    )
  },
  false
)

let cleanAllAlerts = cron.schedule(
  '0 1 1 * 0',
  async function() {
    log.warn('Haciendo borrado de alertas los días 1ro de cada mes')
  	await AlertsAndUsers.query().delete()
  	let result = await Alerts.query().delete()
  	log.info(result + " Alertas eliminadas")
  },
  false
)

//No se completo la implementacion de esta fuencion para el sistema de alertas
/*
let alertsNewStation = cron.schedule(
  '0 1 * * *',
  async function() {
    log.info('Detectando estaciones nuevas')
    log.info('Tarea díaria, empieza todos los días a las 02:00am')
    let regions = await Region.query()

    Promise.all(
      Object.keys(regions).map(async (element, index) => {
        await rulesNuevaEstacion(element.ID, element.REGION)
      })
    )

  },
  false
)
*/

async function start() {
  try {
    log.info('Inicio de temporizadores para las tareas de detección de patrones anormales para CCR, PCR y Trafico Cero')
    cleanAllAlerts.start()
    alertsVoz.start()
    alertsDatos.start()
  } catch (error) {
    console.log(error)
  }
}

async function forceLoad() {
  try {
  	await AlertsAndUsers.query().delete()
  	let result = await Alerts.query().delete()

  	log.info(result + " Alertas eliminadas")
    await rulesVoz('Oriente', '5', '20180130', '20', '80', '0')
    await rulesDatos('Oriente', '5', '20180130', '20', '50', '0')
    //await rulesNuevaEstacion('5', 'Oriente')
  } catch (error) {
    console.log(error)
  }
}

start()

//forceLoad()
