require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("\x1b[32m Conexion a DB exitosa")
        app.listen(process.env.SERVER_PORT, () => {
            console.log("\x1b[33m Conectado al puerto 3000 \x1b[37m")
        })
    })
    .catch(error => console.log(error))