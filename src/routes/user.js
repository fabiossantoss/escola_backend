const express = require('express');
const UserController = require('../controllers/UserController');

const routes = express.Router();

routes.get('/', UserController.index);
routes.get('/:id', UserController.show);
routes.delete('/:id', UserController.destroy);
routes.put('/', UserController.update);

module.exports = routes;
