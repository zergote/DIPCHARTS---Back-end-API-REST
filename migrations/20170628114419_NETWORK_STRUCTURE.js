exports.up = function(knex, Promise) {
  return Promise.all([
    //Table for network structure
    knex.schema.createTable('TECHNOLOGY', function(table) {
      table.increments('ID').primary()
      table.string('TECHNOLOGY')
    }),

    knex.schema.createTable('SERVICE', function(table) {
      table.increments('ID').primary()
      table
        .integer('ID_TECHNOLOGY')
        .references('ID')
        .inTable('TECHNOLOGY')
      table.string('SERVICE')
      table.string('DB_TABLE_NAME')
    }),

    knex.schema.createTable('KPI', function(table) {
      table.string('KPI')
      table
        .integer('ID_SERVICE')
        .references('ID')
        .inTable('SERVICE')
      table.primary(['KPI', 'ID_SERVICE'])
    }),

    knex.schema.createTable('REGION', function(table) {
      table.increments('ID').primary()
      table.string('REGION')
    }),

    knex.schema.createTable('SUBREGION', function(table) {
      table.increments('ID').primary()
      table.string('SUBREGION')
    }),

    knex.schema.createTable('CLUST', function(table) {
      table.increments('ID').primary()
      table.string('CLUST')
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
      table
        .integer('ID_SUBREGION')
        .references('ID')
        .inTable('SUBREGION')
    }),

    knex.schema.createTable('ESTADO', function(table) {
      table.increments('ID').primary()
      table.string('ESTADO')
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
      table
        .integer('ID_SUBREGION')
        .references('ID')
        .inTable('SUBREGION')
    }),

    knex.schema.createTable('STATION', function(table) {
      table.increments('ID').primary()
      table.string('STATION')
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
      table
        .integer('ID_TECHNOLOGY')
        .references('ID')
        .inTable('TECHNOLOGY')
      table
        .integer('ID_SUBREGION')
        .references('ID')
        .inTable('SUBREGION')
      table
        .integer('ID_CLUST')
        .references('ID')
        .inTable('CLUST')
    }),

    knex.schema.createTable('MERCADO', function(table) {
      table.increments('ID').primary()
      table.string('MERCADO')
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
      table
        .integer('ID_SUBREGION')
        .references('ID')
        .inTable('SUBREGION')
    }),

    knex.schema.createTable('SECTOR', function(table) {
      table.increments('ID').primary()
      table.string('SECTOR')
      table
        .integer('ID_STATION')
        .references('ID')
        .inTable('STATION')
      table
        .integer('ID_TECHNOLOGY')
        .references('ID')
        .inTable('TECHNOLOGY')
    }),

    //Table for user information
    knex.schema.createTable('USER', function(table) {
      table
        .string('ID')
        .primary()
        .unique()
        .notNullable()
      table
        .string('USER_NAME')
        .unique()
        .notNullable()
      table.string('PASSWORD').notNullable()
      table.string('FIRST_NAME')
      table.string('LAST_NAME')
      table.string('ROL')
      table.string('EMAIL')
      table.integer('USER_LEVEL')
      table.boolean('ACTIVE_STATUS')
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('TOP_STATIONS_ERLANG', function(table) {
      table.increments('id').primary()
      table.string('name')
      table.decimal('erlang2g', 14, 2)
      table.decimal('erlang3g', 14, 2)
      table
        .integer('id_region')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('TOP_STATIONS_PAYLOAD', function(table) {
      table.increments('id').primary()
      table.string('name')
      table.decimal('payload2g', 14, 2)
      table.decimal('payload3g', 14, 2)
      table.decimal('payload4g', 14, 2)
      table
        .integer('id_region')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('SUM_TOTAL_ERLANG_MONTH_TO_DAY', function(table) {
      table.increments('id').primary()
      table.integer('desde')
      table.integer('hasta')
      table.boolean('mes_actual')
      table.decimal('erlang2g', 14, 2)
      table.decimal('erlang3g', 14, 2)
      table
        .integer('id_region')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('SUM_TOTAL_PAYLOAD_MONTH_TO_DAY', function(table) {
      table.increments('id').primary()
      table.integer('desde')
      table.integer('hasta')
      table.boolean('mes_actual')
      table.decimal('payload2g', 14, 2)
      table.decimal('payload3g', 14, 2)
      table.decimal('payload4g', 14, 2)
      table
        .integer('id_region')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('ERLANG2G_UNTIL_30_DAYS_BY_HOUR', function(table) {
      table.increments('ID').primary()
      table.integer('FECHA')
      table.integer('HORA')
      table.decimal('ERLANG2G', 14, 2)
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('ERLANG3G_UNTIL_30_DAYS_BY_HOUR', function(table) {
      table.increments('ID').primary()
      table.integer('FECHA')
      table.integer('HORA')
      table.decimal('ERLANG3G', 14, 2)
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('PAYLOAD2G_UNTIL_30_DAYS_BY_HOUR', function(table) {
      table.increments('ID').primary()
      table.integer('FECHA')
      table.integer('HORA')
      table.decimal('PAYLOAD2G', 14, 2)
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('PAYLOAD3G_UNTIL_30_DAYS_BY_HOUR', function(table) {
      table.increments('ID').primary()
      table.integer('FECHA')
      table.integer('HORA')
      table.decimal('PAYLOAD3G', 14, 2)
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('PAYLOAD4G_UNTIL_30_DAYS_BY_HOUR', function(table) {
      table.increments('ID').primary()
      table.integer('FECHA')
      table.integer('HORA')
      table.decimal('PAYLOAD4G', 14, 2)
      table
        .integer('ID_REGION')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('ERLANG_LATEST_12_MONTH', function(table) {
      table.increments('id').primary()
      table.integer('year')
      table.integer('month')
      table.decimal('erlang2g', 14, 2)
      table.decimal('erlang3g', 14, 2)
      table
        .integer('id_region')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('PAYLOAD_LATEST_12_MONTH', function(table) {
      table.increments('id').primary()
      table.integer('year')
      table.integer('month')
      table.decimal('payload2g', 14, 2)
      table.decimal('payload3g', 14, 2)
      table.decimal('payload4g', 14, 2)
      table
        .integer('id_region')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('ALERTS', function(table) {
      table.bigInteger('id').primary()
      table.string('element_name')
      table.string('title')
      table.string('body')
      table.integer('start_date')
      table.integer('start_hour')
      table.integer('end_date')
      table.integer('end_hour')
      table.string('kpi')
      table.decimal('kpiValue', 14, 2)
      table.integer('type')
      table.boolean('chartView')
      table
        .integer('id_service')
        .references('ID')
        .inTable('SERVICE')
      table
        .integer('id_region')
        .references('ID')
        .inTable('REGION')
    }),

    knex.schema.createTable('ALERTS_AND_USERS', function(table) {
      table.increments('id').primary()
      table
        .string('id_user')
        .references('ID')
        .inTable('USER')
      table
        .bigInteger('id_alert')
        .references('id')
        .inTable('ALERTS')
      table.boolean('read_state')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('TECHNOLOGY'),
    knex.schema.dropTable('SERVICE'),
    knex.schema.dropTable('KPI'),
    knex.schema.dropTable('REGION'),
    knex.schema.dropTable('STATION'),
    knex.schema.dropTable('SECTOR'),
    knex.schema.dropTable('USER'),
    knex.schema.dropTable('SUBREGION'),
    knex.schema.dropTable('CLUST'),
    knex.schema.dropTable('ESTADO'),
    knex.schema.dropTable('MERCADO'),
    knex.schema.dropTable('TOP_STATIONS_ERLANG'),
    knex.schema.dropTable('TOP_STATIONS_PAYLOAD'),
    knex.schema.dropTable('SUM_TOTAL_ERLANG_MONTH_TO_DAY'),
    knex.schema.dropTable('SUM_TOTAL_PAYLOAD_MONTH_TO_DAY'),
    knex.schema.dropTable('ERLANG2G_UNTIL_30_DAYS_BY_HOUR'),
    knex.schema.dropTable('ERLANG3G_UNTIL_30_DAYS_BY_HOUR'),
    knex.schema.dropTable('PAYLOAD2G_UNTIL_30_DAYS_BY_HOUR'),
    knex.schema.dropTable('PAYLOAD3G_UNTIL_30_DAYS_BY_HOUR'),
    knex.schema.dropTable('PAYLOAD4G_UNTIL_30_DAYS_BY_HOUR'),
    knex.schema.dropTable('ERLANG_LATEST_12_MONTH'),
    knex.schema.dropTable('PAYLOAD_LATEST_12_MONTH'),
    knex.schema.dropTable('ALERTS'),
    knex.schema.dropTable('ALERTS_AND_USERS'),
  ])
}
