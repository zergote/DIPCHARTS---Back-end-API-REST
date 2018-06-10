const pm2 = require("pm2");

const instances = process.env.API_CONCURRENCY || -1;
const maxMemory = process.env.API_MEMORY || 512;

pm2.connect(() => {
  pm2.start(
    [
      {
        name: "server-statics",
        script: "./index.js",
        instances: instances,
        exec_mode: "cluster",
        wacht: true,
        max_memory_restart: `${maxMemory}M`,
        env: {
          NODE_ENV: "production",
          NODE_PATH: ".",
          SECRETSTRING: "nodeauthsecret",
          PORT: 3000
        }
      }
    ],
    err => {
      if (err) {
        return console.error(
          "Error while launching applications",
          err.stack || err
        );
      }

      console.log("PM2 and application has been succesfully started");

      pm2.launchBus((err, bus) => {
        console.log("[PM2] Log streaming started");

        bus.on("log:out", packet => {
          console.log("[App:%s] %s", packet.process.name, packet.data);
        });
        /*
        bus.on('log:err', packet => {
          console.error('[App:%s][Err] %s', packet.process.name, packet.data)
        })
        */
      });
    }
  );
});
