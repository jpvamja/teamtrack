/**
 * Pagination defaults
 */
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

/**
 * Extract and normalize pagination values from request query
 * Safe defaults + upper bounds for production APIs
 */
export const getPagination = (query = {}) => {
  const page = Number.parseInt(query.page, 10);
  const limit = Number.parseInt(query.limit, 10);

  const normalizedPage =
    Number.isNaN(page) || page < 1
      ? DEFAULT_PAGE
      : page;

  const normalizedLimit =
    Number.isNaN(limit) || limit < 1
      ? DEFAULT_LIMIT
      : Math.min(limit, MAX_LIMIT);

  const skip = (normalizedPage - 1) * normalizedLimit;

  return Object.freeze({
    page: normalizedPage,
    limit: normalizedLimit,
    skip,
    offset: skip, // alias for convenience
  });
};
