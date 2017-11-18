/**
 * @description A helper function that returns
 * the pagination object
 *
 * @param {integer} page
 * @param {integer} limit
 * @param {object} result
 *
 * @returns {object} paginate
 */
const paginate = (page, limit, result) => [{
  page: parseInt(page, 10),
  pageCount: Math.ceil(result.count / limit),
  pageSize: result.rows.length,
  totalCount: result.count },
result.rows
];

/**
 * @description A helper function that validates
 * inputs for page and limit, defaults to set options
 * if validation fails
 *
 * @param {object} req
 *
 * @returns {object} page limit offset
 */
const validatePaginate = (req) => {
  const page = Number.isInteger(parseInt(req.query.page, 10))
  && req.query.page > 0 ? req.query.page : 1;
  const limit = Number.isInteger(parseInt(req.query.limit, 10))
  && req.query.limit > 0 ? req.query.limit : 5;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export { paginate, validatePaginate };
