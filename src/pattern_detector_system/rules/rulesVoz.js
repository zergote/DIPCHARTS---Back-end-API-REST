import { Model } from 'objection'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'
import moment from 'moment'
import {
  ObjectionKpiVoz2GRepository,
  ObjectionKpiVoz3GRepository,
} from '../../infrastructure/persistence/repositories/domain/model/statistics'
import { Alerts, AlertsAndUsers } from '../../domain/model/alerts'
import { hash } from '../utils'
import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'
import acho from 'acho'

//Configuración de salidas por consola
const log = acho()

export default async function rulesVoz(
  regionName,
  idRegion,
  date,
  hour,
  umbralCCR,
  umbralERLANG
) {
  try {
    let stations2GVozCCR = await ObjectionKpiVoz2GRepository.getStatisticsCCRAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralCCR
    )

    let stations2GVozERLANG = await ObjectionKpiVoz2GRepository.getStatisticsErlangAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralERLANG
    )

    let stations3GVozCCR = await ObjectionKpiVoz3GRepository.getStatisticsCCRAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralCCR
    )

    let stations3GVozERLANG = await ObjectionKpiVoz3GRepository.getStatisticsErlangAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralERLANG
    )

    //RECOGER Y TRATAR INFORMACION

    Promise.all(
      Object.keys(stations2GVozCCR).map(async (key, index) => {
        let resultHashOcurrence = hash(stations2GVozCCR[key].BTS + 'CCR')
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'CCR EN ' + stations2GVozCCR[key].CCR.toFixed(2),
            body:
              'La estación ' +
              stations2GVozCCR[key].BTS +
              ' tiene un CCR deficiente de ' +
              stations2GVozCCR[key].CCR.toFixed(2) +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            type: 3,
            kpiValue: stations2GVozCCR[key].CCR,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations2GVozCCR[key].CCR,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations2GVozCCR[key].BTS,
            title: 'CCR EN ' + stations2GVozCCR[key].CCR.toFixed(2),
            body:
              'La estación ' +
              stations2GVozCCR[key].BTS +
              ' tiene un CCR deficiente de ' +
              stations2GVozCCR[key].CCR.toFixed(2) +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            start_date: date,
            start_hour: hour,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpi: 'CCR',
            kpiValue: stations2GVozCCR[key].CCR,
            chartView: true,
            type: 2,
            id_service: 1,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    Promise.all(
      Object.keys(stations2GVozERLANG).map(async (key, index) => {
        let resultHashOcurrence = hash(stations2GVozERLANG[key].BTS + 'ERLANG')
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'ERLANG EN ' + stations2GVozERLANG[key].ERLANGS,
            body:
              'La estación ' +
              stations2GVozERLANG[key].BTS +
              ' tiene un ERLANG deficiente de ' +
              stations2GVozERLANG[key].ERLANGS +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            kpiValue: stations2GVozERLANG[key].ERLANGS,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations2GVozERLANG[key].ERLANGS,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations2GVozERLANG[key].BTS,
            title: 'ERLANG EN ' + stations2GVozERLANG[key].ERLANGS,
            body:
              'La estación ' +
              stations2GVozERLANG[key].BTS +
              ' tiene un ERLANG deficiente de ' +
              stations2GVozERLANG[key].ERLANGS +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            start_date: date,
            start_hour: hour,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpi: 'ERLANG',
            kpiValue: stations2GVozERLANG[key].ERLANGS,
            chartView: true,
            type: 3,
            id_service: 1,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    Promise.all(
      Object.keys(stations3GVozCCR).map(async (key, index) => {
        let resultHashOcurrence = hash(stations3GVozCCR[key].NODEB + 'CCR')
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'CCR EN ' + stations3GVozCCR[key].CCR.toFixed(2),
            body:
              'La estación ' +
              stations3GVozCCR[key].NODEB +
              ' tiene un CCR deficiente de ' +
              stations3GVozCCR[key].CCR.toFixed(2) +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            type: 3,
            kpiValue: stations3GVozCCR[key].CCR,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations3GVozCCR[key].CCR,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations3GVozCCR[key].NODEB,
            title: 'CCR EN ' + stations3GVozCCR[key].CCR.toFixed(2),
            body:
              'La estación ' +
              stations3GVozCCR[key].NODEB +
              ' tiene un CCR deficiente de ' +
              stations3GVozCCR[key].CCR.toFixed(2) +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            start_date: date,
            start_hour: hour,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpi: 'CCR',
            kpiValue: stations3GVozCCR[key].CCR,
            chartView: true,
            type: 2,
            id_service: 3,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    Promise.all(
      Object.keys(stations3GVozERLANG).map(async (key, index) => {
        let resultHashOcurrence = hash(
          stations3GVozERLANG[key].NODEB + 'ERLANG'
        )

        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'ERLANG EN ' + stations3GVozERLANG[key].ERLANGS,
            body:
              'La estación ' +
              stations3GVozERLANG[key].NODEB +
              ' tiene un ERLANG deficiente de ' +
              stations3GVozERLANG[key].ERLANGS +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            kpiValue: stations3GVozERLANG[key].ERLANGS,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations3GVozERLANG[key].ERLANGS,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations3GVozERLANG[key].NODEB,
            title: 'ERLANG EN ' + stations3GVozERLANG[key].ERLANGS,
            body:
              'La estación ' +
              stations3GVozERLANG[key].NODEB +
              ' tiene un ERLANG deficiente de ' +
              stations3GVozERLANG[key].ERLANGS +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            start_date: date,
            start_hour: hour,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpi: 'ERLANGS',
            kpiValue: stations3GVozERLANG[key].ERLANGS,
            chartView: true,
            type: 3,
            id_service: 3,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    //REVISAR SI YA SE HAN CORREGIDO FALLAS Y ELIMINARLAS DE LAS ALERTAS
    await checkAlertState(idRegion)
    log.info('Busquedas de patrones anormales en CCR y ERLANG completada')
  } catch (error) {
    console.log(error)
  }
}

async function checkOccurrence(id) {
  Model.knex(knexPg)
  const result = await Alerts.query()
    .select('id', 'start_date', 'start_hour')
    .where('id', '=', id)
  return result
}

async function updateAlert(id, dateAlertUdate) {
  try {
    Model.knex(knexPg)
    const result = await Alerts.query()
      .update(dateAlertUdate)
      .where('id', '=', id)
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
  try {
    Model.knex(knexPg)
    let users = await ObjectionUserRepository.getUsersByIdRegion(idRegion)
    Promise.all(
      Object.keys(users).map(async (key, element) => {
        await AlertsAndUsers.query().insert({
          id_user: users[key].ID,
          id_alert: alertID,
          read_state: false,
        })
      })
    )
  } catch (e) {
    console.log(e)
  }
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
      switch (element.kpi) {
        case 'CCR':
          if (result.id_service === 1) {
            let sector2g = ObjectionKpiVoz2GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector2g[0].CCR > umbralCCR) {
              await deletedAlert(result.id)
            }
          }

          if (result.id_service === 3) {
            let sector3g = ObjectionKpiVoz3GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector3g[0].CCR > umbralCCR) {
              await deletedAlert(result.id)
            }
          }
          break
        case 'ERLANG':
          if (result.id_service === 1) {
            let sector = ObjectionKpiVoz2GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector[0].ERLANG > umbralERLANG) {
              await deletedAlert(result.id)
            }
          }
          if (result.id_service === 3) {
            let sector = ObjectionKpiVoz3GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector[0].ERLANGS > umbralERLANG) {
              await deletedAlert(result.id)
            }
          }
          break
        default:
          break
      }
    })
  )
}