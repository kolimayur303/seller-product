module.exports = (req, res, next) => {
  try {
    if (req.body.brands && typeof req.body.brands === 'string') {
      req.body.brands = JSON.parse(req.body.brands);
    }
    next();
  } catch (e) {
    return res.status(400).json({ status:false, message:"Invalid JSON format in 'brands'" });
  }
};
