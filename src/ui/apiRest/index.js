export default class Server {
  constructor({ config, expressApp }) {
    this.config = config;
    this.expressApp = expressApp;
  }

  start() {
    return new Promise(resolve => {
      const server = this.expressApp.listen(this.config.PORT, () => {
        console.log(
          "API Server started and listening on port " + this.config.PORT
        );
        //Tiempo maximo para esperar solicitudes 10 minutos
        server.setTimeout(1200000);
        resolve();
      });
    });
  }
}
