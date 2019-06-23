const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');
const FileController = require('../controllers/FileController');

const routes = express.Router();

routes.post('/', multer(multerConfig).single('file'), FileController.store);
routes.delete('/:id', FileController.destroy);
routes.get('/', FileController.index);

module.exports = routes;
