const express = require('express');
const AuthController = require('../controllers/AuthController');

const routes = express.Router();

routes.post('/signup', AuthController.signup);
routes.post('/signin', AuthController.signin);

module.exports = routes;
