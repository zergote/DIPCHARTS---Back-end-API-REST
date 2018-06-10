module.exports = {
  // Configuraciones del desarrollo
  development: {
    client: "postgres",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "test",
      password: "test",
      database: "test_db"
    }
  },

  dbPerformance: {
    client: "oracledb",
    connection: {
      host: "10.192.7.111",
      port: "1521",
      user: "USUARIOOC",
      password: "CONTRASEÑAOC",
      database: "BD"
    }
  },

  production: {
    client: "pg",
    version: "9.6",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "USUARIOPG",
      password: "CONTRASEÑAPG",
      database: "BD"
    }
  }
};
