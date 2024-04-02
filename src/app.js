const { envs } = require('./config/env');
const { startServer } = require('./server/server');

const main = () => {
    console.log("Inicializando Proyecto Web Server...");
    startServer({
        port: process.env.PORT,
        public_path: process.env.PUBLIC_PATH,
    })
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
    const arreglo = [4,8,1,2,6,9,44,0]
    const ordenado = ordenar(arreglo)
    console.log('Arreglo Inicial:');
    console.log(arreglo);
    console.log(`Arreglo Ordenado:`);
    console.log(ordenado);
})()
