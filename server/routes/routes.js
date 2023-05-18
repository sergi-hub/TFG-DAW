const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const countriesController = require('../controllers/countriesController');
const articles = require('../controllers/articlesController');
const emailController = require('../controllers/emailController');

// Definimos las rutas que tendrá junto a su respectivo controlador
router.get('/users/:nick/:email', usuariosController.getUsers);

router.get('/user/:email/:passwd', usuariosController.getUser);

router.get('/user/:email', usuariosController.getUserEmailPass);

router.post('/users', usuariosController.insertUsers);

router.get('/countries', countriesController.getCountries);

router.get('/countries/:countryId/:nick', countriesController.getUserCountry);

router.post('/articles', articles.saveArticle);

router.get('/articles/:fk_user', articles.getUserArticles);

router.delete('/articles/:fk_user/:code', articles.deleteUserArticle);

router.post('/send-email', emailController.sendEmail);


module.exports = router;