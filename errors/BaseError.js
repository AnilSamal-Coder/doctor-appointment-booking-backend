class BaseError extends Error {
  constructor(statusCode, message, code = "ERROR") {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;