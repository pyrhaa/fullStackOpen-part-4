const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  logger.error(error.message);
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
    return next();
  }
  req.token = null;
  return next();
};

const userExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');

  const decodedToken = jwt.verify(
    authorization.substring(7),
    process.env.SECRET
  );
  const user = await User.findById(decodedToken.id);

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.user = user;
    return next();
  }
  req.user = null;
  return next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
