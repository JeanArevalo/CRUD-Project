const express = require('express');
const { envs } = require('../config/env');
const bodyParser = require('body-parser');
const clubRoutes = require('../routes/club.routes');
const mongoose = require('mongoose');

const startServer = (puerto) => {
    const port = puerto;

    // Inicializar Express
    const app = express()

    // Middleware para Parsear el body
    app.use(bodyParser.json())

    // Conectar la BD
    mongoose.connect(process.env.MONGO_URL, { dbname: process.env.MONGO_DB_NAME })
    const db = mongoose.connection;

    // Middleware para utilizar las rutas de Clubs
    app.use('/clubs', clubRoutes)

    // Poner a escuchar en el puerto determinado
    app.listen(port, () => {
        console.log(`Servidor iniciado en el puerto ${port}.`);
    });
}

module.exports = {
    startServer,
}
