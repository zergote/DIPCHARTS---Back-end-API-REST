import cron from 'node-cron'
import moment from 'moment'
import { Model } from 'objection'
import { Region } from '../domain/model/networkStructure'
import { extractErlangByRegion } from './summarysExtractor'
import { extractPayloadByRegion } from './summarysExtractor'
import { extractStationsTopErlang } from './summarysExtractor'
import { extractStationsTopPayload } from './summarysExtractor'
import { extractErlangUntil30Days } from './summarysExtractor'
import { extractPayloadUntil30Days } from './summarysExtractor'
import { extractErlangByMonthByYTM } from './summarysExtractor'
import { extractPayloadByMonthByYTM } from './summarysExtractor'
import { SumTotalErlangMonthToDay } from '../domain/model/statistics'
import { SumTotalPayloadMonthToDay } from '../domain/model/statistics'
import { TopStationsErlang } from '../domain/model/statistics'
import { TopStationsPayload } from '../domain/model/statistics'
import { Erlang2gUntil30DaysByHour } from '../domain/model/statistics'
import { Erlang3gUntil30DaysByHour } from '../domain/model/statistics'
import { Payload2gUntil30DaysByHour } from '../domain/model/statistics'
import { Payload3gUntil30DaysByHour } from '../domain/model/statistics'
import { Payload4gUntil30DaysByHour } from '../domain/model/statistics'
import { ErlangLatest12Month } from '../domain/model/statistics'
import { PayloadLatest12Month } from '../domain/model/statistics'
import { knexPg } from '../../config'
import acho from 'acho'

//Configuración de salidas por consola
const log = acho()

let ErlangByRegion = cron.schedule(
  '0 3 * * *',
  async function() {
    log.info('Extayendo consumo de Erlang por region')
    log.info('Tarea díaria, empieza todos los días a las 03:00am')
    Model.knex(knexPg)
    let result = await SumTotalErlangMonthToDay.query().delete()
    let regions = await Region.query()
    let startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    let endDate = moment().format('YYYYMMDD')
    let mesActual = true
    await Promise.all(
      regions.map(async (element, index) => {
        await extractErlangByRegion(
          element.REGION,
          element.ID,
          startDate,
          endDate,
          mesActual
        )
      })
    )

    startDate = moment()
      .subtract(2, 'months')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    mesActual = false
    await Promise.all(
      regions.map(async (element, index) => {
        await extractErlangByRegion(
          element.REGION,
          element.ID,
          startDate,
          endDate,
          mesActual
        )
      })
    )
  },
  false
)

let PayloadByRegion = cron.schedule(
  '30 3 * * *',
  async function() {
    log.info('Extayendo consumo de Payload por region')
    log.info('Tarea díaria, empieza todos los días a las 03:30am')
    Model.knex(knexPg)
    let result = await SumTotalPayloadMonthToDay.query().delete()
    let regions = await Region.query()
    let startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    let endDate = moment().format('YYYYMMDD')
    let mesActual = true
    await Promise.all(
      regions.map(async (element, index) => {
        await extractPayloadByRegion(
          element.REGION,
          element.ID,
          startDate,
          endDate,
          mesActual
        )
      })
    )

    startDate = moment()
      .subtract(2, 'months')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    mesActual = false
    await Promise.all(
      regions.map(async (element, index) => {
        await extractPayloadByRegion(
          element.REGION,
          element.ID,
          startDate,
          endDate,
          mesActual
        )
      })
    )
  },
  false
)

let TopErlang = cron.schedule(
  '0 4 * * *',
  async function() {
    log.info('Extayendo estaciones con mayor consumo de Erlang en 30 días')
    log.info('Tarea díaria, empieza todos los días a las 04:00am')
    Model.knex(knexPg)
    let result = await TopStationsErlang.query().delete()
    let regions = await Region.query()
    let startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    let endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractStationsTopErlang(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )
  },
  false
)

let TopPayload = cron.schedule(
  '30 4 * * *',
  async function() {
    log.info('Extayendo estaciones con mayor consumo de Payload en 30 días')
    log.info('Tarea díaria, empieza todos los días a las 04:30am')
    Model.knex(knexPg)
    let result = await TopStationsPayload.query().delete()
    let regions = await Region.query()
    let startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    let endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractStationsTopPayload(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )
  },
  false
)

let ErlangUntil30Days = cron.schedule(
  '0 5 * * *',
  async function() {
    log.info('Extayendo consumo de Erlang en los ultimos 30 días')
    log.info('Tarea díaria, empieza todos los días a las 05:00am')
    Model.knex(knexPg)
    let resultE2g = await Erlang2gUntil30DaysByHour.query().delete()
    let resultE3g = await Erlang3gUntil30DaysByHour.query().delete()
    let regions = await Region.query()
    let startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    let endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractErlangUntil30Days(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )
  },
  false
)

let PayloadUntil30Days = cron.schedule(
  '30 5 * * *',
  async function() {
    log.info('Extayendo consumo de Payload en los ultimos 30 días')
    log.info('Tarea díaria, empieza todos los días a las 05:30am')
    Model.knex(knexPg)
    let resultP2g = await Payload2gUntil30DaysByHour.query().delete()
    let resultP3g = await Payload3gUntil30DaysByHour.query().delete()
    let resultP4g = await Payload4gUntil30DaysByHour.query().delete()
    let regions = await Region.query()
    let startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    let endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractPayloadUntil30Days(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )
  },
  false
)

let ErlangByMonthByYTM = cron.schedule(
  '0 0 1 */1 *',
  async function() {
    log.info(
      'Extayendo suma del consumo de Erlang por mes, los ultimos 12 meses'
    )
    log.info(
      'Tarea mensual, empieza el primer día de todos los meses  a las 12:00am'
    )
    Model.knex(knexPg)
    let result = await ErlangLatest12Month.query().delete()
    let regions = await Region.query()
    let startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    let endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractErlangByMonthByYTM(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )
  },
  false
)

let PayloadByMonthByYTM = cron.schedule(
  '0 3 1 */1 *',
  async function() {
    log.info(
      'Extayendo suma del consumo de Payload por mes, los ultimos 12 meses'
    )
    log.info(
      'Tarea mensual, empieza el primer día de todos los meses  a las 03:00am'
    )
    Model.knex(knexPg)
    let result = await PayloadLatest12Month.query().delete()
    let regions = await Region.query()
    let startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    let endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractPayloadByMonthByYTM(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )
  },
  false
)

async function start() {
  try {
    log.info('Inicio de temporizadores para las tareas de creación de tablas resumenes para el dashboard')
    ErlangByRegion.start()
    PayloadByRegion.start()
    TopErlang.start()
    TopPayload.start()
    ErlangUntil30Days.start()
    PayloadUntil30Days.start()
    ErlangByMonthByYTM.start()
    PayloadByMonthByYTM.start()
  } catch (error) {
    console.log(error)
  }
}

async function forceLoad() {
  try {
    let regions = await Region.query()
    let startDate
    let endDate
    let mesActual

    //ERLANG POR REGION
    log.info('Extayendo consumo de Erlang por region')
    log.info('Tarea díaria, empieza todos los días a las 03:00am')
    Model.knex(knexPg)
    await SumTotalErlangMonthToDay.query().delete()
    startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    endDate = moment().format('YYYYMMDD')
    mesActual = true
    await Promise.all(
      regions.map(async (element, index) => {
        await extractErlangByRegion(
          element.REGION,
          element.ID,
          startDate,
          endDate,
          mesActual
        )
      })
    )

    startDate = moment()
      .subtract(2, 'months')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    mesActual = false
    await Promise.all(
      regions.map(async (element, index) => {
        await extractErlangByRegion(
          element.REGION,
          element.ID,
          startDate,
          endDate,
          mesActual
        )
      })
    )

    //PAYLOAD POR REGION
    log.info('Extayendo consumo de Payload por region')
    log.info('Tarea díaria, empieza todos los días a las 03:30am')
    Model.knex(knexPg)
    await SumTotalPayloadMonthToDay.query().delete()
    startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    endDate = moment().format('YYYYMMDD')
    mesActual = true
    await Promise.all(
      regions.map(async (element, index) => {
        await extractPayloadByRegion(
          element.REGION,
          element.ID,
          startDate,
          endDate,
          mesActual
        )
      })
    )

    startDate = moment()
      .subtract(2, 'months')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    mesActual = false
    await Promise.all(
      regions.map(async (element, index) => {
        await extractPayloadByRegion(
          element.REGION,
          element.ID,
          startDate,
          endDate,
          mesActual
        )
      })
    )

    //TOP ERLANGS
    log.info('Extayendo estaciones con mayor consumo de Erlang en 30 días')
    log.info('Tarea díaria, empieza todos los días a las 04:00am')
    Model.knex(knexPg)
    await TopStationsErlang.query().delete()
    startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractStationsTopErlang(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )

    //TOP PAYLOAD
    log.info('Extayendo estaciones con mayor consumo de Payload en 30 días')
    log.info('Tarea díaria, empieza todos los días a las 04:30am')
    Model.knex(knexPg)
    await TopStationsPayload.query().delete()
    startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractStationsTopPayload(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )

    //ERLANG EN 30 DIAS
    log.info('Extayendo consumo de Erlang en los ultimos 30 días')
    log.info('Tarea díaria, empieza todos los días a las 05:00am')
    Model.knex(knexPg)
    await Erlang2gUntil30DaysByHour.query().delete()
    await Erlang3gUntil30DaysByHour.query().delete()
    startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractErlangUntil30Days(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )

    //PAYLOAD EN 30 DIAS
    log.info('Extayendo consumo de Payload en los ultimos 30 días')
    log.info('Tarea díaria, empieza todos los días a las 05:30am')
    Model.knex(knexPg)
    Payload2gUntil30DaysByHour.query().delete()
    await Payload3gUntil30DaysByHour.query().delete()
    await Payload4gUntil30DaysByHour.query().delete()
    startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractPayloadUntil30Days(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )

    log.info(
      'Extayendo suma del consumo de Erlang por mes, los ultimos 12 meses'
    )
    log.info(
      'Tarea mensual, empieza el primer día de todos los meses  a las 12:00am'
    )
    Model.knex(knexPg)
    await ErlangLatest12Month.query().delete()
    startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractErlangByMonthByYTM(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )

    log.info(
      'Extayendo suma del consumo de Payload por mes, los ultimos 12 meses'
    )
    log.info(
      'Tarea mensual, empieza el primer día de todos los meses  a las 03:00am'
    )
    Model.knex(knexPg)
    await PayloadLatest12Month.query().delete()
    startDate = moment()
      .subtract(1, 'months')
      .format('YYYYMMDD')
    endDate = moment().format('YYYYMMDD')
    await Promise.all(
      regions.map(async (element, index) => {
        await extractPayloadByMonthByYTM(
          element.REGION,
          element.ID,
          startDate,
          endDate
        )
      })
    )
  log.info("Las tareas han sido completadas")
  } catch (error) {
    console.log(error)
  }
}
//start()

forceLoad()
