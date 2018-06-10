import { Model } from 'objection'
import moment from 'moment'
import { PayloadLatest12Month } from '../../domain/model/statistics'
import { PerfKpiDatos2G } from '../../domain/model/statistics'
import { PerfKpiDatos3G } from '../../domain/model/statistics'
import { PerfKpiDatos4G } from '../../domain/model/statistics'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'

// RESUMEN DE PAYLOAD SUMA DE TODO EL MES POR UN AÑO DESDE EL ULTIMO MES
export default async function extractPayloadByMonthByYTM(region, idRegion) {
  try {
    let payloadIn12Months = []

    let year = moment()
      .subtract(12, 'months')
      .startOf('month')
      .format('YYYY')
    let month = moment()
      .subtract(12, 'months')
      .startOf('month')
      .format('MM')
    let startDate = moment()
      .subtract(12, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    let endDate = moment()
      .subtract(12, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes01 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes01[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(11, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(11, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(11, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(11, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes02 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes02[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(10, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(10, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(10, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(10, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes03 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes03[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(9, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(9, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(9, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(9, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes04 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes04[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(8, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(8, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(8, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(8, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes05 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes05[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(7, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(7, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(7, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(7, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes06 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes06[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(6, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(6, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(6, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(6, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes07 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes07[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(5, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(5, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(5, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(5, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes08 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes08[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(4, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(4, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(4, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(4, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes09 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes09[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(3, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(3, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes10 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes10[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(2, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(2, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(2, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(2, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes11 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes11[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    year = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY')
    month = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('MM')
    startDate = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    let mes12 = await payload2gByMonth(region, startDate, endDate)
    payloadIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      payload2g: testNumber(mes12[0].VALUE),
      payload3g: 0,
      payload4g: 0,
      id_region: idRegion,
    })

    //salvar en base de datos payload 2g

    //Reunir payload 3g por mes desde base de datos de performance
    startDate = moment()
      .subtract(12, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(12, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes01 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[0].payload3g = testNumber(mes01[0].VALUE)

    startDate = moment()
      .subtract(11, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(11, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes02 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[1].payload3g = testNumber(mes02[0].VALUE)

    startDate = moment()
      .subtract(10, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(10, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes03 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[2].payload3g = testNumber(mes03[0].VALUE)

    startDate = moment()
      .subtract(9, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(9, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes04 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[3].payload3g = testNumber(mes04[0].VALUE)

    startDate = moment()
      .subtract(8, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(8, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes05 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[4].payload3g = testNumber(mes05[0].VALUE)

    startDate = moment()
      .subtract(7, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(7, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes06 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[5].payload3g = testNumber(mes06[0].VALUE)

    startDate = moment()
      .subtract(6, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(6, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes07 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[6].payload3g = testNumber(mes07[0].VALUE)

    startDate = moment()
      .subtract(5, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(5, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes08 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[7].payload3g = testNumber(mes08[0].VALUE)

    startDate = moment()
      .subtract(4, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(4, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes09 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[8].payload3g = testNumber(mes09[0].VALUE)

    startDate = moment()
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(3, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes10 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[9].payload3g = testNumber(mes10[0].VALUE)

    startDate = moment()
      .subtract(2, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(2, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes11 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[10].payload3g = testNumber(mes11[0].VALUE)

    startDate = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes12 = await payload3gByMonth(region, startDate, endDate)
    payloadIn12Months[11].payload3g = testNumber(mes12[0].VALUE)

    //Salvar payload 3g en base de datos

    //Reunir payload 4g por mes desde base de datos de performance
    startDate = moment()
      .subtract(12, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(12, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes01 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[0].payload4g = testNumber(mes01[0].VALUE)

    startDate = moment()
      .subtract(11, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(11, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes02 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[1].payload4g = testNumber(mes02[0].VALUE)

    startDate = moment()
      .subtract(10, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(10, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes03 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[2].payload4g = testNumber(mes03[0].VALUE)

    startDate = moment()
      .subtract(9, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(9, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes04 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[3].payload4g = testNumber(mes04[0].VALUE)

    startDate = moment()
      .subtract(8, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(8, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes05 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[4].payload4g = testNumber(mes05[0].VALUE)

    startDate = moment()
      .subtract(7, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(7, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes06 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[5].payload4g = testNumber(mes06[0].VALUE)

    startDate = moment()
      .subtract(6, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(6, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes07 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[6].payload4g = testNumber(mes07[0].VALUE)

    startDate = moment()
      .subtract(5, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(5, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes08 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[7].payload4g = testNumber(mes08[0].VALUE)

    startDate = moment()
      .subtract(4, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(4, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes09 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[8].payload4g = testNumber(mes09[0].VALUE)

    startDate = moment()
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(3, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes10 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[9].payload4g = testNumber(mes10[0].VALUE)

    startDate = moment()
      .subtract(2, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(2, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes11 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[10].payload4g = testNumber(mes11[0].VALUE)

    startDate = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes12 = await payload4gByMonth(region, startDate, endDate)
    payloadIn12Months[11].payload4g = testNumber(mes12[0].VALUE)

    let result = await savePayloadByMonth(payloadIn12Months)
    console.log(
      'Completado: Resumen Payload de ultimos 12 meses de la region: ' + region
    )

    return result
  } catch (error) {
    console.log(error)
  }

  //Salvar payload 4g en base de datos
}

async function payload2gByMonth(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos2G.query()
    .select(PerfKpiDatos2G.raw('SUM("PAYLOAD_TOT") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

async function payload3gByMonth(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos3G.query()
    .select(PerfKpiDatos3G.raw('SUM("PAYLOAD_TOTAL") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

async function payload4gByMonth(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiDatos4G.query()
    .select(PerfKpiDatos4G.raw('SUM("PAYLOAD_TOT") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

async function savePayloadByMonth(data) {
  Model.knex(knexPg)
  let result = await PayloadLatest12Month.query()
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
