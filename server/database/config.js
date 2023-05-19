const mysql = require('mysql');

// Definimos la configuración para conectarnos a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'marvelWiki'
})

// Nos conectamos a la base de datos y escribimos por consola si ha ido bien la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});


module.exports = connection;