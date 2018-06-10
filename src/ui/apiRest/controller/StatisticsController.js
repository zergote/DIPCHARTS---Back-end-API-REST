import { GetKpiDatos2G } from '../../../application/statistics'
import { GetKpiDatos3G } from '../../../application/statistics'
import { GetKpiDatos4G } from '../../../application/statistics'
import { GetKpiVoz2G } from '../../../application/statistics'
import { GetKpiVoz3G } from '../../../application/statistics'
import { GetNetworkService } from '../../../application/networkService'
import { GetSector } from '../../../application/networkStructure'
import { GetSummarys } from '../../../application/statistics'
class StatisticsController {
  constructor() {}

  async getStatisticsRegion(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )
    const kpiName = req.params.kpiName
    const regionName = req.params.regionName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate

    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsRegion(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsRegion(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsRegion(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsRegion(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsRegion(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsStationRegion(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const stationName = req.params.stationName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate

    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsSectorRegion(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName

    const sectorName = await GetSector.getSectorNameFromId(req.params.idSector)

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate
    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsSectorRegion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsSectorRegion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsSectorRegion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsSectorRegion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsSectorRegion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  /////
  async getStatisticsSubregion(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const subregionName = req.params.subregionName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate

    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsSubregion(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsSubregion(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsSubregion(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsSubregion(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsSubregion(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsStationSubregion(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const stationName = req.params.stationName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate

    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsStationSubregion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsStationSubregion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsStationSubregion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsStationSubregion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsStationSubregion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsSectorSubregion(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName

    const sectorName = await GetSector.getSectorNameFromId(req.params.idSector)

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate
    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsSectorSubregion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsSectorSubregion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsSectorSubregion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsSectorSubregion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsSectorSubregion(
          sinceTheDate,
          untilTheDate,
          sectorName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  //Estadisticas para clusteres

  async getStatisticsRegionCluster(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const regionName = req.params.regionName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate

    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsRegionCluster(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsRegionCluster(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsRegionCluster(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsRegionCluster(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsRegionCluster(
          sinceTheDate,
          untilTheDate,
          regionName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsCluster(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const clusterName = req.params.clusterName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate

    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  //Subregion Cluster
  async getStatisticsSubregionCluster(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const subregionName = req.params.subregionName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate

    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsSubregionCluster(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsSubregionCluster(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsSubregionCluster(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsSubregionCluster(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsSubregionCluster(
          sinceTheDate,
          untilTheDate,
          subregionName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsMercado(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const mercadoName = req.params.mercadoName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate
    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsMercado(
          sinceTheDate,
          untilTheDate,
          mercadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsMercado(
          sinceTheDate,
          untilTheDate,
          mercadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsMercado(
          sinceTheDate,
          untilTheDate,
          mercadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsMercado(
          sinceTheDate,
          untilTheDate,
          mercadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsMercado(
          sinceTheDate,
          untilTheDate,
          mercadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsEstado(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const estadoName = req.params.estadoName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate
    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsEstado(
          sinceTheDate,
          untilTheDate,
          estadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsEstado(
          sinceTheDate,
          untilTheDate,
          estadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsEstado(
          sinceTheDate,
          untilTheDate,
          estadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsEstado(
          sinceTheDate,
          untilTheDate,
          estadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsEstado(
          sinceTheDate,
          untilTheDate,
          estadoName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsPerfInfoCluster(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )

    const kpiName = req.params.kpiName
    const clusterName = req.params.clusterName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate
    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsPerfInfoCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsPerfInfoCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsPerfInfoCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsPerfInfoCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsPerfInfoCluster(
          sinceTheDate,
          untilTheDate,
          clusterName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }

  async getStatisticsTopStationsErlang(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsTopStationsErlang(idRegion)
    return res.send(arrayData).json()
  }

  async getStatisticsTopStationsPayload(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsTopStationsPayload(
      idRegion
    )
    return res.send(arrayData).json()
  }

  async getStatisticsSumErlangMTD(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsSumErlangMTD(idRegion)
    return res.send(arrayData).json()
  }

  async getStatisticsSumPayloadMTD(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsSumPayloadMTD(idRegion)
    return res.send(arrayData).json()
  }

  async getStatisticsErlang2gUntil30days(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsErlang2gUntil30days(
      idRegion
    )
    return res.send(arrayData).json()
  }

  async getStatisticsErlang3gUntil30days(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsErlang3gUntil30days(
      idRegion
    )
    return res.send(arrayData).json()
  }

  async getStatisticsPayload2gUntil30days(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsPayload2gUntil30days(
      idRegion
    )
    return res.send(arrayData).json()
  }

  async getStatisticsPayload3gUntil30days(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsPayload3gUntil30days(
      idRegion
    )
    return res.send(arrayData).json()
  }

  async getStatisticsPayload4gUntil30days(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsPayload4gUntil30days(
      idRegion
    )
    return res.send(arrayData).json()
  }

  async getStatisticsSumErlangByMonth(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsSumErlangByMonth(idRegion)
    return res.send(arrayData).json()
  }

  async getStatisticsSumPayloadByMonth(req, res) {
    const idRegion = req.params.idRegion
    const arrayData = await GetSummarys.getStatisticsSumPayloadByMonth(idRegion)
    return res.send(arrayData).json()
  }

  async getStatisticsStationForMoreAlertDetails(req, res) {
    const techDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )
    const kpiName = req.params.kpiName

    const stationName = req.params.stationName

    const sinceTheDate = req.params.sinceTheDate
    const untilTheDate = req.params.untilTheDate
    const valueKpiFail = req.params.kpiValue

    switch (techDBTableName) {
      case 'PERF_KPISVOZ_2G': {
        let arrayData = await GetKpiVoz2G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_2G': {
        const arrayData = await GetKpiDatos2G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISVOZ_3G': {
        const arrayData = await GetKpiVoz3G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_3G': {
        const arrayData = await GetKpiDatos3G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }

      case 'PERF_KPISDATOS_4G': {
        const arrayData = await GetKpiDatos4G.getStatisticsStationRegion(
          sinceTheDate,
          untilTheDate,
          stationName,
          kpiName
        )
        return res.send(arrayData).json()
      }
      default:
        break
    }
  }
}

export default new StatisticsController()
