import models from '../models';
import userSeeder from '../seeders/userSeeder';
import recipeSeeder from '../seeders/recipeSeeder';

import { signin, server, expect } from '../utils/testSetup';

const authenticationToken = {};

describe('Recipe Endpoints', () => {
/**
 *
 * @description Hook for cleaning up the test database
 * before any test block have been run
 *
 * @return {undefined}
 */
  before((done) => {
    models.Recipe.destroy({ where: {} })
      .then(() => {
        const { validSignupDetails1, validSignupDetails2 } = userSeeder;
        signin(validSignupDetails1, done, (token) => {
          authenticationToken.authUser1 = token;
          signin(validSignupDetails2, done, (token2) => {
            authenticationToken.authUser2 = token2;
            done();
          });
        });
      })
      .catch((error) => {
        done(error);
      });
  });

  describe('Create recipe endpoint', () => {
    it('should create a new recipe and return a success message with ' +
    'status 201 if user is authenticated and valid recipe details are provided',
    (done) => {
      const { kiwiRecipe } = recipeSeeder.validRecipes;
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(kiwiRecipe)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Successfully created new recipe');
          if (err) return done(err);
          done();
        });
    });

    it('should create a new recipe and return a success message with ' +
    'status 201 if user is authenticated and valid recipe details are provided',
    (done) => {
      const { coleSlawSaladRecipe } = recipeSeeder.validRecipes;
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser2)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(coleSlawSaladRecipe)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Successfully created new recipe');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if user is authenticated ' +
    'and an empty form is submitted when creating a recipe',
    (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message)
            .to
            .deep
            .equal({
              recipeName: 'Please enter a recipe name',
              ingredients: 'Ingredients field cannot be empty',
              instructions: 'Instructions field cannot be empty'
            });
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if user is authenticated ' +
    'and form is submitted with no recipe name',
    (done) => {
      const { noRecipeName } = recipeSeeder.invalidRecipes;
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noRecipeName)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message.recipeName)
            .to
            .equal('Please enter a recipe name');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if user is authenticated ' +
    'and form is submitted with no ingredients',
    (done) => {
      const { noRecipeIngredients } = recipeSeeder.invalidRecipes;
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noRecipeIngredients)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message.ingredients)
            .to
            .equal('Ingredients field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if user is authenticated ' +
    'and form is submitted with no instructions',
    (done) => {
      const { noRecipeInstructions } = recipeSeeder.invalidRecipes;
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noRecipeInstructions)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message.instructions)
            .to
            .equal('Instructions field cannot be empty');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Update recipe endpoint', () => {
    it('should update recipe details of recipe created by the ' +
    'authenticated user only and return a success nessage with status 200',
    (done) => {
      const { recipeUpdateDetails } = recipeSeeder.validRecipes;
      server
        .put('/api/v1/recipes/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(recipeUpdateDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Recipe successfully updated');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 404 if recipe to be modified ' +
    'does not exist',
    (done) => {
      const { recipeUpdateDetails } = recipeSeeder.validRecipes;
      server
        .put('/api/v1/recipes/20')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(recipeUpdateDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe not found');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 403 if recipe to be modified ' +
    'does not belong to the user',
    (done) => {
      const { recipeUpdateDetails } = recipeSeeder.validRecipes;
      server
        .put('/api/v1/recipes/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser2)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(recipeUpdateDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message)
            .to
            .equal('Your request is understood but not permitted');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Search recipes endpoint', () => {
    it('should respond with fail message and status 404 if no recipes matches' +
    ' search term',
    (done) => {
      server
        .get('/api/v1/recipes')
        .query({ category: 'jargons' })
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser2)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('No recipe matches your search');
          if (err) return done(err);
          done();
        });
    });

    describe('Search by category', () => {
      it('should respond with maximum of eight recipes that matches category ' +
      'search term',
      (done) => {
        server
          .get('/api/v1/recipes')
          .query({ category: 'smooth' })
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser2)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipes[0].recipeName)
              .to
              .equal('Kiwi Smoothie');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Search by ingredients', () => {
      it('should respond with maximum of eight recipes that contain ' +
      'ingredients provided in search term',
      (done) => {
        server
          .get('/api/v1/recipes')
          .query({ category: 'smooth' })
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser2)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipes[0].recipeName)
              .to
              .equal('Kiwi Smoothie');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Search by recipe name', () => {
      it('should respond with maximum of eight recipes that matches ' +
      ' search term',
      (done) => {
        server
          .get('/api/v1/recipes')
          .query({ name: 'kiwi' })
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser2)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipes[0].recipeName)
              .to
              .equal('Kiwi Smoothie');
            if (err) return done(err);
            done();
          });
      });
    });
  });

  describe('Delete recipe post', () => {
    it('should throw error message with status 403 if recipe to be deleted ' +
    'does not belong to user  ',
    (done) => {
      server
        .delete('/api/v1/recipes/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser2)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message)
            .to
            .equal('Your request is understood but not permitted');
          if (err) return done(err);
          done();
        });
    });

    it('should delete a recipe created by authenticated user only and ' +
    'respond with a success message and status 200',
    (done) => {
      server
        .delete('/api/v1/recipes/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Recipe successfully deleted');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Recipe details endpoint', () => {
    it('should increment the view count of recipe by one if viewed by other ' +
    'users and not by the user who created the recipe',
    (done) => {
      server
        .get('/api/v1/recipes/2')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.recipe.views).to.equal(1);
          if (err) return done(err);
          done();
        });
    });

    it('should not increment the view count of recipe if viewed by the ' +
    'user who created the recipe',
    (done) => {
      server
        .get('/api/v1/recipes/2')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser2)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.recipe.views).to.equal(1);
          if (err) return done(err);
          done();
        });
    });

    it('should respond with details of recipe for authenticated users only ',
      (done) => {
        server
          .get('/api/v1/recipes/2')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser2)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipe.recipeName).to.equal('Coleslaw Salad');
            expect(res.body.recipe.ingredients)
              .to
              .equal('Lettuce, Cabbage, Spinach');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('View Top Recipes', () => {
    it('should return maximum of five recipes with highest upvote count ' +
    'in descending order',
    (done) => {
      server
        .get('/api/v1/recipes')
        .query({ sort: 'upvote', order: 'desc' })
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser2)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.recipes[0].recipeName).to.equal('Coleslaw Salad');
          if (err) return done(err);
          done();
        });
    });
  });
});
