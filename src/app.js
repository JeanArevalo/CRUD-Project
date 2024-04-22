const { envs } = require('./config/env');
const { startServer } = require('./server/server');

const main = () => {
    console.log("Inicializando Proyecto CRUD NodeJs...");
    startServer(Number(process.env.PORT) || 3000)
}

/**
 *  Función utilizada para ordenar un arreglo de n números.
 *  @author Jean Arevalo <jcad1996@gmail.com>
 *  @param {array} arreglo - Arreglo de números a ordenar.
 *  @returns {array} Arreglo de números ordenado.
 */
const ordenar = (arreglo) => {
    const arregloOrdenado = arreglo.sort();
    return arregloOrdenado;
}
// Función agnóstica porque no tiene nombre autonconvocada por el último ().
(async() => {
    main()
})()
