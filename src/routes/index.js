const express = require('express');
// const Sentry = require('@sentry/node');

// Sentry.init({ dsn: 'https://d562f6a5db3e42768966d1f51a0ff49d@sentry.io/1473909' });

const authMiddleware = require('../middlewares/auth');

const routes = express.Router();

// routes.use(Sentry.Handlers.requestHandler());

routes.get('/', (req, res) => res.send('server on in port 3000'));
routes.use('/auth', require('./auth'));

routes.use(authMiddleware);

routes.use('/users', require('./user'));
routes.use('/files', require('./files'));
routes.use('/rooms', require('./room'));
routes.use('/turnos', require('./turno'));

// routes.use(Sentry.Handlers.errorHandler());

module.exports = routes;
