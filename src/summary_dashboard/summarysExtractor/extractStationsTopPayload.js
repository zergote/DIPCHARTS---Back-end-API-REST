import { Model } from 'objection'
import moment from 'moment'
import { TopStationsPayload } from '../../domain/model/statistics'
import { PerfKpiDatos2G } from '../../domain/model/statistics'
import { PerfKpiDatos3G } from '../../domain/model/statistics'
import { PerfKpiDatos4G } from '../../domain/model/statistics'
import { obtainStationName } from '../utils'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'

//TOP ESTACIONES CON MEJOR PAYLOAD
export default async function extractStationsTopPayload(
  region,
  idRegion,
  startDate,
  endDate
) {
  try {
    let stationsTopPayload2g = await topPayload2g(region, startDate, endDate)
    let stationsTopPayload3g = await topPayload3g(region, startDate, endDate)
    let stationsTopPayload4g = await topPayload4g(region, startDate, endDate)

    let resultStations2gAnd3GAnd4g = []

    //let LIKERESULT= await topErlang2ByName(region, startDate, endDate, 'CARUPANO')
    //console.log(LIKERESULT)

    let NAME, PAYLOAD2G, PAYLOAD3G, PAYLOAD4G

    Object.keys(stationsTopPayload2g).map(async (station2g, indexStation2g) => {
      NAME = obtainStationName(stationsTopPayload2g[station2g].BTS)
      PAYLOAD2G = testNumber(stationsTopPayload2g[station2g].VALUE)
      PAYLOAD3G = 0
      PAYLOAD4G = 0
      resultStations2gAnd3GAnd4g.push({
        name: NAME,
        payload2g: PAYLOAD2G,
        payload3g: PAYLOAD3G,
        payload4g: PAYLOAD4G,
        id_region: idRegion,
      })
    })

    await Promise.all(
      resultStations2gAnd3GAnd4g.map(async (stations, indexStations) => {
        await topPayload3gByName(
          region,
          startDate,
          endDate,
          stations.name
        ).then(response => {
          if (response !== undefined) {
            resultStations2gAnd3GAnd4g[indexStations].payload3g = testNumber(
              response.VALUE
            )
          }
        })
      })
    )

    await Promise.all(
      resultStations2gAnd3GAnd4g.map(async (stations, indexStations) => {
        await topPayload4gByName(
          region,
          startDate,
          endDate,
          stations.name
        ).then(response => {
          if (response !== undefined) {
            resultStations2gAnd3GAnd4g[indexStations].payload4g = testNumber(
              response.VALUE
            )
          }
        })
      })
    )

    Object.keys(stationsTopPayload3g).map(async (station3g, indexStation3g) => {
      if (
        !resultStations2gAnd3GAnd4g.find(element => {
          return (
            element.name ===
            obtainStationName(stationsTopPayload3g[station3g].NODEB)
          )
        })
      ) {
        NAME = obtainStationName(stationsTopPayload3g[station3g].NODEB)
        PAYLOAD2G = 0
        PAYLOAD3G = testNumber(stationsTopPayload3g[station3g].VALUE)
        PAYLOAD4G = 0
        resultStations2gAnd3GAnd4g.push({
          name: NAME,
          payload2g: PAYLOAD2G,
          payload4g: PAYLOAD3G,
          payload4g: PAYLOAD4G,
          id_region: idRegion,
        })
      }
    })

    await Promise.all(
      resultStations2gAnd3GAnd4g.map(async (stations, indexStations) => {
        if (stations.payload2g === 0) {
          await topPayload2gByName(
            region,
            startDate,
            endDate,
            stations.name
          ).then(response => {
            if (response !== undefined) {
              resultStations2gAnd3GAnd4g[indexStations].payload2g = testNumber(
                response.VALUE
              )
            }
          })
        }
      })
    )

    await Promise.all(
      resultStations2gAnd3GAnd4g.map(async (stations, indexStations) => {
        if (stations.payload4g === 0) {
          await topPayload4gByName(
            region,
            startDate,
            endDate,
            stations.name
          ).then(response => {
            if (response !== undefined) {
              resultStations2gAnd3GAnd4g[indexStations].payload4g = testNumber(
                response.VALUE
              )
            }
          })
        }
      })
    )

    Object.keys(stationsTopPayload4g).map(async (station4g, indexStation3g) => {
      if (
        !resultStations2gAnd3GAnd4g.find(element => {
          return (
            element.name ===
            obtainStationName(stationsTopPayload4g[station4g].ENODEB)
          )
        })
      ) {
        NAME = obtainStationName(stationsTopPayload4g[station4g].ENODEB)
        PAYLOAD2G = 0
        PAYLOAD3G = 0
        PAYLOAD4G = testNumber(stationsTopPayload4g[station4g].VALUE)
        resultStations2gAnd3GAnd4g.push({
          name: NAME,
          payload2g: PAYLOAD2G,
          payload3g: PAYLOAD3G,
          payload4g: PAYLOAD4G,
          id_region: idRegion,
        })
      }
    })

    await Promise.all(
      resultStations2gAnd3GAnd4g.map(async (stations, indexStations) => {
        if (stations.payload2g === 0) {
          await topPayload2gByName(
            region,
            startDate,
            endDate,
            stations.name
          ).then(response => {
            if (response !== undefined) {
              resultStations2gAnd3GAnd4g[indexStations].payload2g = testNumber(
                response.VALUE
              )
            }
          })
        }
      })
    )

    await Promise.all(
      resultStations2gAnd3GAnd4g.map(async (stations, indexStations) => {
        if (stations.payload3g === 0) {
          await topPayload3gByName(
            region,
            startDate,
            endDate,
            stations.name
          ).then(response => {
            if (response !== undefined) {
              resultStations2gAnd3GAnd4g[indexStations].payload3g = testNumber(
                response.VALUE
              )
            }
          })
        }
      })
    )

    resultStations2gAnd3GAnd4g.map((stations, indexStations) => {
      if (resultStations2gAnd3GAnd4g[indexStations].payload2g === undefined) {
        resultStations2gAnd3GAnd4g[indexStations].payload2g = 0
      }
      if (resultStations2gAnd3GAnd4g[indexStations].payload3g === undefined) {
        resultStations2gAnd3GAnd4g[indexStations].payload3g = 0
      }
      if (resultStations2gAnd3GAnd4g[indexStations].payload4g === undefined) {
        resultStations2gAnd3GAnd4g[indexStations].payload4g = 0
      }
    })

    let result = await saveTopStationsPayload(resultStations2gAnd3GAnd4g)
    console.log(
      'Completado: Resumen top estaciones con mejor Payload en 30 días de la region: ' +
        region
    )
  } catch (error) {
    console.log(error)
  }
}

async function topPayload2g(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos2G.query()
    .select(PerfKpiDatos2G.raw('BTS, SUM("PAYLOAD_TOT") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .groupBy('BTS')
    .orderBy('VALUE', 'desc')
    .limit(10)
  return result
}

async function topPayload3g(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos3G.query()
    .select(PerfKpiDatos3G.raw('NODEB, SUM("PAYLOAD_TOTAL") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .groupBy('NODEB')
    .orderBy('VALUE', 'desc')
    .limit(10)
  return result
}

async function topPayload4g(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos4G.query()
    .select(PerfKpiDatos4G.raw('ENODEB, SUM("PAYLOAD_TOT") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .groupBy('ENODEB')
    .orderBy('VALUE', 'desc')
    .limit(10)
  return result
}

async function topPayload2gByName(region, startDate, endDate, bts) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos2G.query()
    .select(PerfKpiDatos2G.raw('BTS, SUM("PAYLOAD_TOT") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .andWhere('BTS', 'like', bts + '_')
    .groupBy('BTS')
    .orderBy('VALUE', 'desc')
  return result[0]
}

async function topPayload3gByName(region, startDate, endDate, nodeb) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos3G.query()
    .select(PerfKpiDatos3G.raw('NODEB, SUM("PAYLOAD_TOTAL") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .andWhere('NODEB', 'like', nodeb + '_')
    .groupBy('NODEB')
    .orderBy('VALUE', 'desc')
  return result[0]
}

async function topPayload4gByName(region, startDate, endDate, eNodeb) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos4G.query()
    .select(PerfKpiDatos4G.raw('ENODEB, SUM("PAYLOAD_TOT") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
    .andWhere('ENODEB', 'like', eNodeb + '_')
    .groupBy('ENODEB')
    .orderBy('VALUE', 'desc')
  return result[0]
}

async function saveTopStationsPayload(data) {
  Model.knex(knexPg)
  let result = await TopStationsPayload.query()
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
