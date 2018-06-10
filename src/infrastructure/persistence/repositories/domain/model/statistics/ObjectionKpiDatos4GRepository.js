import { PerfKpiDatos4G } from '../../../../../../domain/model/statistics'
import { PerfKpiDatos4GCluster } from '../../../../../../domain/model/statistics'
import { knexOc } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionKpiDatos4GRepository {
  async getStatisticsPerfInfoCluster(
    sinceTheDate,
    untilTheDate,
    clusterName,
    kpiName
  ) {
    Model.knex(knexOc)

    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4G.query()
      .select(PerfKpiDatos4G.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('CLUST', clusterName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  async getStatisticsEstado(sinceTheDate, untilTheDate, estadoName, kpiName) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4G.query()
      .select(PerfKpiDatos4G.raw(querySelect))
      .joinRaw(
        PerfKpiDatos4G.raw(
          'JOIN BDPOPER.PERF_INFO_RUTAS_PREPAGO ON BDPOPER.RF_KPISDATOS_4G_ORIENTE.ENODEBID = BDPOPER.PERF_INFO_RUTAS_PREPAGO.CELLID'
        )
      )
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('ESTADO', estadoName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  async getStatisticsMercado(sinceTheDate, untilTheDate, mercadoName, kpiName) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4G.query()
      .select(PerfKpiDatos4G.raw(querySelect))
      .joinRaw(
        PerfKpiDatos4G.raw(
          'JOIN BDPOPER.PERF_INFO_MERCADO ON BDPOPER.RF_KPISDATOS_4G_ORIENTE.ENODEBID = BDPOPER.PERF_INFO_MERCADO.CELLID'
        )
      )
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('MERCADO', mercadoName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  async getStatisticsRegion(sinceTheDate, untilTheDate, regionName, kpiName) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4G.query()
      .select(PerfKpiDatos4G.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('REGION', regionName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  async getStatisticsStationRegion(
    sinceTheDate,
    untilTheDate,
    stationName,
    kpiName
  ) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4G.query()
      .select(PerfKpiDatos4G.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('ENODEB', stationName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }
  async getStatisticsSectorRegion(
    sinceTheDate,
    untilTheDate,
    sectorName,
    kpiName
  ) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 AS FECHA, " +
      kpiName +
      ' as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'ERLANG' ||
      kpiName === 'ERLANGS' ||
      kpiName === 'PAYLOAD_TOT' ||
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    ) {
      const resultStats = await PerfKpiDatos4G.query()
        .select(PerfKpiDatos4G.raw(querySelect))
        .where('FECHA', '>=', sinceTheDate)
        .andWhere('FECHA', '<=', untilTheDate)
        .andWhere('SECTOR', sectorName)
        .groupBy('FECHA', 'HORA')
        .orderBy('FECHA', 'asc')
      return resultStats
    } else {
      const resultStats = await PerfKpiDatos4G.query()
        .select(PerfKpiDatos4G.raw(querySelect))
        .where('FECHA', '>=', sinceTheDate)
        .andWhere('FECHA', '<=', untilTheDate)
        .andWhere('SECTOR', sectorName)
        .orderBy('FECHA', 'asc')
      return resultStats
    }
  }

  ////////////

  async getStatisticsSubregion(
    sinceTheDate,
    untilTheDate,
    subregionName,
    kpiName
  ) {
    if (subregionName === 'Valles Del Tuy') {
      subregionName = '%Valles %'
    }
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4G.query()
      .select(PerfKpiDatos4G.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('SUBREGION', 'like', subregionName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  async getStatisticsStationSubregion(
    sinceTheDate,
    untilTheDate,
    stationName,
    kpiName
  ) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4G.query()
      .select(PerfKpiDatos4G.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('ENODEB', stationName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  async getStatisticsSectorSubregion(
    sinceTheDate,
    untilTheDate,
    sectorName,
    kpiName
  ) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 AS FECHA, " +
      kpiName +
      ' as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'ERLANG' ||
      kpiName === 'ERLANGS' ||
      kpiName === 'PAYLOAD_TOT' ||
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    ) {
      const resultStats = await PerfKpiDatos4G.query()
        .select(PerfKpiDatos4G.raw(querySelect))
        .where('FECHA', '>=', sinceTheDate)
        .andWhere('FECHA', '<=', untilTheDate)
        .andWhere('SECTOR', sectorName)
        .groupBy('FECHA', 'HORA')
        .orderBy('FECHA', 'asc')
      return resultStats
    } else {
      const resultStats = await PerfKpiDatos4G.query()
        .select(PerfKpiDatos4G.raw(querySelect))
        .where('FECHA', '>=', sinceTheDate)
        .andWhere('FECHA', '<=', untilTheDate)
        .andWhere('SECTOR', sectorName)
        .orderBy('FECHA', 'asc')
      return resultStats
    }
  }

  //Consultas para la tabla clust

  async getStatisticsRegionCluster(
    sinceTheDate,
    untilTheDate,
    regionName,
    kpiName
  ) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4GCluster.query()
      .select(PerfKpiDatos4GCluster.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('REGION', regionName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  async getStatisticsCluster(sinceTheDate, untilTheDate, clusterName, kpiName) {
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4GCluster.query()
      .select(PerfKpiDatos4GCluster.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('CLUST', clusterName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  ////////////

  async getStatisticsSubregionCluster(
    sinceTheDate,
    untilTheDate,
    subregionName,
    kpiName
  ) {
    if (subregionName === 'Valles Del Tuy') {
      subregionName = '%Valles %'
    }
    Model.knex(knexOc)
    let querySelect =
      "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
      kpiName +
      ') as VALOR'

    if (kpiName === 'PAYLOAD_TOT')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS')
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    if (
      kpiName === 'USERSDL' ||
      kpiName === 'USERSUL' ||
      kpiName === 'USERS_HSDPA' ||
      kpiName === 'USERS_HSUPA'
    )
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'

    const resultStats = await PerfKpiDatos4GCluster.query()
      .select(PerfKpiDatos4GCluster.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('SUBREGION', 'like', subregionName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  //RETURN ALL SECTORS WITH PCR AND PAYLOAD
  async getStatisticsPCRAllSectorsInAHourByRegion(
    regionName,
    date,
    hour,
    umbralPCR
  ) {
    try {
      let queryString = "SELECT ENODEB, AVG(PCR) as PCR, REGION FROM BDPOPER.RF_KPISDATOS_4G_ORIENTE WHERE FECHA = " + date + " AND HORA = "+ hour + " AND REGION = '" + regionName + "' GROUP BY ENODEB, REGION HAVING AVG(PCR) <= " + umbralPCR
      const resultStats = await knexOc.raw(queryString)
      return resultStats
    } catch (e) {
      console.log(e)
    }
  }

  async getStatisticsPayloadAllSectorsInAHourByRegion(
    regionName,
    date,
    hour,
    umbralPAYLOAD
  ) {
    let queryString = "SELECT ENODEB, SUM(PAYLOAD_TOT) as PAYLOAD_TOT, REGION FROM BDPOPER.RF_KPISDATOS_4G_ORIENTE WHERE FECHA = " + date + " AND HORA = "+ hour + " AND REGION = '" + regionName +  "' GROUP BY ENODEB, REGION HAVING SUM(PAYLOAD_TOT) <= " + umbralPAYLOAD
    const resultStats = await knexOc.raw(queryString)
    return resultStats
  }

  async getStations(regionName) {
    Model.knex(knexOc)
    let resultOc = await PerfKpiDatos4G.query()
      .select(PerfKpiDatos4G.raw('DISTINCT ENODEB, REGION, SUBREGION, CLUST'))
      .where(PerfKpiDatos4G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"))
      .andWhere('REGION', regionName)
    return resultOc
  }

  async getSectorBySectorName(sectorName, date) {
    Model.knex(knexOc)
    const resultStats = await PerfKpiDatos4G.query()
      .select('ENODEB', 'PCR', 'PAYLOAD')
      .where('ENODEB', sectorName)
      .andWhere('FECHA', '=', date)
      .limit(1)
    return resultStats
  }
}

export default new ObjectionKpiDatos4GRepository()
