require("babel-register")({
	//stage: 0 // for es7 features
	presets: ["stage-0"]
});

const container = require("src/container");

const server = container.resolve("server");

server.start();
