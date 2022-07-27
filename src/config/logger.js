const winston = require('winston');
require('winston-mongodb');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
logger.add(new winston.transports.MongoDB({
    level: 'info',
    db: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.lujnw.mongodb.net/?retryWrites=true&w=majority`,
    options:{
        useUnifiedTopology: true,
    },
    storeHost: true,

}));

module.exports = logger;