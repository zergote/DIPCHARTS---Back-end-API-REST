import { Model } from 'objection'
import moment from 'moment'
import { PerfKpiVoz2G } from '../../domain/model/statistics'
import { PerfKpiVoz3G } from '../../domain/model/statistics'
import { TopStationsErlang } from '../../domain/model/statistics'
import { obtainStationName } from '../utils'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'

//TOP ESTACIONES CON MEJOR ERLANG

export default async function extractStationsTopErlang(
  region,
  idRegion,
  startDate,
  endDate
) {
  let stationsTopErlang2g = await topErlang2g(region, startDate, endDate)
  let stationsTopErlang3g = await topErlang3g(region, startDate, endDate)
  //console.log(stationsTopErlang2g)
  //console.log(stationsTopErlang3g)
  let resultStations2gAnd3G = []
  //let LIKERESULT= await topErlang2ByName(region, startDate, endDate, 'CARUPANO')
  //console.log(LIKERESULT)
  let NAME, ERLANG2G, ERLANG3G
  Object.keys(stationsTopErlang2g).map(async (station2g, indexStation2g) => {
    NAME = obtainStationName(stationsTopErlang2g[station2g].BTS)
    ERLANG2G = testNumber(stationsTopErlang2g[station2g].VALUE)
    ERLANG3G = 0
    resultStations2gAnd3G.push({
      name: NAME,
      erlang2g: ERLANG2G,
      erlang3g: ERLANG3G,
      id_region: idRegion,
    })
  })

  await Promise.all(
    resultStations2gAnd3G.map(async (stations, indexStations) => {
      await topErlang3gByName(region, startDate, endDate, stations.name).then(
        response => {
          if (response !== undefined)
            resultStations2gAnd3G[indexStations].erlang3g = testNumber(
              response.VALUE
            )
        }
      )
    })
  )

  Object.keys(stationsTopErlang3g).map(async (station3g, indexStation3g) => {
    if (
      !resultStations2gAnd3G.find(element => {
        return (
          element.name ===
          obtainStationName(stationsTopErlang3g[station3g].NODEB)
        )
      })
    ) {
      NAME = obtainStationName(stationsTopErlang3g[station3g].NODEB)
      ERLANG2G = 0
      ERLANG3G = testNumber(stationsTopErlang3g[station3g].VALUE)
      resultStations2gAnd3G.push({
        name: NAME,
        erlang2g: ERLANG2G,
        erlang3g: ERLANG3G,
        id_region: idRegion,
      })
    }
  })

  await Promise.all(
    resultStations2gAnd3G.map(async (stations, indexStations) => {
      if (stations.erlang2g === 0) {
        await topErlang2gByName(region, startDate, endDate, stations.name).then(
          response => {
            if (response !== undefined)
              resultStations2gAnd3G[indexStations].erlang2g = testNumber(
                response.VALUE
              )
          }
        )
      }
    })
  )

  resultStations2gAnd3G.map((stations, indexStations) => {
    if (resultStations2gAnd3G[indexStations].erlang2g === undefined) {
      resultStations2gAnd3G[indexStations].erlang2g = 0
    }
    if (resultStations2gAnd3G[indexStations].erlang3g === undefined) {
      resultStations2gAnd3G[indexStations].erlang3g = 0
    }
  })

  let result = await saveTopStationsErlang(resultStations2gAnd3G)

  console.log(
    'Completado: Resumen top estaciones con mejor Erlang en 30 días de la region: ' +
      region
  )
}

async function topErlang2g(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiVoz2G.query()
    .select(PerfKpiVoz2G.raw('BTS, SUM("ERLANGS") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .groupBy('BTS')
    .orderBy('VALUE', 'desc')
    .limit(10)
  return result
}

async function topErlang3g(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiVoz3G.query()
    .select(PerfKpiVoz3G.raw('NODEB, SUM("ERLANGS") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .groupBy('NODEB')
    .orderBy('VALUE', 'desc')
    .limit(10)
  return result
}

async function topErlang2gByName(region, startDate, endDate, bts) {
  Model.knex(knexOc)
  let result = await PerfKpiVoz2G.query()
    .select(PerfKpiVoz2G.raw('BTS, SUM("ERLANGS") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .andWhere('BTS', 'like', bts + '_')
    .groupBy('BTS')
    .orderBy('VALUE', 'desc')
  return result[0]
}

async function topErlang3gByName(region, startDate, endDate, nodeb) {
  Model.knex(knexOc)
  let result = await PerfKpiVoz3G.query()
    .select(PerfKpiVoz3G.raw('NODEB, SUM("ERLANGS") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .andWhere('NODEB', 'like', nodeb + '_')
    .groupBy('NODEB')
    .orderBy('VALUE', 'desc')
  return result[0]
}

async function saveTopStationsErlang(data) {
  Model.knex(knexPg)
  let result = await TopStationsErlang.query()
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
