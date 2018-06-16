/**
 * @description A helper function that returns
 * the pagination object
 *
 * @param {integer} page
 * @param {integer} limit
 * @param {string} status
 * @param {string} message
 * @param {object} result
 *
 * @returns {object} pagination recipes
 */
const paginate = (page, limit, status, message, result) =>
  ({
    status,
    message,
    pagination: {
      page: parseInt(page, 10),
      pageCount: Math.ceil(result.count / limit),
      pageSize: result.rows.length,
      totalCount: result.count
    },
    recipes: result.rows
  });

/**
 * @description A helper function that returns
 * the pagination object for reviews
 *
 * @param {integer} page
 * @param {integer} limit
 * @param {string} status
 * @param {string} message
 * @param {object} result
 *
 * @returns {object} pagination recipes
 */
const paginateReviews = (page, limit, status, message, result) =>
  ({
    status,
    message,
    pagination: {
      page: parseInt(page, 10),
      pageCount: Math.ceil(result.count / limit),
      pageSize: result.rows.length,
      totalCount: result.count
    },
    comments: result.rows
  });

/**
 * @description A helper function that validates
 * inputs for page and limit, defaults to set options
 * if validation fails
 *
 * @param {object} req
 *
 * @returns {object} page limit offset
 */
const validatePagination = (req) => {
  const page = Number.isInteger(parseInt(req.query.page, 10))
  && req.query.page > 0 ? req.query.page : 1;
  const limit = Number.isInteger(parseInt(req.query.limit, 10))
  && req.query.limit > 0 ? req.query.limit : 8;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export { paginate, validatePagination, paginateReviews };
