/* eslint-disable class-methods-use-this */
const User = require('../models/user');

class UserController {
  async index(req, res, next) {
    try {
      const users = await User.find().populate('file');

      return res.json(users);
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {
    try {
      const user = await User.findById(req.params.id).populate(['file', 'peoples']);

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      await User.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email }).populate('file');
      if (!user) {
        return res.status(500).json({ error: 'Usuário inválido' });
      }

      if (user.id !== req.userId) {
        // usuário não é o mesmo autorizado pela rota
        return res.status(500).json({ error: 'Usuário inválido' });
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      if (req.body.name) {
        user.name = req.body.name;
      }

      await user.save();

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UserController();
