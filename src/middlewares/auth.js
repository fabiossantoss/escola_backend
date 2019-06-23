const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { secret } = require('../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const parts = authHeader.split(' ');

  if (!parts.lenght === 2) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  const [scheme, token] = parts;

  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Token inválido' });
  }

  try {
    jwt.verify(token, secret);

    const decoded = await promisify(jwt.verify)(token, secret);

    req.userId = decoded.id;
    req.iat = decoded.iat;
    req.exp = decoded.exp;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
