import crypto from "crypto";

const REQUEST_ID_HEADER = "x-request-id";

/**
 * Request ID middleware
 * - Reuses incoming request ID if present
 * - Generates one if missing
 * - Exposes it to client and downstream middleware
 */
const requestIdMiddleware = (req, res, next) => {
  const incomingId =
    req.headers[REQUEST_ID_HEADER] ||
    req.headers[REQUEST_ID_HEADER.toLowerCase()];

  const requestId = incomingId || crypto.randomUUID();

  // Attach to request & response locals
  req.requestId = requestId;
  res.locals.requestId = requestId;

  // Expose to client
  res.setHeader(REQUEST_ID_HEADER, requestId);

  next();
};

export default requestIdMiddleware;
