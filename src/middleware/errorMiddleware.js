const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.array && typeof err.array === 'function') {
    return res.status(422).json({
      status:false,
      message:'Validation failed',
      errors: err.array().map(e => ({ field:e.param, message:e.msg }))
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return res.status(409).json({ status:false, message:`${field} already exists` });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ status:false, message:'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ status:false, message:'Token expired' });
  }

  res.status(err.statusCode || 500).json({ status:false, message: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;
