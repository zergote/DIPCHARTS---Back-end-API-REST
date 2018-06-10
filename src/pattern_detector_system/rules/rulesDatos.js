import { Model } from 'objection'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'
import moment from 'moment'
import {
  ObjectionKpiDatos2GRepository,
  ObjectionKpiDatos3GRepository,
  ObjectionKpiDatos4GRepository,
} from '../../infrastructure/persistence/repositories/domain/model/statistics'
import { Alerts, AlertsAndUsers } from '../../domain/model/alerts'
import { hash } from '../utils'
import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'
import acho from 'acho'

//Configuración de salidas por consola
const log = acho()

export default async function rulesDatos(
  regionName,
  idRegion,
  date,
  hour,
  umbralPCR,
  umbralPAYLOAD
) {
  try {
    let stations2GDatosPCR = await ObjectionKpiDatos2GRepository.getStatisticsPCRAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralPCR
    )

    let stations2GDatosPAYLOAD = await ObjectionKpiDatos2GRepository.getStatisticsPayloadAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralPAYLOAD
    )

    let stations3GDatosPCR = await ObjectionKpiDatos3GRepository.getStatisticsPCRAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralPCR
    )
    let stations3GDatosPAYLOAD = await ObjectionKpiDatos3GRepository.getStatisticsPayloadAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralPAYLOAD
    )

    let stations4GDatosPCR = await ObjectionKpiDatos4GRepository.getStatisticsPCRAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralPCR
    )

    let stations4GDatosPAYLOAD = await ObjectionKpiDatos4GRepository.getStatisticsPayloadAllSectorsInAHourByRegion(
      regionName,
      date,
      hour,
      umbralPAYLOAD
    )

    Promise.all(
      Object.keys(stations2GDatosPCR).map(async (key, index) => {
        let resultHashOcurrence = hash(stations2GDatosPCR[key].BTS + 'PCR')
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'PCR EN ' + stations2GDatosPCR[key].PCR.toFixed(2),
            body:
              'La estación ' +
              stations2GDatosPCR[key].BTS +
              ' tiene un PCR deficiente de ' +
              stations2GDatosPCR[key].PCR.toFixed(2) +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            type: 3,
            kpiValue: stations2GDatosPCR[key].PCR,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations2GDatosPCR[key].PCR,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations2GDatosPCR[key].BTS,
            title: 'PCR EN ' + stations2GDatosPCR[key].PCR.toFixed(2),
            body:
              'La estación ' +
              stations2GDatosPCR[key].BTS +
              ' tiene un PCR deficiente de ' +
              stations2GDatosPCR[key].PCR.toFixed(2) +
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
            kpi: 'PCR',
            kpiValue: stations2GDatosPCR[key].PCR,
            chartView: true,
            type: 2,
            id_service: 2,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    Promise.all(
      Object.keys(stations2GDatosPAYLOAD).map(async (key, index) => {
        let resultHashOcurrence = hash(
          stations2GDatosPAYLOAD[key].BTS + 'PAYLOAD_TOT'
        )
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'PAYLOAD EN ' + stations2GDatosPAYLOAD[key].PAYLOAD_TOT,
            body:
              'La estación ' +
              stations2GDatosPAYLOAD[key].BTS +
              ' tiene un PAYLOAD deficiente de ' +
              stations2GDatosPAYLOAD[key].PAYLOAD_TOT +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            kpiValue: stations2GDatosPAYLOAD[key].PAYLOAD_TOT,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations2GDatosPAYLOAD[key].PAYLOAD_TOT,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations2GDatosPAYLOAD[key].BTS,
            title: 'PAYLOAD EN ' + stations2GDatosPAYLOAD[key].PAYLOAD_TOT,
            body:
              'La estación ' +
              stations2GDatosPAYLOAD[key].BTS +
              ' tiene un PAYLOAD deficiente de ' +
              stations2GDatosPAYLOAD[key].PAYLOAD_TOT +
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
            kpi: 'PAYLOAD_TOT',
            kpiValue: stations2GDatosPAYLOAD[key].PAYLOAD_TOT,
            chartView: true,
            type: 3,
            id_service: 2,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    Promise.all(
      Object.keys(stations3GDatosPCR).map(async (key, index) => {
        let resultHashOcurrence = hash(stations3GDatosPCR[key].NODEB + 'PCR')
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'PCR EN ' + stations3GDatosPCR[key].PCR.toFixed(2),
            body:
              'La estación ' +
              stations3GDatosPCR[key].NODEB +
              ' tiene un PCR deficiente de ' +
              stations3GDatosPCR[key].PCR.toFixed(2) +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            type: 3,
            kpiValue: stations3GDatosPCR[key].PCR,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations3GDatosPCR[key].PCR,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations3GDatosPCR[key].NODEB,
            title: 'PCR EN ' + stations3GDatosPCR[key].PCR.toFixed(2),
            body:
              'La estación ' +
              stations3GDatosPCR[key].NODEB +
              ' tiene un PCR deficiente de ' +
              stations3GDatosPCR[key].PCR.toFixed(2) +
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
            kpi: 'PCR',
            kpiValue: stations3GDatosPCR[key].PCR,
            chartView: true,
            type: 2,
            id_service: 4,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    Promise.all(
      Object.keys(stations3GDatosPAYLOAD).map(async (key, index) => {
        let resultHashOcurrence = hash(
          stations3GDatosPAYLOAD[key].NODEB + 'PAYLOAD'
        )
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'PAYLOAD EN ' + stations3GDatosPAYLOAD[key].PAYLOAD_TOTAL,
            body:
              'La estación' +
              stations3GDatosPAYLOAD[key].NODEB +
              ' tiene un PAYLOAD deficiente de ' +
              stations3GDatosPAYLOAD[key].PAYLOAD_TOTAL +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            kpiValue: stations3GDatosPAYLOAD[key].PAYLOAD_TOTAL,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations3GDatosPAYLOAD[key].PAYLOAD_TOTAL,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations3GDatosPAYLOAD[key].NODEB,
            title: 'PAYLOAD EN ' + stations3GDatosPAYLOAD[key].PAYLOAD_TOTAL,
            body:
              'La estación ' +
              stations3GDatosPAYLOAD[key].NODEB +
              ' tiene un PAYLOAD deficiente de ' +
              stations3GDatosPAYLOAD[key].PAYLOAD_TOTAL +
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
            kpi: 'PAYLOAD_TOT',
            kpiValue: stations3GDatosPAYLOAD[key].PAYLOAD_TOTAL,
            chartView: true,
            type: 3,
            id_service: 4,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    Promise.all(
      Object.keys(stations4GDatosPCR).map(async (key, index) => {
        let resultHashOcurrence = hash(stations4GDatosPCR[key].ENODEB + 'PCR')
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'PCR EN ' + stations4GDatosPCR[key].PCR.toFixed(2),
            body:
              'La estación ' +
              stations4GDatosPCR[key].ENODEB +
              ' tiene un PCR deficiente de ' +
              stations4GDatosPCR[key].PCR.toFixed(2) +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            type: 3,
            kpiValue: stations4GDatosPCR[key].PCR,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations4GDatosPCR[key].PCR,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations4GDatosPCR[key].ENODEB,
            title: 'PCR EN ' + stations4GDatosPCR[key].PCR.toFixed(2),
            body:
              'La estación ' +
              stations4GDatosPCR[key].ENODEB +
              ' tiene un PCR deficiente de ' +
              stations4GDatosPCR[key].PCR.toFixed(2) +
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
            kpi: 'PCR',
            kpiValue: stations4GDatosPCR[key].PCR,
            chartView: true,
            type: 2,
            id_service: 5,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    Promise.all(
      Object.keys(stations4GDatosPAYLOAD).map(async (key, index) => {
        let resultHashOcurrence = hash(
          stations4GDatosPAYLOAD[key].ENODEB + 'PAYLOAD_TOT'
        )
        let resultCheckOcurrence = await checkOccurrence(resultHashOcurrence)

        if (Object.keys(resultCheckOcurrence).length > 0) {
          //Verificar si esta en base de datos
          //Actualizar datos si ya estaba
          let dataAlertUpdate = {
            title: 'PAYLOAD EN ' + stations4GDatosPAYLOAD[key].PAYLOAD_TOT,
            body:
              'La estación ' +
              stations4GDatosPAYLOAD[key].ENODEB +
              ' tiene un PAYLOAD deficiente de ' +
              stations4GDatosPAYLOAD[key].PAYLOAD_TOT +
              ' en la hora ' +
              hour +
              ' del día ' +
              date.substring(6, 8) +
              '/' +
              date.substring(4, 6) +
              '/' +
              date.substring(0, 4),
            kpiValue: stations4GDatosPAYLOAD[key].PAYLOAD_TOT,
            end_date: moment().format('YYYYMMDD'),
            end_hour: moment().format('H'),
            kpiValue: stations4GDatosPAYLOAD[key].PAYLOAD_TOT,
          }
          updateAlert(resultHashOcurrence, dataAlertUpdate)
        } else {
          //Guardar nueva ocurrencia en base de datos
          //Alertar a usuarios subscritos a la region
          //Guardar en tabla de usuarios y alertas
          let dataAlert = {
            id: resultHashOcurrence,
            element_name: stations4GDatosPAYLOAD[key].ENODEB,
            title: 'PAYLOAD EN ' + stations4GDatosPAYLOAD[key].PAYLOAD_TOT,
            body:
              'La estación ' +
              stations4GDatosPAYLOAD[key].ENODEB +
              ' tiene un PAYLOAD deficiente de ' +
              stations4GDatosPAYLOAD[key].PAYLOAD_TOT +
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
            kpi: 'PAYLOAD_TOT',
            kpiValue: stations4GDatosPAYLOAD[key].PAYLOAD_TOT,
            chartView: true,
            type: 3,
            id_service: 5,
            id_region: idRegion,
          }
          await insertNewAlert(dataAlert)
          await joinAlertsAndUsers(resultHashOcurrence, idRegion)
        }
      })
    )

    //REVISAR SI YA SE HAN CORREGIDO FALLAS Y ELIMINARLAS DE LAS ALERTAS
    await checkAlertState(idRegion)
    log.info('Busquedas de patrones anormales en PCR y PAYLOAD completada')
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
        case 'PCR':
          if (result.id_service === 2) {
            let sector2g = ObjectionKpiDatos2GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector2g[0].PCR > umbralPCR) {
              await deletedAlert(result.id)
            }
          }

          if (result.id_service === 4) {
            let sector3g = ObjectionKpiDatos3GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector3g[0].PCR > umbralPCR) {
              await deletedAlert(result.id)
            }
          }

          if (result.id_service === 5) {
            let sector4g = ObjectionKpiDatos4GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector4g[0].PCR > umbralPCR) {
              await deletedAlert(result.id)
            }
          }
          break
        case 'PAYLOAD':
          if (result.id_service === 2) {
            let sector2g = ObjectionKpiDatos2GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector2g[0].PAYLOAD_TOT > umbralPAYLOAD) {
              await deletedAlert(result.id)
            }
          }

          if (result.id_service === 4) {
            let sector3g = ObjectionKpiDatos3GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector3g[0].PAYLOAD_TOT > umbralPAYLOAD) {
              await deletedAlert(result.id)
            }
          }

          if (result.id_service === 5) {
            let sector4g = ObjectionKpiDatos4GRepository.getSectorBySectorName(
              result.element_name,
              date
            )
            if (sector4g[0].PAYLOAD_TOT > umbralPAYLOAD) {
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