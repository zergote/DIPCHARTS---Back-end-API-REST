import { ObjectionSummarysRepository } from '../../infrastructure/persistence/repositories/domain/model/statistics'
import moment from 'moment'

class GetSummarys {
  async getStatisticsTopStationsErlang(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsTopStationsErlang(
      idRegion
    )
    return resultStats
  }

  async getStatisticsTopStationsPayload(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsTopStationsPayload(
      idRegion
    )
    return resultStats
  }

  async getStatisticsSumErlangMTD(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsSumErlangMTD(
      idRegion
    )
    return resultStats
  }

  async getStatisticsSumPayloadMTD(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsSumPayloadMTD(
      idRegion
    )
    return resultStats
  }

  async getStatisticsErlang2gUntil30days(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsErlang2gUntil30days(
      idRegion
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      let unixTimestamp = moment(
        moment(
          element.FECHA.toString() + element.HORA.toString(),
          'YYYYMMDDH'
        ) * 1000
      ).unix()
      arrayData.push([unixTimestamp, element.ERLANG2G])
    }, this)
    return arrayData
  }

  async getStatisticsErlang3gUntil30days(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsErlang3gUntil30days(
      idRegion
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      let unixTimestamp = moment(
        moment(
          element.FECHA.toString() + element.HORA.toString(),
          'YYYYMMDDH'
        ) * 1000
      ).unix()
      arrayData.push([unixTimestamp, element.ERLANG3G])
    }, this)
    return arrayData
  }

  async getStatisticsPayload2gUntil30days(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsPayload2gUntil30days(
      idRegion
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      let unixTimestamp = moment(
        moment(
          element.FECHA.toString() + element.HORA.toString(),
          'YYYYMMDDH'
        ) * 1000
      ).unix()
      arrayData.push([unixTimestamp, element.PAYLOAD2G])
    }, this)
    return arrayData
  }

  async getStatisticsPayload3gUntil30days(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsPayload3gUntil30days(
      idRegion
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      let unixTimestamp = moment(
        moment(
          element.FECHA.toString() + element.HORA.toString(),
          'YYYYMMDDH'
        ) * 1000
      ).unix()
      arrayData.push([unixTimestamp, element.PAYLOAD3G])
    }, this)
    return arrayData
  }

  async getStatisticsPayload4gUntil30days(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsPayload4gUntil30days(
      idRegion
    )
    let arrayData = []
    let unixTimestamp = null
    resultStats.forEach(function(element) {
      let unixTimestamp = moment(
        moment(
          element.FECHA.toString() + element.HORA.toString(),
          'YYYYMMDDH'
        ) * 1000
      ).unix()
      arrayData.push([unixTimestamp, element.PAYLOAD4G])
    }, this)
    return arrayData
  }

  async getStatisticsSumErlangByMonth(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsSumErlangByMonth(
      idRegion
    )
    return resultStats
  }

  async getStatisticsSumPayloadByMonth(idRegion) {
    const resultStats = await ObjectionSummarysRepository.getStatisticsSumPayloadByMonth(
      idRegion
    )
    return resultStats
  }
}

export default new GetSummarys()
