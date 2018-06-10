import { Model } from 'objection'
import moment from 'moment'
import { Payload2gUntil30DaysByHour } from '../../domain/model/statistics'
import { Payload3gUntil30DaysByHour } from '../../domain/model/statistics'
import { Payload4gUntil30DaysByHour } from '../../domain/model/statistics'
import { PerfKpiDatos2G } from '../../domain/model/statistics'
import { PerfKpiDatos3G } from '../../domain/model/statistics'
import { PerfKpiDatos4G } from '../../domain/model/statistics'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'

//RESUMEN DE ERLANG LOS ULTIMOS 30 DÍAS HORA A HORA
export default async function extractPayloadUntil30Days(
  region,
  idRegion,
  startDate,
  endDate
) {
  let totalResultPayload2gUntil30Days = await payload2gUntil30Days(
    region,
    startDate,
    endDate
  )
  let totalResultPayload3gUntil30Days = await payload3gUntil30Days(
    region,
    startDate,
    endDate
  )
  let totalResultPayload4gUntil30Days = await payload4gUntil30Days(
    region,
    startDate,
    endDate
  )

  totalResultPayload2gUntil30Days.map((element, index) => {
    totalResultPayload2gUntil30Days[index].ID_REGION = idRegion
  })

  totalResultPayload3gUntil30Days.map((element, index) => {
    totalResultPayload3gUntil30Days[index].ID_REGION = idRegion
  })

  totalResultPayload4gUntil30Days.map((element, index) => {
    totalResultPayload4gUntil30Days[index].ID_REGION = idRegion
  })
  //SALVAR EN BASE DE DATOS
  let result2g = await savePayload2gUntil30Days(totalResultPayload2gUntil30Days)
  let result3g = await savePayload3gUntil30Days(totalResultPayload3gUntil30Days)
  let result4g = await savePayload4gUntil30Days(totalResultPayload4gUntil30Days)

  console.log(
    'Completado: Resumen de Payload del trafico de los ultimos 30 días por horas de la region: ' +
      region
  )
}

async function payload2gUntil30Days(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos2G.query()
    .select(PerfKpiDatos2G.raw('FECHA, HORA, SUM(PAYLOAD_TOT) as PAYLOAD2G'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .groupBy('FECHA', 'HORA')
    .orderBy('FECHA', 'asc')
    .orderBy('HORA', 'asc')
  return result
}

async function payload3gUntil30Days(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos3G.query()
    .select(PerfKpiDatos3G.raw('FECHA, HORA, SUM(PAYLOAD_TOTAL) as PAYLOAD3G'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .groupBy('FECHA', 'HORA')
    .orderBy('FECHA', 'asc')
    .orderBy('HORA', 'asc')
  return result
}

async function payload4gUntil30Days(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos4G.query()
    .select(PerfKpiDatos4G.raw('FECHA, HORA, SUM(PAYLOAD_TOT) as PAYLOAD4G'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .groupBy('FECHA', 'HORA')
    .orderBy('FECHA', 'asc')
    .orderBy('HORA', 'asc')
  return result
}

async function savePayload2gUntil30Days(data) {
  Model.knex(knexPg)
  let result = await Payload2gUntil30DaysByHour.query()
    .insert(data)
    .returning('*')
  return result
}

async function savePayload3gUntil30Days(data) {
  Model.knex(knexPg)
  let result = await Payload3gUntil30DaysByHour.query()
    .insert(data)
    .returning('*')
  return result
}

async function savePayload4gUntil30Days(data) {
  Model.knex(knexPg)
  let result = await Payload4gUntil30DaysByHour.query()
    .insert(data)
    .returning('*')
  return result
}
