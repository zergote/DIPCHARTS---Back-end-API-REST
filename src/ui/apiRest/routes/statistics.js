import { StatisticsController } from "../controller";
import { UserController } from "../controller";
import express from "express";

const router = express.Router();

router
  .route("/region/:regionName/:idService/:kpiName/:sinceTheDate/:untilTheDate")
  .get(StatisticsController.getStatisticsRegion);

//Retorna estadistica de la estacion desde una fecha de inicio hasta una final
router
  .route(
    "/region/station/:stationName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsStationRegion);

//Retorna estadistica del sector desde una fecha de inicio hasta una final
router
  .route(
    "/region/sector/:idSector/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsSectorRegion);

///////////// API PARA SUBREGIONES
router
  .route(
    "/subregion/:subregionName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsSubregion);

//Retorna estadistica de la estacion desde una fecha de inicio hasta una final
router
  .route(
    "/subregion/station/:stationName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsStationSubregion);

//Retorna estadistica del sector desde una fecha de inicio hasta una final
router
  .route(
    "/subregion/sector/:idSector/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsSectorSubregion);

//////Consultas para la tabla de clusters////////
//////////////API NUEVA//////////////////
//Retorna las estadistica de la region
router
  .route(
    "/cluster/region/:regionName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsRegionCluster);

//Retorna estadistica del cluster desde una fecha de inicio hasta una final
router
  .route(
    "/cluster/:clusterName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsCluster);

///////////// API PARA SUBREGIONES
router
  .route(
    "/cluster/subregion/:subregionName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsSubregionCluster);

//////Consultas para la tabla de mercados////////
//////////////API NUEVA//////////////////
//Retorna estadistica del mercado desde una fecha de inicio hasta una final
router
  .route(
    "/mercado/region/:mercadoName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsMercado);

///////////// API PARA SUBREGIONES
router
  .route(
    "/mercado/subregion/:mercadoName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsMercado);

//////Consultas para las estadisticas de estado////////
//////////////API NUEVA//////////////////
//Retorna estadistica del estado desde una fecha de inicio hasta una final
router
  .route(
    "/estado/region/:estadoName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsEstado);

///////////// API PARA SUBREGIONES
router
  .route(
    "/estado/subregion/:estadoName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsEstado);

//////Consultas de estadisticas para las tablas de informacion pero consultadas por clusters////////
//////////////API NUEVA//////////////////
//Retorna las estadistica de la region
router
  .route(
    "/perfinfocluster/region/:clusterName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsPerfInfoCluster);

///////////// API PARA SUBREGIONES
router
  .route(
    "/perfinfocluster/subregion/:clusterName/:idService/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsPerfInfoCluster);

//('/cluster/perfinfo/')

//Api Dashboard

router
  .route("/dashboard/topstationserlang/:idRegion")
  .get(StatisticsController.getStatisticsTopStationsErlang);

router
  .route("/dashboard/topstationspayload/:idRegion")
  .get(StatisticsController.getStatisticsTopStationsPayload);

router
  .route("/dashboard/sumerlangmtd/:idRegion")
  .get(StatisticsController.getStatisticsSumErlangMTD);

router
  .route("/dashboard/sumpayloadgmtd/:idRegion")
  .get(StatisticsController.getStatisticsSumPayloadMTD);

router
  .route("/dashboard/erlang2guntil30days/:idRegion")
  .get(StatisticsController.getStatisticsErlang2gUntil30days);

router
  .route("/dashboard/erlang3guntil30days/:idRegion")
  .get(StatisticsController.getStatisticsErlang3gUntil30days);

router
  .route("/dashboard/payload2guntil30days/:idRegion")
  .get(StatisticsController.getStatisticsPayload2gUntil30days);

router
  .route("/dashboard/payload3guntil30days/:idRegion")
  .get(StatisticsController.getStatisticsPayload3gUntil30days);

router
  .route("/dashboard/payload4guntil30days/:idRegion")
  .get(StatisticsController.getStatisticsPayload4gUntil30days);

router
  .route("/dashboard/sumerlangbymonth/:idRegion")
  .get(StatisticsController.getStatisticsSumErlangByMonth);

router
  .route("/dashboard/sumpayloadbymonth/:idRegion")
  .get(StatisticsController.getStatisticsSumPayloadByMonth);

//Retorna estadistica del sector para el panel del dashboard
router
  .route(
    "/stats/:stationName/:idService/:kpiValue/:kpiName/:sinceTheDate/:untilTheDate"
  )
  .get(StatisticsController.getStatisticsStationForMoreAlertDetails);

export default router;
