const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DB, {
            dbName: "Comision11i",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Base de Datos Conectada")
    } catch (error) {
        console.log(error)
        process.exit(1) //detiene la ejecucion de la app.
    }
}

module.exports = conectarDB;