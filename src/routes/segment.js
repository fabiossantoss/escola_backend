const express = require('express');
const SegmentController = require('../controllers/SegmentController');

const routes = express.Router();

routes.get('/', SegmentController.index);
routes.get('/:id', SegmentController.show);
routes.post('/', SegmentController.store);
routes.delete('/:id', SegmentController.destroy);
routes.put('/:id', SegmentController.update);

module.exports = routes;
