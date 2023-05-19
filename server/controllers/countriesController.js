const connection = require('../database/config');

// Definimos que hará obtenerUsuarios, en este caso, simplemente listará los usuarios que hay registrados
exports.getCountries = (req, res) => {
    //const user = new user();
    connection.query('SELECT * FROM countries', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener los usuarios: ' + error.stack);
            return;
        }
        res.json(results);
    });
}

exports.getUserCountry = (req, res) => {
    const countryId = req.params.countryId;
    const nick = req.params.nick;

    console.log(countryId);
    console.log(nick);

    connection.query(`SELECT c.countryName FROM countries c, users u WHERE c.id=${countryId} AND u.nick='${nick}'`, (error, results, fields) => {
        if (error) {
            console.error('Error al obtener la nacionalidad: ' + error.stack);
            return;
        }
        res.json(results);
    });
}