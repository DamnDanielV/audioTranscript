const { Router } = require("express")
const { processFile } = require("../controllers/trancriptionController")


const router = Router()

router.post('/upload', processFile)

module.exports = router