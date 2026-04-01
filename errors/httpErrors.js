import BaseError from "./BaseError.js";

// 400 - Bad Request
export class BadRequestError extends BaseError {
  constructor(message = "Bad Request") {
    super(400, message, "BAD_REQUEST");
  }
}

// 401 - Unauthorized
export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized") {
    super(401, message, "UNAUTHORIZED");
  }
}

// 403 - Forbidden
export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden") {
    super(403, message, "FORBIDDEN");
  }
}

// 404 - Not Found
export class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(404, message, "NOT_FOUND");
  }
}

// 422 - Unprocessable Entity (validation errors)
export class UnprocessableEntityError extends BaseError {
  constructor(message = "Validation failed", details = null) {
    super(422, message, "VALIDATION_ERROR");
    this.details = details;
  }
}

// 500 - Internal Server Error
export class InternalServerError extends BaseError {
  constructor(message = "Internal Server Error") {
    super(500, message, "INTERNAL_ERROR");
  }
}
