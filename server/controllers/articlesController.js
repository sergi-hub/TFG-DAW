const connection = require('../database/config');

exports.saveArticle = (req, res) => {
    const { type, code, fk_user } = req.body;

    console.log(req.body);
 
    const sql = 'INSERT INTO articles (type, code, fk_user) values (?, ?, ?)';
    connection.query(sql, [type, code, fk_user], (error, results, fields) => {
        if (error) {
            console.error('Error al guardar el artículo: ' + error.stack);
            res.status(500).json({ message: 'Error al guardar el artículo' });
            return;
        }
        res.status(200).json({ message: 'Artículo guardado correctamente' + req.body });
    });
}

exports.getUserArticles = (req, res) => {
    const fk_user = req.params.fk_user;

    connection.query(`SELECT DISTINCT a.type, a.code FROM articles a, users u WHERE a.fk_user=${fk_user}`, (error, results, fields) => {
        if (error) {
            console.error('Error al obtener los artículos guardados: ' + error.stack);
            return;
        }
        res.json(results);
    });
}

exports.deleteUserArticle = (req, res) => {
    const fk_user = req.params.fk_user;
    const code = req.params.code;

    connection.query(`DELETE FROM articles WHERE fk_user = ${fk_user} AND code = ${code}`, (error, results, fields) => {
        if (error) {
            console.error('Error al eliminar el artículo: ' + error.stack);
            return;
        }
        res.json(results);
    });
}