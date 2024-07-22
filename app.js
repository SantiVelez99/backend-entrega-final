const express = require('express')
const app = express()
const cors = require('cors')
const api_routes = require('./routes/index.routes')


// usar carpeta public
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", api_routes)
module.exports = app