const express = require('express');
const RoomController = require('../controllers/RommController');

const routes = express.Router();

routes.get('/', RoomController.index);
routes.get('/:id', RoomController.show);
routes.post('/', RoomController.store);
routes.delete('/:id', RoomController.destroy);
routes.put('/:id', RoomController.update);

module.exports = routes;
