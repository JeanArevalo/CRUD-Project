const express = require('express');
const path = require('path');

const startServer = (options) => {
    const { port, public_path = 'public' } = options

    // Inicializar Express
    const app = express()

    // Para poder usar middlewares
    app.use(express.static(public_path)); // Contenido estático que ponemos dispnible.

    //  El '*' significa cualquier pedido de ruta sobre nuestro html
    app.get('*', (req, res) => {
        const indexPath = path.join(_dirname + `../../../${public_path}/index.html`); // Junta el path y lo normaliza
        res.sendFile(indexPath);
    });

    // Poner a escuchar en el puerto determinado
    app.listen(port, () => {
        console.log(`Escuchando en el puerto ${port}.`);
    });
}

module.exports = {
    startServer,
}
