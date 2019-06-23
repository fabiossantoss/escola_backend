/* eslint-disable class-methods-use-this */
const User = require('../models/user');
require('../models/files');

class AuthController {
  async signup(req, res, next) {
    try {
      const { email } = req.body;
      if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'usuário já existe' });
      }
      const user = await User.create(req.body);
      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (error) {
      return next(error);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).populate('file');

      if (!user) {
        return res.status(400).json({ error: 'Usuário não existe' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'senha inválida' });
      }

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new AuthController();
