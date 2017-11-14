const paginate = (page, limit, result) => [{
  page: parseInt(page, 10),
  pageCount: Math.ceil(result.count / limit),
  pageSize: result.rows.length,
  totalCount: result.count },
result.rows
];

const validatePaginate = (req) => {
  const page = Number.isInteger(parseInt(req.query.page, 10))
  && req.query.page > 0 ? req.query.page : 1;
  const limit = Number.isInteger(parseInt(req.query.limit, 10))
  && req.query.limit > 0 ? req.query.limit : 5;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export { paginate, validatePaginate };
