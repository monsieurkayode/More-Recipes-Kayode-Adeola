import { expect, assert } from '../../utils/testSetup';

import recipeSeeder from '../../seeders/recipeSeeder';

import {
  paginate,
  validatePagination,
  paginateReviews
} from '../../helpers/paginate';

const { coleSlawRecipe, coleSlawSaladRecipe } = recipeSeeder.validRecipes;

const page = 1,
  limit = 1,
  status = 'success',
  message = 'Showing 2 of 2 recipes found',
  result = {
    rows: [
      coleSlawRecipe,
      coleSlawSaladRecipe
    ],
    count: 2
  },
  req = {
    query: {
      page: 1,
      limit: 1
    }
  };

describe('Pagination helper functions', () => {
  describe('paginate', () => {
    it('should return a response object when passed valid arguments', () => {
      assert.isObject(paginate(page, limit, status, message, result));
    });

    it('should return status', () => {
      expect(paginate(page, limit, status, message, result).status)
        .to
        .equal('success');
    });

    it('should return message', () => {
      expect(paginate(page, limit, status, message, result).message)
        .to
        .equal('Showing 2 of 2 recipes found');
    });

    it('should return a pagination object with page, pageCount, pageSize ' +
    'and totalCount of fetched records',
    () => {
      expect(paginate(page, limit, status, message, result).pagination)
        .to
        .deep
        .equal({
          page: 1,
          pageCount: 2,
          pageSize: 2,
          totalCount: 2
        });
    });

    it('should return a object with property recipes with associated values ' +
    'of recipe records fetched from the server ',
    () => {
      expect(paginate(page, limit, status, message, result).recipes)
        .to
        .deep
        .equal([
          coleSlawRecipe,
          coleSlawSaladRecipe
        ]);
    });
  });

  describe('paginateReviews', () => {
    it('should return a response object when passed valid arguments', () => {
      assert.isObject(paginateReviews(page, limit, status, message, result));
    });

    it('should return status', () => {
      expect(paginateReviews(page, limit, status, message, result).status)
        .to
        .equal('success');
    });

    it('should return message', () => {
      expect(paginateReviews(page, limit, status, message, result).message)
        .to
        .equal('Showing 2 of 2 recipes found');
    });

    it('should return a pagination object with page, pageCount, pageSize ' +
    'and totalCount of fetched records',
    () => {
      expect(paginateReviews(page, limit, status, message, result).pagination)
        .to
        .deep
        .equal({
          page: 1,
          pageCount: 2,
          pageSize: 2,
          totalCount: 2
        });
    });

    it('should return a object with property comments with associated values ' +
    'of review records fetched from the server ',
    () => {
      expect(paginateReviews(page, limit, status, message, result).comments)
        .to
        .deep
        .equal([
          coleSlawRecipe,
          coleSlawSaladRecipe
        ]);
    });
  });

  describe('validatePagination', () => {
    it('should return a response object when passed request', () => {
      assert.isObject(validatePagination(req));
    });

    it('should return page number', () => {
      expect(validatePagination(req)).to.have.property('page');
      expect(validatePagination(req).page).to.equal(1);
    });

    it('should return limit', () => {
      expect(validatePagination(req)).to.have.property('limit');
      expect(validatePagination(req).limit).to.equal(1);
    });

    it('should return offset', () => {
      expect(validatePagination(req)).to.have.property('offset');
      expect(validatePagination(req).offset).to.equal(0);
    });

    it('should return default page of 1 if page is invalid or null', () => {
      expect(validatePagination({ query: { page: null, limit: 'ask' } }).page)
        .to.equal(1);
    });

    it('should return default limit of 8 if limit is invalid or null', () => {
      expect(validatePagination({ query: { page: null, limit: null } }).limit)
        .to.equal(8);
    });
  });
});
