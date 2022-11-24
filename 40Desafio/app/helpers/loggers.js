// EJ LOGGERS
const log4js = require("log4js");

log4js.configure({
  appenders: {
    consola: { type: "console" },
    all: { type: "file", filename: "warn.log" },
  },
  onlyAll: { type: "logLevelFilter", appenders: "all" },

  categories: {
    default: { appenders: ["consola", "all"], level: "trace" },
  },
});

const logger = log4js.getLogger("default");

module.exports = logger;