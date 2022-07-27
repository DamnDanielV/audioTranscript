const logger = require('../config/logger');

const logError = (err, req, res, next) => {
    const { output } = err
    logger.log('error', `[error] - status: ${output.payload.statusCode} message: ${err.original}`)
    next(err)
}
const logMessage = ( req, res, next) => {
    logger.log('info', `url: ${req.url} method: ${req.method} body: ${JSON.stringify(req.body) } header: ${JSON.stringify(req.headers)}`)
    next()
}

module.exports = {
    logError,
    logMessage
}