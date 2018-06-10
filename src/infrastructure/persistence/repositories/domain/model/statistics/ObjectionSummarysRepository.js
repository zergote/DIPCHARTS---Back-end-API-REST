import { PerfKpiDatos2G } from '../../../../../../domain/model/statistics'
import { PerfKpiDatos2GCluster } from '../../../../../../domain/model/statistics'
import { TopStationsErlang } from '../../../../../../domain/model/statistics'
import { TopStationsPayload } from '../../../../../../domain/model/statistics'
import { SumTotalErlangMonthToDay } from '../../../../../../domain/model/statistics'
import { SumTotalPayloadMonthToDay } from '../../../../../../domain/model/statistics'
import { Erlang2gUntil30DaysByHour } from '../../../../../../domain/model/statistics'
import { Erlang3gUntil30DaysByHour } from '../../../../../../domain/model/statistics'
import { Payload2gUntil30DaysByHour } from '../../../../../../domain/model/statistics'
import { Payload3gUntil30DaysByHour } from '../../../../../../domain/model/statistics'
import { Payload4gUntil30DaysByHour } from '../../../../../../domain/model/statistics'
import { ErlangLatest12Month } from '../../../../../../domain/model/statistics'
import { PayloadLatest12Month } from '../../../../../../domain/model/statistics'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionSummarysRepository {
  async getStatisticsTopStationsErlang(idRegion) {
    Model.knex(knexPg)
    const resultStats = await TopStationsErlang.query()
      .select(
        TopStationsErlang.raw(
          'NAME, ERLANG2G, ERLANG3G, ROUND((ERLANG2G + ERLANG3G),2) as TOTAL'
        )
      )
      .where('id_region', '=', idRegion)
      .orderBy('total', 'desc')
      .limit(10)
    return resultStats
  }

  async getStatisticsTopStationsPayload(idRegion) {
    Model.knex(knexPg)
    const resultStats = await TopStationsPayload.query()
      .select(
        TopStationsPayload.raw(
          'NAME, ROUND((PAYLOAD2G/1024/1024),2) as payload2g, ROUND((PAYLOAD3G/1024/1024),2) as payload3g, ROUND((PAYLOAD4G/1024/1024),2) as payload4g, ROUND(((PAYLOAD2G + PAYLOAD3G + PAYLOAD4G)/1024/1024),2) as TOTAL'
        )
      )
      .where('id_region', '=', idRegion)
      .orderBy('total', 'desc')
      .limit(10)
    return resultStats
  }

  async getStatisticsSumErlangMTD(idRegion) {
    Model.knex(knexPg)
    const resultStats = await SumTotalErlangMonthToDay.query()
      .select(
        SumTotalErlangMonthToDay.raw(
          'DESDE, HASTA, ERLANG2G, ERLANG3G, ROUND((ERLANG2G + ERLANG3G),2) as TOTAL, MES_ACTUAL'
        )
      )
      .where('id_region', '=', idRegion)
    return resultStats
  }

  async getStatisticsSumPayloadMTD(idRegion) {
    Model.knex(knexPg)
    const resultStats = await SumTotalPayloadMonthToDay.query()
      .select(
        SumTotalPayloadMonthToDay.raw(
          'DESDE, HASTA, PAYLOAD2G, PAYLOAD3G, PAYLOAD4G, ROUND(((PAYLOAD2G + PAYLOAD3G + PAYLOAD4G)/1024/1024),2) as TOTAL, MES_ACTUAL'
        )
      )
      .where('id_region', '=', idRegion)
    return resultStats
  }

  async getStatisticsErlang2gUntil30days(idRegion) {
    Model.knex(knexPg)
    const resultStats = await Erlang2gUntil30DaysByHour.query()
      .select('FECHA', 'HORA', 'ERLANG2G')
      .where('ID_REGION', '=', idRegion)
    return resultStats
  }

  async getStatisticsErlang3gUntil30days(idRegion) {
    Model.knex(knexPg)
    const resultStats = await Erlang3gUntil30DaysByHour.query()
      .select('FECHA', 'HORA', 'ERLANG3G')
      .where('ID_REGION', '=', idRegion)
    return resultStats
  }

  async getStatisticsPayload2gUntil30days(idRegion) {
    Model.knex(knexPg)
    const resultStats = await Payload2gUntil30DaysByHour.query()
      .select('FECHA', 'HORA', 'PAYLOAD2G')
      .where('ID_REGION', '=', idRegion)
    return resultStats
  }

  async getStatisticsPayload3gUntil30days(idRegion) {
    Model.knex(knexPg)
    const resultStats = await Payload3gUntil30DaysByHour.query()
      .select('FECHA', 'HORA', 'PAYLOAD3G')
      .where('ID_REGION', '=', idRegion)
    return resultStats
  }

  async getStatisticsPayload4gUntil30days(idRegion) {
    Model.knex(knexPg)
    const resultStats = await Payload4gUntil30DaysByHour.query()
      .select('FECHA', 'HORA', 'PAYLOAD4G')
      .where('ID_REGION', '=', idRegion)
    return resultStats
  }

  async getStatisticsSumErlangByMonth(idRegion) {
    Model.knex(knexPg)
    const resultStats = await ErlangLatest12Month.query()
      .select(
        ErlangLatest12Month.raw(
          'YEAR, MONTH, ERLANG2G, ERLANG3G, ROUND((ERLANG2G + ERLANG3G),2) as TOTAL'
        )
      )
      .where('id_region', '=', idRegion)
      .orderBy('year', 'asc')
      .orderBy('month', 'asc')
    return resultStats
  }

  async getStatisticsSumPayloadByMonth(idRegion) {
    Model.knex(knexPg)
    const resultStats = await PayloadLatest12Month.query()
      .select(
        PayloadLatest12Month.raw(
          'YEAR, MONTH, PAYLOAD2G, PAYLOAD3G, PAYLOAD4G, ROUND(((PAYLOAD2G + PAYLOAD3G + PAYLOAD4G)/1024/1024),2) as TOTAL'
        )
      )
      .where('id_region', '=', idRegion)
      .orderBy('year', 'asc')
      .orderBy('month', 'asc')
    return resultStats
  }
}

export default new ObjectionSummarysRepository()
