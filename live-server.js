const liveServer = require("live-server");
const fs = require("fs");

// https://www.npmjs.com/package/live-server

const params = {
    port: 8181,
    host: "192.168.1.109",
    root: "./",
    watch: ["./index.html", "./style.css", "./script.js"], // lub katalogi
    open: false,
    file: "index.html",
    https: {
        cert: fs.readFileSync(`${__dirname}/192.168.1.109.pem`),
        key: fs.readFileSync(`${__dirname}/192.168.1.109-key.pem`),
    },
    cors: true,
    injectCss: false,
    logLevel: 2,
};

liveServer.start(params);

