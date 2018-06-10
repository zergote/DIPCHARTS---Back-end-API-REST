import { ObjectionKpiDatos3GRepository } from '../../infrastructure/persistence/repositories/domain/model/statistics'

class GetKpiDatos3G {
  async getStatisticsPerfInfoCluster(
    sinceTheDate,
    untilTheDate,
    clusterName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsPerfInfoCluster(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsEstado(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsMercado(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsRegion(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsStationRegion(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsSectorRegion(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsSubregion(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsStationSubregion(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsSectorSubregion(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsRegionCluster(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsCluster(
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
    const resultStats = await ObjectionKpiDatos3GRepository.getStatisticsSubregionCluster(
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

export default new GetKpiDatos3G()
