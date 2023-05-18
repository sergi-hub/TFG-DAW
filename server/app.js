// Se importa el módulo de express y se crea una instancia
// También se importan todos los módulos que son necesarios
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

/* Configuración de midleware */
// Se prepara la configuración básica para analizar los cuerpos de las solicitudes entrantes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

// Configuramos la ruta raiz, la cual enviará un mensaje si funciona
app.get('/', (req, res) => {
    res.send('¡Server On!');
})

// Definimos la ruta base con el nombre api, diciendole que las rutas están en routes, por lo que se accedera a las rutas con el prefijo /api
app.use('/api', routes);

// Configuramos el servidor para que escuche en el puerto 3000 y mande un mensaje en el caso de que funcione
const port = 3000;
app.listen(port, () =>{
    console.log(`Server Express listening at port: ${port}`);
})