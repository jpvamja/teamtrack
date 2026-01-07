/**
 * Wrap async route handlers to forward errors to Express error middleware
 * Eliminates repetitive try/catch blocks in controllers
 */
const asyncHandler = (handler) => {
  if (typeof handler !== "function") {
    throw new TypeError(
      "asyncHandler expects a function"
    );
  }

  return function asyncWrappedHandler(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export default asyncHandler;
