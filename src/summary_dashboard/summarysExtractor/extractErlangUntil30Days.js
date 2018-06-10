import { Model } from 'objection'
import moment from 'moment'
import { Erlang2gUntil30DaysByHour } from '../../domain/model/statistics'
import { Erlang3gUntil30DaysByHour } from '../../domain/model/statistics'
import { PerfKpiVoz2G } from '../../domain/model/statistics'
import { PerfKpiVoz3G } from '../../domain/model/statistics'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'
//RESUMEN DE ERLANG LOS ULTIMOS 30 DÍAS HORA A HORA
export default async function extractErlangUntil30Days(
  region,
  idRegion,
  startDate,
  endDate
) {
  let totalResultErlang2gUntil30Days = await erlang2gUntil30Days(
    region,
    startDate,
    endDate
  )
  let totalResultErlang3gUntil30Days = await erlang3gUntil30Days(
    region,
    startDate,
    endDate
  )

  totalResultErlang2gUntil30Days.map((element, index) => {
    totalResultErlang2gUntil30Days[index].ID_REGION = idRegion
  })

  totalResultErlang3gUntil30Days.map((element, index) => {
    totalResultErlang3gUntil30Days[index].ID_REGION = idRegion
  })

  //SALVAR EN BASE DE DATOS
  let result2g = await saveErlang2gUntil30Days(totalResultErlang2gUntil30Days)
  let result3g = await saveErlang3gUntil30Days(totalResultErlang3gUntil30Days)
  console.log(
    'Completado: Resumen de Erlang del trafico de los ultimos 30 días por horas de la region: ' +
      region
  )
}

async function erlang2gUntil30Days(region, startDate, endDate) {
  try {
    Model.knex(knexOc)
    let result = await PerfKpiVoz2G.query()
      .select(PerfKpiVoz2G.raw('FECHA, HORA, SUM(ERLANGS) as ERLANG2G'))
      .where('FECHA', '>=', startDate)
      .andWhere('FECHA', '<=', endDate)
      .andWhere('REGION', region)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
      .orderBy('HORA', 'asc')
    return result
  } catch (error) {
    console.log(error)
  }
}

async function erlang3gUntil30Days(region, startDate, endDate) {
  try {
    Model.knex(knexOc)
    let result = await PerfKpiVoz3G.query()
      .select(PerfKpiVoz3G.raw('FECHA, HORA,  SUM(ERLANGS) as ERLANG3G'))
      .where('FECHA', '>=', startDate)
      .andWhere('FECHA', '<=', endDate)
      .andWhere('REGION', region)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
      .orderBy('HORA', 'asc')
    return result
  } catch (error) {
    console.log(error)
  }
}

async function saveErlang2gUntil30Days(data) {
  Model.knex(knexPg)
  let result = await Erlang2gUntil30DaysByHour.query()
    .insert(data)
    .returning('*')
  return result
}

async function saveErlang3gUntil30Days(data) {
  Model.knex(knexPg)
  let result = await Erlang3gUntil30DaysByHour.query()
    .insert(data)
    .returning('*')
  return result
}
