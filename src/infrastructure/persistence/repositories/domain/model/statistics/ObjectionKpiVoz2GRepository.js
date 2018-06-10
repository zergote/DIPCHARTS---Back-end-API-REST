import { PerfKpiVoz2G } from '../../../../../../domain/model/statistics'
import { PerfKpiVoz2GCluster } from '../../../../../../domain/model/statistics'
import { knexOc } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionKpiVoz2GRepository {
  async getStatisticsPerfInfoCluster(
    sinceTheDate,
    untilTheDate,
    clusterName,
    kpiName
  ) {
    try {
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

      if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
        //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
        kpiName = 'ERLANGS'
        querySelect =
          "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
          kpiName +
          ') as VALOR'
      }

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

      const resultStats = await PerfKpiVoz2G.query()
        .select(PerfKpiVoz2G.raw(querySelect))
        .where('FECHA', '>=', sinceTheDate)
        .andWhere('FECHA', '<=', untilTheDate)
        .andWhere('CLUST', clusterName)
        .groupBy('FECHA', 'HORA')
        .orderBy('FECHA', 'asc')
      return resultStats
    } catch (err) {
      console.log(err)
    }
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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

    const resultStats = await PerfKpiVoz2G.query()
      .select(PerfKpiVoz2G.raw(querySelect))
      .joinRaw(
        PerfKpiVoz2G.raw(
          'JOIN BDPOPER.PERF_INFO_RUTAS_PREPAGO ON BDPOPER.RF_KPISVOZ_2G_ORIENTE.CELLID = BDPOPER.PERF_INFO_RUTAS_PREPAGO.CELLID'
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
    try {
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

      if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
        //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
        kpiName = 'ERLANGS'
        querySelect =
          "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
          kpiName +
          ') as VALOR'
      }

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

      const resultStats = await PerfKpiVoz2G.query()
        .select(PerfKpiVoz2G.raw(querySelect))
        .joinRaw(
          PerfKpiVoz2G.raw(
            'JOIN BDPOPER.PERF_INFO_MERCADO ON BDPOPER.RF_KPISVOZ_2G_ORIENTE.CELLID = BDPOPER.PERF_INFO_MERCADO.CELLID'
          )
        )
        .where('FECHA', '>=', sinceTheDate)
        .andWhere('FECHA', '<=', untilTheDate)
        .andWhere('MERCADO', mercadoName)
        .groupBy('FECHA', 'HORA')
        .orderBy('FECHA', 'asc')
      return resultStats
    } catch (err) {
      console.log(err)
    }
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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

    const resultStats = await PerfKpiVoz2G.query()
      .select(PerfKpiVoz2G.raw(querySelect))
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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

    const resultStats = await PerfKpiVoz2G.query()
      .select(PerfKpiVoz2G.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('BTS', stationName)
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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
      const resultStats = await PerfKpiVoz2G.query()
        .select(PerfKpiVoz2G.raw(querySelect))
        .where('FECHA', '>=', sinceTheDate)
        .andWhere('FECHA', '<=', untilTheDate)
        .andWhere('SECTOR', sectorName)
        .groupBy('FECHA', 'HORA')
        .orderBy('FECHA', 'asc')
      return resultStats
    } else {
      const resultStats = await PerfKpiVoz2G.query()
        .select(PerfKpiVoz2G.raw(querySelect))
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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

    const resultStats = await PerfKpiVoz2G.query()
      .select(PerfKpiVoz2G.raw(querySelect))
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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

    const resultStats = await PerfKpiVoz2G.query()
      .select(PerfKpiVoz2G.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('BTS', stationName)
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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
      const resultStats = await PerfKpiVoz2G.query()
        .select(PerfKpiVoz2G.raw(querySelect))
        .where('FECHA', '>=', sinceTheDate)
        .andWhere('FECHA', '<=', untilTheDate)
        .andWhere('SECTOR', sectorName)
        .groupBy('FECHA', 'HORA')
        .orderBy('FECHA', 'asc')
      return resultStats
    } else {
      const resultStats = await PerfKpiVoz2G.query()
        .select(PerfKpiVoz2G.raw(querySelect))
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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

    const resultStats = await PerfKpiVoz2GCluster.query()
      .select(PerfKpiVoz2GCluster.raw(querySelect))
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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

    const resultStats = await PerfKpiVoz2GCluster.query()
      .select(PerfKpiVoz2GCluster.raw(querySelect))
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

    if (kpiName === 'ERLANG' || kpiName === 'ERLANGS') {
      //ELIMINAR LA SIGUIENTE LINEA CUANDO SEA ARREGLADO EL NOMBRE DEL ATRIBUTO EN LA TABLA DE LA BASE DE DATOS
      kpiName = 'ERLANGS'
      querySelect =
        "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, SUM(" +
        kpiName +
        ') as VALOR'
    }

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

    const resultStats = await PerfKpiVoz2GCluster.query()
      .select(PerfKpiVoz2GCluster.raw(querySelect))
      .where('FECHA', '>=', sinceTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('FECHA', '<=', untilTheDate)
      .andWhere('SUBREGION', 'like', subregionName)
      .groupBy('FECHA', 'HORA')
      .orderBy('FECHA', 'asc')
    return resultStats
  }

  //RETURN ALL SECTORS WITH CCR AND ERLANG
  async getStatisticsCCRAllSectorsInAHourByRegion(
    regionName,
    date,
    hour,
    umbralCCR
  ) {
    let queryString = "SELECT BTS, AVG(CCR) as CCR, REGION FROM BDPOPER.RF_KPISVOZ_2G_ORIENTE WHERE FECHA = " + date + " AND HORA = " + hour + " AND REGION = '" + regionName + "' GROUP BY BTS, REGION HAVING AVG(CCR) <= " + umbralCCR
    const resultStats = await knexOc.raw(queryString)
    return resultStats
  }


  async getStatisticsErlangAllSectorsInAHourByRegion(
    regionName,
    date,
    hour,
    umbralERLANG
  ) {
    let queryString = "SELECT BTS, SUM(ERLANGS) as ERLANGS, REGION FROM BDPOPER.RF_KPISVOZ_2G_ORIENTE WHERE FECHA = " + date + " AND HORA = "+ hour + " AND REGION = '" + regionName + "' GROUP BY BTS, REGION HAVING SUM(ERLANGS) <= " + umbralERLANG
    const resultStats = await knexOc.raw(queryString)
    return resultStats
  }

  async getSectorBySectorName(sectorName, date) {
    Model.knex(knexOc)
    const resultStats = await PerfKpiVoz2G.query()
      .select('BTS', 'CCR', 'ERLANG')
      .where('BTS', sectorName)
      .andWhere('FECHA', '=', date)
      .limit(1)
    return resultStats
  }
}

export default new ObjectionKpiVoz2GRepository()
