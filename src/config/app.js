const path = require('path');

module.exports = {
  database_url:
    process.env.DATABASE_URL || 'mongodb+srv://fabio:Brasil20@cluster0-3fgok.mongodb.net/escola',
  contollers_path: path.resolve('controllers'),
};
