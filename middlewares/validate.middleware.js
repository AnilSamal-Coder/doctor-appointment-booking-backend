export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body || {}, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = {};

      error.details.forEach((err) => {
        const field = err.path[0];
        errors[field] = err.message;
      });

      return res.status(400).json({
        success: false,
        errors,
        message: "Validation failed",
      });
    }

    req.body = value;
    next();
  };
};
