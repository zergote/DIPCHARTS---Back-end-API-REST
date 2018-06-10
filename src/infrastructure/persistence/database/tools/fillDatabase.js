import { Model } from "objection";
import { knexOc, knexPg } from "../../database";

//Clases que devuelven modelos para las consultas
class PERF_KPISVOZ_2G extends Model {
  static get tableName() {
    return "BDPOPER.PERF_KPISVOZ_2G";
  }
}

class PERF_KPISDATOS_2G extends Model {
  static get tableName() {
    return "BDPOPER.PERF_KPISDATOS_2G";
  }
}

class PERF_KPISVOZ_3G extends Model {
  static get tableName() {
    return "BDPOPER.PERF_KPISVOZ_3G";
  }
}

class PERF_KPISDATOS_3G extends Model {
  static get tableName() {
    return "BDPOPER.PERF_KPISDATOS_3G";
  }
}

class PERF_KPISDATOS_4G extends Model {
  static get tableName() {
    return "BDPOPER.PERF_KPISDATOS_4G";
  }
}

class PERF_INFO_MERCADO extends Model {
  static get tableName() {
    return "BDPOPER.PERF_INFO_MERCADO";
  }
}

class PERF_INFO_RUTAS_PREPAGO extends Model {
  static get tableName() {
    return "BDPOPER.PERF_INFO_RUTAS_PREPAGO";
  }
}

class TECHNOLOGY extends Model {
  static get tableName() {
    return "TECHNOLOGY";
  }
}

class SERVICE extends Model {
  static get tableName() {
    return "SERVICE";
  }
}

class KPI extends Model {
  static get tableName() {
    return "KPI";
  }
}

class REGION extends Model {
  static get tableName() {
    return "REGION";
  }
}

class SUBREGION extends Model {
  static get tableName() {
    return "SUBREGION";
  }
}

class CLUST extends Model {
  static get tableName() {
    return "CLUST";
  }
}

class MERCADO extends Model {
  static get tableName() {
    return "MERCADO";
  }
}

class STATION extends Model {
  static get tableName() {
    return "STATION";
  }
}

class SECTOR extends Model {
  static get tableName() {
    return "SECTOR";
  }
}

class ESTADO extends Model {
  static get tableName() {
    return "ESTADO";
  }
}
//Funciones para poblar las tablas que definen las estructuras de la red
async function rellenarTecnologias() {
  Model.knex(knexPg);
  let result = await TECHNOLOGY.query()
    .insert([{ TECHNOLOGY: "2G" }, { TECHNOLOGY: "3G" }, { TECHNOLOGY: "4G" }])
    .returning("ID");
  console.log("Tecnologías cargadas");
}

//Funciones para poblar las tablas que definen las estructuras de la red
async function rellenarServicios() {
  Model.knex(knexPg);
  let technologyId2G = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "2G");
  let technologyId3G = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "3G");
  let technologyId4G = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "4G");
  let result = await SERVICE.query()
    .insert([
      {
        ID_TECHNOLOGY: technologyId2G[0].ID,
        SERVICE: "2G VOZ",
        DB_TABLE_NAME: "PERF_KPISVOZ_2G"
      },
      {
        ID_TECHNOLOGY: technologyId2G[0].ID,
        SERVICE: "2G DATOS",
        DB_TABLE_NAME: "PERF_KPISDATOS_2G"
      },
      {
        ID_TECHNOLOGY: technologyId3G[0].ID,
        SERVICE: "3G VOZ",
        DB_TABLE_NAME: "PERF_KPISVOZ_3G"
      },
      {
        ID_TECHNOLOGY: technologyId3G[0].ID,
        SERVICE: "3G DATOS",
        DB_TABLE_NAME: "PERF_KPISDATOS_3G"
      },
      {
        ID_TECHNOLOGY: technologyId4G[0].ID,
        SERVICE: "4G DATOS",
        DB_TABLE_NAME: "PERF_KPISDATOS_4G"
      }
    ])
    .returning("ID");
  console.log("Servicios cargados");
}

async function rellenarKpi() {
  Model.knex(knexPg);
  let result = await KPI.query()
    .insert([
      { KPI: "CCR", ID_SERVICE: 1 },
      { KPI: "ERLANG", ID_SERVICE: 1 },
      { KPI: "CSF", ID_SERVICE: 1 },
      { KPI: "DROP_CALLS", ID_SERVICE: 1 },
      { KPI: "HOF", ID_SERVICE: 1 },
      { KPI: "PCR", ID_SERVICE: 2 },
      { KPI: "PAYLOAD_TOT", ID_SERVICE: 2 },
      { KPI: "CCR", ID_SERVICE: 3 },
      { KPI: "ERLANGS", ID_SERVICE: 3 },
      { KPI: "DROP_CALLS", ID_SERVICE: 3 },
      { KPI: "PCR", ID_SERVICE: 4 },
      { KPI: "PAYLOAD_TOT", ID_SERVICE: 4 },
      { KPI: "THROUGHPUT_HSDPA", ID_SERVICE: 4 },
      { KPI: "USERS_HSDPA", ID_SERVICE: 4 },
      { KPI: "USERS_HSUPA", ID_SERVICE: 4 },
      { KPI: "DCH_USERS", ID_SERVICE: 4 },
      { KPI: "FACH_USERS", ID_SERVICE: 4 },
      { KPI: "PCR", ID_SERVICE: 5 },
      { KPI: "PAYLOAD_TOT", ID_SERVICE: 5 },
      { KPI: "THROUGHPUTDL_KBPS", ID_SERVICE: 5 },
      { KPI: "USERSDL", ID_SERVICE: 5 },
      { KPI: "USERSUL", ID_SERVICE: 5 }
    ])
    .returning("*");
  console.log("KPIs cargados");
}

async function rellenarRegion() {
  Model.knex(knexOc);
  let resultOc = await PERF_KPISVOZ_2G.query()
    .select(PERF_KPISVOZ_2G.raw("DISTINCT REGION"))
    .where(PERF_KPISVOZ_2G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  for (let i in resultOc) {
    if (resultOc[i].REGION == null) {
      // await REGION.query()
      // .insert({ REGION: 'No definida' })
      // .returning("ID");
      continue;
    }
    await REGION.query()
      .insert({ REGION: resultOc[i].REGION })
      .returning("ID");
  }
  //await REGION.query().insert({ REGION: "No Definida" }).returning("ID");
  console.log("Regiones cargadas");
}

async function rellenarSubregion() {
  Model.knex(knexOc);
  let resultOc = await PERF_KPISVOZ_2G.query()
    .select(PERF_KPISVOZ_2G.raw("DISTINCT SUBREGION"))
    .where(PERF_KPISVOZ_2G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  for (let i in resultOc) {
    if (resultOc[i].SUBREGION == null) {
      // await SUBREGION.query()
      // .insert({ SUBREGION: 'No definida' })
      // .returning("ID");
      continue;
    }
    await SUBREGION.query()
      .insert({ SUBREGION: resultOc[i].SUBREGION })
      .returning("ID");
  }
  //await SUBREGION.query().insert({ SUBREGION: "No Definida" }).returning("ID");
  console.log("Subregiones cargadas");
}

async function rellenarCluster() {
  Model.knex(knexOc);
  let resultOc = await PERF_KPISVOZ_2G.query()
    .select(PERF_KPISVOZ_2G.raw("DISTINCT CLUST, REGION, SUBREGION"))
    .where(PERF_KPISVOZ_2G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  for (let i in resultOc) {
    let resultIdRegion = await REGION.query()
      .select("ID")
      .where("REGION", resultOc[i].REGION);

    let resultIdSubregion = await SUBREGION.query()
      .select("ID")
      .where("SUBREGION", resultOc[i].SUBREGION);

    if (typeof resultIdRegion[0] === "undefined") {
      continue;
    }

    if (typeof resultIdSubregion[0] === "undefined") {
      continue;
    }
    await CLUST.query()
      .insert({
        CLUST: resultOc[i].CLUST,
        ID_REGION: resultIdRegion[0].ID,
        ID_SUBREGION: resultIdSubregion[0].ID
      })
      .returning("ID");
  }
  //await CLUST.query().insert({ CLUST: "No Definida" }).returning("ID");
  console.log("Clusters cargados");
}

async function rellenarEstados() {
  Model.knex(knexOc);
  let resultOc = await PERF_INFO_RUTAS_PREPAGO.query().select(
    PERF_INFO_RUTAS_PREPAGO.raw("DISTINCT ESTADO, REGION, SUBREGION")
  );
  Model.knex(knexPg);
  for (let i in resultOc) {
    let resultIdRegion = await REGION.query()
      .select("ID")
      .where("REGION", resultOc[i].REGION);

    let resultIdSubregion = await SUBREGION.query()
      .select("ID")
      .where("SUBREGION", resultOc[i].SUBREGION);

    if (typeof resultIdRegion[0] === "undefined") {
      continue;
    }

    if (typeof resultIdSubregion[0] === "undefined") {
      continue;
    }
    await ESTADO.query()
      .insert({
        ESTADO: resultOc[i].ESTADO,
        ID_REGION: resultIdRegion[0].ID,
        ID_SUBREGION: resultIdSubregion[0].ID
      })
      .returning("ID");
  }
  //await CLUST.query().insert({ CLUST: "No Definida" }).returning("ID");
  console.log("Estados cargados");
}

async function rellenarMercado() {
  Model.knex(knexOc);
  let resultOc = await PERF_INFO_MERCADO.query().select(
    PERF_INFO_MERCADO.raw("DISTINCT MERCADO, REGION, SUBREGION")
  );
  Model.knex(knexPg);
  for (let i in resultOc) {
    let resultIdRegion = await REGION.query()
      .select("ID")
      .where("REGION", resultOc[i].REGION);

    let resultIdSubregion = await SUBREGION.query()
      .select("ID")
      .where("SUBREGION", resultOc[i].SUBREGION);

    if (typeof resultIdRegion[0] === "undefined") {
      continue;
    }

    if (typeof resultIdSubregion[0] === "undefined") {
      await MERCADO.query()
        .insert({
          MERCADO: resultOc[i].MERCADO,
          ID_REGION: resultIdRegion[0].ID,
          ID_SUBREGION: resultIdRegion[0].ID
        })
        .returning("ID");
      continue;
    }

    await MERCADO.query()
      .insert({
        MERCADO: resultOc[i].MERCADO,
        ID_REGION: resultIdRegion[0].ID,
        ID_SUBREGION: resultIdSubregion[0].ID
      })
      .returning("ID");
  }
  console.log("Mercados cargados");
}

async function rellenarStation() {
  //Solo se listan las estaciones con tecnologia de datos debido a que
  //son las mismas para las tecnologias de voz, asi que las agregamos sin
  //volver a realizar la consulta nuevamente

  //Estaciones 2G

  Model.knex(knexOc);
  let resultOc = await PERF_KPISDATOS_2G.query()
    .select(PERF_KPISDATOS_2G.raw("DISTINCT BTS, REGION, SUBREGION, CLUST"))
    .where(PERF_KPISDATOS_2G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  let resultIdTechnology = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "2G");
  for (let i in resultOc) {
    let resultIdRegion = await REGION.query()
      .select("ID")
      .where("REGION", resultOc[i].REGION);

    let resultIdSubregion = await SUBREGION.query()
      .select("ID")
      .where("SUBREGION", resultOc[i].SUBREGION);

    let resultIdClust = await CLUST.query()
      .select("ID")
      .where("CLUST", resultOc[i].CLUST);

    if (typeof resultIdRegion[0] === "undefined") {
      console.log("Estacion " + resultOc[i].BTS + " no tiene region asignada");
      continue;
    }

    if (typeof resultIdSubregion[0] === "undefined") {
      console.log(
        "Estacion " + resultOc[i].BTS + " no tiene subregion asignada"
      );
      continue;
    }

    if (typeof resultIdClust[0] === "undefined") {
      console.log("Estacion " + resultOc[i].BTS + " no tiene cluster asignado");
      continue;
    }

    let resultStation = await STATION.query()
      .insert({
        STATION: resultOc[i].BTS,
        ID_REGION: resultIdRegion[0].ID,
        ID_TECHNOLOGY: resultIdTechnology[0].ID,
        ID_SUBREGION: resultIdSubregion[0].ID,
        ID_CLUST: resultIdClust[0].ID
      })
      .returning("ID");
  }

  console.log("Estaciones 2G Cargadas");

  //Estaciones 3G

  Model.knex(knexOc);
  resultOc = await PERF_KPISDATOS_3G.query()
    .select(PERF_KPISDATOS_3G.raw("DISTINCT NODEB, REGION, SUBREGION, CLUST"))
    .where(PERF_KPISDATOS_3G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  resultIdTechnology = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "3G");
  for (let i in resultOc) {
    let resultIdRegion = await REGION.query()
      .select("ID")
      .where("REGION", resultOc[i].REGION);

    let resultIdSubregion = await SUBREGION.query()
      .select("ID")
      .where("SUBREGION", resultOc[i].SUBREGION);

    let resultIdClust = await CLUST.query()
      .select("ID")
      .where("CLUST", resultOc[i].CLUST);

    if (typeof resultIdRegion[0] === "undefined") {
      console.log(
        "Estacion " + resultOc[i].NODEB + " no tiene region asignada"
      );
      continue;
    }

    if (typeof resultIdSubregion[0] === "undefined") {
      console.log(
        "Estacion " + resultOc[i].NODEB + " no tiene subregion asignada"
      );
      continue;
    }

    if (typeof resultIdClust[0] === "undefined") {
      console.log(
        "Estacion " + resultOc[i].NODEB + " no tiene cluster asignada"
      );
      continue;
    }

    let resultStation = await STATION.query()
      .insert({
        STATION: resultOc[i].NODEB,
        ID_REGION: resultIdRegion[0].ID,
        ID_TECHNOLOGY: resultIdTechnology[0].ID,
        ID_SUBREGION: resultIdSubregion[0].ID,
        ID_CLUST: resultIdClust[0].ID
      })
      .returning("ID");
  }

  console.log("Estaciones 3G cargadas");

  //Estaciones 4G DATOS

  Model.knex(knexOc);
  resultOc = await PERF_KPISDATOS_4G.query()
    .select(PERF_KPISDATOS_4G.raw("DISTINCT ENODEB, REGION, SUBREGION, CLUST"))
    .where(PERF_KPISDATOS_4G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  resultIdTechnology = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "4G");
  for (let i in resultOc) {
    let resultIdRegion = await REGION.query()
      .select("ID")
      .where("REGION", resultOc[i].REGION);

    let resultIdSubregion = await SUBREGION.query()
      .select("ID")
      .where("SUBREGION", resultOc[i].SUBREGION);

    let resultIdClust = await CLUST.query()
      .select("ID")
      .where("CLUST", resultOc[i].CLUST);

    if (typeof resultIdRegion[0] === "undefined") {
      console.log(
        "Estacion " + resultOc[i].ENODEB + " no tiene region asignada"
      );
      continue;
    }

    if (typeof resultIdSubregion[0] === "undefined") {
      console.log(
        "Estacion " + resultOc[i].ENODEB + " no tiene subregion asignada"
      );
      continue;
    }

    if (typeof resultIdClust[0] === "undefined") {
      console.log(
        "Estacion " + resultOc[i].ENODEB + " no tiene cluster asignada"
      );
      continue;
    }

    let resultStation = await STATION.query()
      .insert({
        STATION: resultOc[i].ENODEB,
        ID_REGION: resultIdRegion[0].ID,
        ID_TECHNOLOGY: resultIdTechnology[0].ID,
        ID_SUBREGION: resultIdSubregion[0].ID,
        ID_CLUST: resultIdClust[0].ID
      })
      .returning("ID");
  }
  console.log("Estaciones 4G cargadas");
}

async function rellenarSectores() {
  //Solo se listan los sectores con tecnologia de DATOS debido a que
  //son los mismos para las tecnologias de VOZ, asi que los agregamos sin
  //volver a realizar la consulta nuevamente

  //Sectores 2G VOZ
  Model.knex(knexOc);
  let resultOc = await PERF_KPISDATOS_2G.query()
    .select(PERF_KPISDATOS_2G.raw("DISTINCT SECTOR, BTS"))
    .where(PERF_KPISDATOS_2G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  let resultIdTechnology = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "2G");
  for (let i in resultOc) {
    let resultIdStation = await STATION.query()
      .select("ID")
      .where("STATION", resultOc[i].BTS);

    if (typeof resultIdStation[0] === "undefined") {
      console.log(
        "Sector " + resultOc[i].SECTOR + " no tiene estacion asignada"
      );
      continue;
    }

    let resultSector = await SECTOR.query()
      .insert({
        SECTOR: resultOc[i].SECTOR,
        ID_STATION: resultIdStation[0].ID,
        ID_TECHNOLOGY: resultIdTechnology[0].ID
      })
      .returning("ID");
  }
  console.log("Sectores 2G Cargados");

  //Sectores 3G VOZ
  Model.knex(knexOc);
  resultOc = await PERF_KPISDATOS_3G.query()
    .select(PERF_KPISDATOS_3G.raw("DISTINCT SECTOR, NODEB"))
    .where(PERF_KPISDATOS_3G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  resultIdTechnology = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "3G");
  for (let i in resultOc) {
    let resultIdStation = await STATION.query()
      .select("ID")
      .where("STATION", resultOc[i].NODEB);
    if (typeof resultIdStation[0] === "undefined") {
      console.log(
        "Sector " + resultOc[i].SECTOR + " no tiene estacion asignada"
      );
      continue;
    }
    let resultSector = await SECTOR.query()
      .insert({
        SECTOR: resultOc[i].SECTOR,
        ID_STATION: resultIdStation[0].ID,
        ID_TECHNOLOGY: resultIdTechnology[0].ID
      })
      .returning("ID");
  }

  console.log("Sectores 3G Cargados");

  //Sectores 4G DATOS
  Model.knex(knexOc);
  resultOc = await PERF_KPISDATOS_4G.query()
    .select(PERF_KPISDATOS_4G.raw("DISTINCT SECTOR, ENODEB"))
    .where(PERF_KPISDATOS_4G.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"));
  Model.knex(knexPg);
  resultIdTechnology = await TECHNOLOGY.query()
    .select("ID")
    .where("TECHNOLOGY", "4G");
  for (let i in resultOc) {
    let resultIdStation = await STATION.query()
      .select("ID")
      .where("STATION", resultOc[i].ENODEB);
    if (typeof resultIdStation[0] === "undefined") {
      console.log(
        "Sector " + resultOc[i].SECTOR + " no tiene estacion asignada"
      );
      continue;
    }
    let resultSector = await SECTOR.query()
      .insert({
        SECTOR: resultOc[i].SECTOR,
        ID_STATION: resultIdStation[0].ID,
        ID_TECHNOLOGY: resultIdTechnology[0].ID
      })
      .returning("ID");
  }
  console.log("Sectores 4G Cargados");
}

//Llama a las funciones para llenar las tablas que definen la estructura de la red
async function start() {
  rellenarTecnologias().then(() => {
    rellenarServicios().then(() => {
      rellenarKpi().then(() => {
        rellenarRegion().then(() => {
          rellenarSubregion().then(() => {
            rellenarCluster().then(() => {
              rellenarMercado().then(() => {
                rellenarEstados().then(() => {
                  rellenarStation().then(() => {
                    rellenarSectores().then(() => {
                      console.log("Tareas finalizadas");
                      process.exit();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

start();
