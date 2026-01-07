/**
 * Extract and normalize pagination values from request query
 * Safe defaults + upper bounds for production APIs
 */
export const getPagination = (query = {}) => {
    const page = Number.parseInt(query.page, 10);
    const limit = Number.parseInt(query.limit, 10);

    const normalizedPage = Number.isNaN(page) || page < 1 ? 1 : page;
    const normalizedLimit =
        Number.isNaN(limit) || limit < 1
            ? 10
            : Math.min(limit, 50);

    const skip = (normalizedPage - 1) * normalizedLimit;

    return {
        page: normalizedPage,
        limit: normalizedLimit,
        skip,
    };
};
