import { Model } from 'objection'
import { knexPg } from '../../../config'
import { knexOc } from '../../../config'
import moment from 'moment'
import { ErlangLatest12Month } from '../../domain/model/statistics'
import { PerfKpiVoz2G } from '../../domain/model/statistics'
import { PerfKpiVoz3G } from '../../domain/model/statistics'

// RESUMEN DE ERLANG SUMA DE TODO EL MES POR UN AÑO DESDE EL ULTIMO MES
export default async function extractErlangByMonthByYTM(region, idRegion) {
  try {
    let erlangIn12Months = []
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
    let mes01 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes01[0].VALUE),
      erlang3g: 0,
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
    let mes02 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes02[0].VALUE),
      erlang3g: 0,
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
    let mes03 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes03[0].VALUE),
      erlang3g: 0,
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
    let mes04 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes04[0].VALUE),
      erlang3g: 0,
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
    let mes05 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes05[0].VALUE),
      erlang3g: 0,
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
    let mes06 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes06[0].VALUE),
      erlang3g: 0,
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
    let mes07 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes07[0].VALUE),
      erlang3g: 0,
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
    let mes08 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes08[0].VALUE),
      erlang3g: 0,
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
    let mes09 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes09[0].VALUE),
      erlang3g: 0,
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
    let mes10 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes10[0].VALUE),
      erlang3g: 0,
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
    let mes11 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes11[0].VALUE),
      erlang3g: 0,
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
    let mes12 = await erlang2gByMonth(region, startDate, endDate)
    erlangIn12Months.push({
      year: parseInt(year),
      month: parseInt(month),
      erlang2g: testNumber(mes12[0].VALUE),
      erlang3g: 0,
      id_region: idRegion,
    })

    //Reunir erlang 3g por mes desde base de datos de performance
    startDate = moment()
      .subtract(12, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(12, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes01 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[0].erlang3g = testNumber(mes01[0].VALUE)

    startDate = moment()
      .subtract(11, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(11, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes02 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[1].erlang3g = testNumber(mes02[0].VALUE)

    startDate = moment()
      .subtract(10, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(10, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes03 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[2].erlang3g = testNumber(mes03[0].VALUE)

    startDate = moment()
      .subtract(9, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(9, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes04 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[3].erlang3g = testNumber(mes04[0].VALUE)

    startDate = moment()
      .subtract(8, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(8, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes05 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[4].erlang3g = testNumber(mes05[0].VALUE)

    startDate = moment()
      .subtract(7, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(7, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes06 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[5].erlang3g = testNumber(mes06[0].VALUE)

    startDate = moment()
      .subtract(6, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(6, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes07 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[6].erlang3g = testNumber(mes07[0].VALUE)

    startDate = moment()
      .subtract(5, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(5, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes08 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[7].erlang3g = testNumber(mes08[0].VALUE)

    startDate = moment()
      .subtract(4, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(4, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes09 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[8].erlang3g = testNumber(mes09[0].VALUE)

    startDate = moment()
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(3, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes10 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[9].erlang3g = testNumber(mes10[0].VALUE)

    startDate = moment()
      .subtract(2, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(2, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes11 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[10].erlang3g = testNumber(mes11[0].VALUE)

    startDate = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYYMMDD')
    endDate = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYYMMDD')
    mes12 = await erlang3gByMonth(region, startDate, endDate)
    erlangIn12Months[11].erlang3g = testNumber(mes12[0].VALUE)

    let result = await saveErlangByMonth(erlangIn12Months)

    console.log(
      'Completado: Resumen Erlang de ultimos 12 meses de la region: ' + region
    )

    return result
  } catch (error) {
    console.log(error)
  }
}

async function erlang2gByMonth(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiVoz2G.query()
    .select(PerfKpiVoz2G.raw('SUM("ERLANGS") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

async function erlang3gByMonth(region, startDate, endDate) {
  Model.knex(knexOc)
  let result = await PerfKpiVoz3G.query()
    .select(PerfKpiVoz3G.raw('SUM("ERLANGS") as VALUE'))
    .where('FECHA', '>=', startDate)
    .andWhere('FECHA', '<=', endDate)
    .andWhere('REGION', region)
  return result
}

async function saveErlangByMonth(data) {
  Model.knex(knexPg)
  let result = await ErlangLatest12Month.query()
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
