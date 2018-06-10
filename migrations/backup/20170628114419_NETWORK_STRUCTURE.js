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
  ])
}
