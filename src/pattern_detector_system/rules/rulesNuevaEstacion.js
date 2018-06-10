import { Model } from 'objection'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'
import moment from 'moment'
import {
  ObjectionKpiDatos2GRepository,
  ObjectionKpiDatos3GRepository,
  ObjectionKpiDatos4GRepository,
} from '../../infrastructure/persistence/repositories/domain/model/statistics'

import { PerfKpiDatos2G } from '../../domain/model/statistics'
import { PerfKpiDatos3G } from '../../domain/model/statistics'
import { PerfKpiDatos4G } from '../../domain/model/statistics'

import { ObjectionStationRepository } from '../../infrastructure/persistence/repositories/domain/model/networkStructure'
import { hash } from '../utils'
import { Alerts, AlertsAndUsers } from '../../domain/model/alerts'

import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'

export default async function rulesNuevaEstacion(idRegion, regionName) {
  try {
    let stations2g = await ObjectionKpiDatos2GRepository.getStations(regionName)

    let stations3g = await ObjectionKpiDatos3GRepository.getStations(regionName)

    let stations4g = await ObjectionKpiDatos4GRepository.getStations(regionName)

    Promise.all(
      Object.keys(stations2g).map(async (key, index) => {
        let resultCheckOccurrence = checkOccurrence(stations2g[key].BTS)
        if (!resultCheckOccurrence) {
          console.log('Se encontro una nueva estacion 2G')
          //Crear alarma
          //Agregar nueva estacion a la base de datos
          let resultHashOcurrence = hash(stations2g[key].BTS)
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations2g[key].BTS,
            title: 'Estacion nueva, se llama ' + stations2g[key].BTS,
            body:
              'Se ha descubierto una nueva estacion llamada ' +
              stations2g[key].BTS +
              '. Su fecha de descubrimiento es el ' +
              moment().format('DD/MM/YYYY'),
            start_date: moment().format('YYYYMMDD'),
            start_hour: moment().format('H'),
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpi: null,
            kpiValue: null,
            chartView: false,
            type: 3,
            id_service: 1,
            id_region: idRegion,
          }
          let resultCheckOcurrenceInAlerts = await checkOccurrenceInAlerts(
            resultHashOcurrence
          )
          if (!resultCheckOcurrenceInAlerts) {
            await insertNewAlert(dataAlert)
            await joinAlertsAndUsers(resultHashOcurrence, idRegion)
          }
        }
      })
    )

    Promise.all(
      Object.keys(stations3g).map(async (key, index) => {
        let resultCheckOccurrence = await checkOccurrence(stations3g[key].NODEB)

        if (!resultCheckOccurrence) {
          console.log('Se encontro una nueva estacion 3G')
          //Crear alarma
          //Agregar nueva estacion a la base de datos
          let resultHashOcurrence = hash(stations3g[key].NODEB)
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations3g[key].NODEB,
            title: 'Estacion nueva, se llama ' + stations3g[key].NODEB,
            body:
              'Se ha descubierto una nueva estacion llamada ' +
              stations3g[key].NODEB +
              '. Su fecha de descubrimiento es el ' +
              moment().format('DD/MM/YYYY'),
            start_date: moment().format('YYYYMMDD'),
            start_hour: moment().format('H'),
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpi: null,
            kpiValue: null,
            chartView: false,
            type: 3,
            id_service: 1,
            id_region: idRegion,
          }

          let resultCheckOcurrenceInAlerts = await checkOccurrenceInAlerts(
            resultHashOcurrence
          )
          if (!resultCheckOcurrenceInAlerts) {
            await insertNewAlert(dataAlert)
            await joinAlertsAndUsers(resultHashOcurrence, idRegion)
          }
        }
      })
    )

    Promise.all(
      Object.keys(stations4g).map(async (key, index) => {
        let resultCheckOccurrence = await checkOccurrence(
          stations4g[key].ENODEB
        )

        if (!resultCheckOccurrence) {
          console.log('Se encontro una nueva estacion 4G')
          //Crear alarma
          //Agregar nueva estacion a la base de datos
          let resultHashOcurrence = hash(stations4g[key].ENODEB)
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations4g[key].ENODEB,
            title: 'Estacion nueva, se llama ' + stations4g[key].ENODEB,
            body:
              'Se ha descubierto una nueva estacion llamada ' +
              stations4g[key].ENODEB +
              '. Su fecha de descubrimiento es el ' +
              moment().format('DD/MM/YYYY'),
            start_date: moment().format('YYYYMMDD'),
            start_hour: moment().format('H'),
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpi: null,
            kpiValue: null,
            chartView: false,
            type: 3,
            id_service: 1,
            id_region: idRegion,
          }

          let resultCheckOcurrenceInAlerts = await checkOccurrenceInAlerts(
            resultHashOcurrence
          )
          if (!resultCheckOcurrenceInAlerts) {
            await insertNewAlert(dataAlert)
            await joinAlertsAndUsers(resultHashOcurrence, idRegion)
          }
        }
      })
    )
    await checkAlertState(idRegion)
  } catch (error) {
    console.log(error)
  }
}

async function checkOccurrence(stationName) {
  try {
    Model.knex(knexPg)
    let result = await ObjectionStationRepository.getStationFromName(
      stationName
    )
    if (Object.keys(result).length > 0) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
  }
}

async function checkOccurrenceInAlerts(alertID) {
  try {
    Model.knex(knexPg)

    const resultOcurrence = await Alerts.query().where('id', '=', alertID)
    if (Object.keys(resultOcurrence).length > 0) return true
    else return false
  } catch (e) {
    console.log(e)
  }
}

async function insertNewAlert(dataAlert) {
  Model.knex(knexPg)
  const result = await Alerts.query()
    .insert(dataAlert)
    .returning('id')
  return result
}

async function joinAlertsAndUsers(alertID, idRegion) {
  Model.knex(knexPg)
  let users = await ObjectionUserRepository.getUsersByIdRegion(idRegion)
  Promise.all(
    Object.keys(users).map(async (key, element) => {
      await AlertsAndUsers.query()
        .insert({
          id_user: users[key].ID,
          id_alert: alertID,
          read_state: false,
        })
        .returning('*')
    })
  )
}

async function deleteAlert(id_alert) {
  Model.knex(knexPg)
  await AlertsAndUsers.query()
    .delete()
    .where('id_alert', '=', id_alert)
  await Alerts.query()
    .delete()
    .where('id', '=', id_alert)
}

async function checkAlertState(idRegion) {
  Model.knex(knexPg)
  let date = moment().format('YYYYMMDD')
  const result = await Alerts.query().where('id_region', idRegion)
  Promise.all(
    Object.keys(result).map(async (element, index) => {
      if (result.kpi === null) {
        let resultStation = await ObjectionStationRepository.getStationFromName(
          result.element_name
        )
        if (Object.keys(resultStation).length > 0) {
          await deleteAlert(result.id)
        }
      }
    })
  )

  //Llamar a la funcion para llenar estaciones y sectores
}
