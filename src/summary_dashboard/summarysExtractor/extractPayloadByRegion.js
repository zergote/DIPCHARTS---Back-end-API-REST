import { Model } from 'objection'
import moment from 'moment'
import { SumTotalPayloadMonthToDay } from '../../domain/model/statistics'
import { PerfKpiDatos2G } from '../../domain/model/statistics'
import { PerfKpiDatos3G } from '../../domain/model/statistics'
import { PerfKpiDatos4G } from '../../domain/model/statistics'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'

//RESUMEN DE PAYLOAD POR REGION
export default async function extractPayloadByRegion(
  region,
  idRegion,
  startDate,
  endDate,
  mesActual
) {
  let stationsPayload2g = await payload2gByRegion(region, startDate, endDate)
  let stationsPayload3g = await payload3gByRegion(region, startDate, endDate)
  let stationsPayload4g = await payload4gByRegion(region, startDate, endDate)

  let totalResult = {
    desde: parseInt(startDate),
    hasta: parseInt(endDate),
    mes_actual: mesActual,
    payload2g: testNumber(stationsPayload2g[0].VALUE),
    payload3g: testNumber(stationsPayload3g[0].VALUE),
    payload4g: testNumber(stationsPayload4g[0].VALUE),
    id_region: idRegion,
  }

  let result = await saveTotalSumPayloadByRegion(totalResult)
  console.log(
    'Completado: Resumen del total consumido en Payload por region completado de la region: ' +
      region
  )
}

async function payload2gByRegion(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos2G.query()
    .select(PerfKpiDatos2G.raw('SUM("PAYLOAD_TOT")/1024 as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

//Hay inconsistencia en la base de datos para PerfKpiDatos3G en vez de PAYLOAD_TOT aparece Payload_TOTAL
async function payload3gByRegion(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos3G.query()
    .select(PerfKpiDatos3G.raw('SUM("PAYLOAD_TOTAL") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

async function payload4gByRegion(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos4G.query()
    .select(PerfKpiDatos4G.raw('SUM("PAYLOAD_TOT") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

async function saveTotalSumPayloadByRegion(data) {
  Model.knex(knexPg)
  let result = await SumTotalPayloadMonthToDay.query()
    .insert(data)
    .returning('*')
  return result
}

function testNumber(value) {
  if (isNaN(value)) {
    return 0
  } else {
    if (typeof value === 'string') return parseFloat(value)
    return value
  }
}
