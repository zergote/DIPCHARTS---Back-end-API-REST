import { ObjectionKpiVoz2GRepository } from '../../infrastructure/persistence/repositories/domain/model/statistics'

class GetKpiVoz2G {
  async getStatisticsPerfInfoCluster(
    sinceTheDate,
    untilTheDate,
    clusterName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsPerfInfoCluster(
      sinceTheDate,
      untilTheDate,
      clusterName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  async getStatisticsEstado(sinceTheDate, untilTheDate, estadoName, kpiName) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsEstado(
      sinceTheDate,
      untilTheDate,
      estadoName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  async getStatisticsMercado(sinceTheDate, untilTheDate, mercadoName, kpiName) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsMercado(
      sinceTheDate,
      untilTheDate,
      mercadoName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  async getStatisticsRegion(sinceTheDate, untilTheDate, regionName, kpiName) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsRegion(
      sinceTheDate,
      untilTheDate,
      regionName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  async getStatisticsStationRegion(
    sinceTheDate,
    untilTheDate,
    stationName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsStationRegion(
      sinceTheDate,
      untilTheDate,
      stationName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  async getStatisticsSectorRegion(
    sinceTheDate,
    untilTheDate,
    sectorName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsSectorRegion(
      sinceTheDate,
      untilTheDate,
      sectorName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  //////////////

  async getStatisticsSubregion(
    sinceTheDate,
    untilTheDate,
    subregionName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsSubregion(
      sinceTheDate,
      untilTheDate,
      subregionName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  async getStatisticsStationSubregion(
    sinceTheDate,
    untilTheDate,
    stationName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsStationSubregion(
      sinceTheDate,
      untilTheDate,
      stationName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  async getStatisticsSectorSubregion(
    sinceTheDate,
    untilTheDate,
    sectorName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsSectorSubregion(
      sinceTheDate,
      untilTheDate,
      sectorName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  //Estadisticas para clusteres
  //////////////Region
  async getStatisticsRegionCluster(
    sinceTheDate,
    untilTheDate,
    regionName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsRegionCluster(
      sinceTheDate,
      untilTheDate,
      regionName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  async getStatisticsCluster(sinceTheDate, untilTheDate, clusterName, kpiName) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsCluster(
      sinceTheDate,
      untilTheDate,
      clusterName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }

  //////////////Subregion

  async getStatisticsSubregionCluster(
    sinceTheDate,
    untilTheDate,
    subregionName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiVoz2GRepository.getStatisticsSubregionCluster(
      sinceTheDate,
      untilTheDate,
      subregionName,
      kpiName
    )
    let arrayData = []
    resultStats.forEach(function(element) {
      arrayData.push([element.FECHA, element.VALOR])
    }, this)
    return arrayData
  }
}

export default new GetKpiVoz2G()
