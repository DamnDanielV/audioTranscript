const express = require("express")
const fileUpload = require('express-fileupload');
const { logMessage, logError } = require("./middlewares/logger");
require('dotenv').config()

module.exports = class Server {
    constructor () {
    this.app = express()
    this.app.use(fileUpload())
    this.app.use(express.json())
    this.middlewares()
    this.routes()
    this.errorsMiddlewares()
    }

    routes() {
        this.app.use('/', require('./routes/transcription'))
    }
    middlewares() {
        this.app.use(logMessage)
    }
    errorsMiddlewares() {
        this.app.use(logError)
    }
    listen() {
        this.app.listen(8000, () => {
            console.log("Escuchando en el puerto 8000");
        })
    }
}