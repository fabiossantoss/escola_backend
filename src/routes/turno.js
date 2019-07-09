const express = require('express');
const TurnoController = require('../controllers/TurnoController');

const routes = express.Router();

routes.get('/', TurnoController.index);
routes.get('/:id', TurnoController.show);
routes.post('/', TurnoController.store);
routes.delete('/:id', TurnoController.destroy);
routes.put('/:id', TurnoController.update);

module.exports = routes;
