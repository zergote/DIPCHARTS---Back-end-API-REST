import { Model } from 'objection'
import moment from 'moment'
import { SumTotalErlangMonthToDay } from '../../domain/model/statistics'
import { PerfKpiVoz2G } from '../../domain/model/statistics'
import { PerfKpiVoz3G } from '../../domain/model/statistics'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'

//RESUMEN DE ERLANG POR REGION
export default async function extractErlangByRegion(
  region,
  idRegion,
  startDate,
  endDate,
  mesActual
) {
  let stationsErlang2g = await erlang2gByRegion(region, startDate, endDate)
  let stationsErlang3g = await erlang3gByRegion(region, startDate, endDate)

  let totalResult = {
    desde: parseInt(startDate),
    hasta: parseInt(endDate),
    mes_actual: mesActual,
    erlang2g: testNumber(stationsErlang2g[0].VALUE),
    erlang3g: testNumber(stationsErlang3g[0].VALUE),
    id_region: idRegion,
  }

  let result = await saveTotalSumErlangByRegion(totalResult)

  console.log(
    'Completado: Resumen del total consumido en Erlang de la region: ' + region
  )
}

async function erlang2gByRegion(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiVoz2G.query()
    .select(PerfKpiVoz2G.raw('SUM("ERLANGS") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  //Hay inconsistencia en el diseño de la vista. En el diseño dice que el valor es de 'ERLANG' sin la 'S' al final, pero cuando se abre al tabla entonces aparece 'ERLANGS' con la 'S'

  return result
}

async function erlang3gByRegion(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiVoz3G.query()
    .select(PerfKpiVoz3G.raw('SUM("ERLANGS") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

async function saveTotalSumErlangByRegion(data) {
  Model.knex(knexPg)
  let result = await SumTotalErlangMonthToDay.query()
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
