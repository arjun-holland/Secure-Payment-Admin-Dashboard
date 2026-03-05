module.exports = function idempotencyMiddleware(req, res, next) {
  const idempotencyKey = req.header("Idempotency-Key");

  if (!idempotencyKey) {
    return res.status(400).json({
      message: "Missing Idempotency-Key header"
    });
  }

  // Attach to request for downstream usage
  req.idempotencyKey = idempotencyKey;
  next();
};
