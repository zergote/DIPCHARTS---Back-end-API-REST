import { ObjectionKpiDatos4GRepository } from '../../infrastructure/persistence/repositories/domain/model/statistics'

class GetKpiDatos4G {
  async getStatisticsPerfInfoCluster(
    sinceTheDate,
    untilTheDate,
    clusterName,
    kpiName
  ) {
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsPerfInfoCluster(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsEstado(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsMercado(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsRegion(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsStationRegion(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsSectorRegion(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsSubregion(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsStationSubregion(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsSectorSubregion(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsRegionCluster(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsCluster(
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
    const resultStats = await ObjectionKpiDatos4GRepository.getStatisticsSubregionCluster(
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

export default new GetKpiDatos4G()
