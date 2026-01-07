import crypto from "crypto";

const requestIdMiddleware = (req, res, next) => {
    req.requestId = crypto.randomUUID();
    next();
};

export default requestIdMiddleware;
