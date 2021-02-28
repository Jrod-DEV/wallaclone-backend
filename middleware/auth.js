const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Auth for header
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const err = new Error('No autenticado, no hay JWT');
    err.statusCode = 401;
    throw err;
  }

  // Obtener el token y verificarlo
  const token = authHeader.split(' ')[1];
  let compareToken;
  try {
    if (token) {
      compareToken = jwt.verify(token, process.env.KEY_SECRET);

      req.userId = compareToken.id;
      next();
    }
  } catch (err) {
    res.json({ msg: 'El Token no es válido' });
    next();
  }
};
