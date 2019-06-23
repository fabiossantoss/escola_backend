require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const configdb = require('./config/app');

const app = express();

/* Conexão com o banco de dados */
mongoose.connect(configdb.database_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

/* Utilizar json nas requisições */
app.use(express.json());

/* Utilizar envio de arquivos nas requisições */
app.use(express.urlencoded());

/* Rotas da aplicação */
app.use('/escola/api/v1', require('./routes'));

/* Middleware de erros */
app.use((err, req, res, next) => res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.listen(process.env.PORT || '3000');
