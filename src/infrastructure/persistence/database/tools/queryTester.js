// Modulo para hacer pruebas de consultas a base de datos
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

class PERF_INFO_MERCADO extends Model {
  static get tableName() {
    return "BDPOPER.PERF_INFO_MERCADO";
  }
}

//     .where(PERF_INFO_MERCADO.raw("FECHA = TO_CHAR(SYSDATE, 'YYYYMMDD')"))

async function start() {
  Model.knex(knexOc);
  let kpiName = "PCR";
  let querySelect =
    "(TO_DATE(FECHA || HORA, 'YYYYMMDDHH24') - TO_DATE('01-01-1970 00:00:00', 'DD-MM-YYYY HH24:MI:SS')) *24 * 60 * 60 * 1000 as FECHA, AVG(" +
    kpiName +
    ") as VALOR";
  let resultOc = await PERF_KPISDATOS_4G.query()
    .select(querySelect)
    .joinRaw(
      PERF_KPISDATOS_4G.raw(
        "JOIN BDPOPER.PERF_INFO_MERCADO ON BDPOPER.PERF_KPISDATOS_4G.ENODEBID = BDPOPER.PERF_INFO_MERCADO.CELLID"
      )
    )
    .where("FECHA", ">=", "20171027")
    .andWhere("FECHA", "<=", "20171027")
    .andWhere("MERCADO", "MERIDA")
    .groupBy("FECHA", "HORA")
    .orderBy("FECHA", "asc");
  console.log(resultOc);
}
start();
