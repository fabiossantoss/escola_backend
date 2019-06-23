/* eslint-disable class-methods-use-this */

const File = require('../models/files');
// const People = require('../models/people');
const User = require('../models/user');

class FileController {
  async index(req, res, next) {
    try {
      const files = await File.find();

      return res.json(files);
    } catch (err) {
      return next(err);
    }
  }

  async store(req, res) {
    try {
      if (!req.body.type) {
        return res.send(400).json({ error: 'Tipo de arquivo não informado para carregamento.' });
      }

      const {
        originalname: filename, size, key, location: url = '',
      } = req.file;

      const file = await File.create({
        filename,
        size,
        key,
        url,
      });

      if (file) {
        if (req.body.type === '1') {
          const user = await User.findById(req.body.id);

          user.file = file.id;
          await user.save();
        } else if (req.body.type === '2') {
          // const people = await People.findById(req.body.id);
          // people.files.push(file);
          // await people.save();
        }
      } else {
        return res.send(500).json({ error: 'Não foi possível carregar o arquivo.' });
      }

      return res.json(file);
    } catch (err) {
      return res.json(err);
    }
  }

  async destroy(req, res, next) {
    try {
      const file = await File.findById(req.params.id);
      await file.remove();
      return res.send();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new FileController();
