const paginate = (page, limit, result) => [{
  page: parseInt(page, 10),
  pageCount: Math.ceil(result.count / limit),
  pageSize: parseInt(limit, 10),
  totalCount: result.count },
result.rows
];

export default paginate;
