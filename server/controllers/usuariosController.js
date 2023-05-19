const connection = require('../database/config');
const user = require('../models/user');

// Definimos que hará obtenerUsuarios, en este caso, se consulta si existe un usuario con esas credenciales, ya que los usuarios tiene que ser únicos
exports.getUsers = (req, res) => {
    const nick = req.params.nick;
    const email = req.params.email;

    connection.query(`SELECT * FROM users WHERE nick='${nick}' or email='${email}'`, (error, results, fields) => {
        if (error) {
            console.error('Error al obtener los usuarios: ' + error.stack);
            return;
        }
        res.json(results);
    });
}

exports.getUser = (req, res) => {
    const email = req.params.email;
    const passwd = req.params.passwd;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
    const passwdPattern = /^[A-Za-z0-9_-]+$/;

    if(!emailPattern.test(email) || !passwdPattern.test(passwd)){
        res.status(400).json({ message: 'Error en los datos de entrada'});
    }else{
        connection.query(`SELECT id, name, nick, passwd, email, creation, fk_country FROM users WHERE email='${email}' and passwd='${passwd}'`, (error, results, fields) => {
            if (error) {
                console.error('Error al obtener los usuarios: ' + error.stack);
                return;
            }
            res.json(results);
        });
    }
   
}

// Definimos que hará getUserEmail, que recuperará un usuario con dicho email si existe
exports.getUserEmailPass = (req, res) => {
    const email = req.params.email;

    connection.query(`SELECT email, passwd FROM users WHERE email='${email}'`, (error, results, fields) => {
        if (error) {
            console.error('Error al obtener el email: ' + error.stack);
            return;
        }
        res.json(results);
    });
}


// Definimos que hará insertUsers, el cual se encarga de obtener los valores del nuevo usuario e añadirlo a la base de datos
exports.insertUsers = (req, res) => {
    const { name, nick, email, email2, nationality, passwd, terms } = req.body;

    const user1 = new user(name, nick, passwd, email, email2, nationality, terms);

    const prueba = user1.validate();
    if (prueba) {
        const sql = 'INSERT INTO users (name, nick, passwd, email, creation, fk_country) values (?, ?, ?, ?, NOW(), ?)';
        connection.query(sql, [name, nick, passwd, email, nationality], (error, results, fields) => {
            if (error) {
                console.error('Error al insertar el usuario: ' + error.stack);
                res.status(500).json({ message: 'Error al insertar el usuario' });
                return;
            }
            res.status(200).json({ message: 'Usuario insertado correctamente' + req.body });
        });
    }else{
        console.log('Lo sentimos, algo ha ido mal al insertar el usuario');
        console.log(prueba)
    }


}
