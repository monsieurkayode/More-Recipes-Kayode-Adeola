export default {
  userDetails: {
    username: 'spyrockaz',
    email: 'username@gmail.com',
    password: 'password',
    confirmPassword: 'password',
  },
  signupResponse: {
    status: 'success',
    message: 'Account successfully created',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJ1c2' +
    'VybmFtZSI6InNweXJvY2theiIsImVtYWlsIjoidXNlcm5hbWVAZ21haWwuY29tIn0sImlhd' +
    'CI6MTUxNzcyOTI0NCwiZXhwIjoxNTE3ODE1NjQ0LCJpc3MiOiJtb3JlX3JlY2lwZXMxNyIs' +
    'Imp0aSI6Im1vcmVfcmVjaXBlcyJ9.ptjfK0mXALlBHyj67EihX4f17tuONVIKm3T4nEhfrqg'
  },
  userCredentials: {
    username: 'spyrockaz',
    password: 'password',
  },
  signinResponse: {
    status: 'success',
    message: 'Token successfully generated',
    Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJ1c2V' +
    'ybmFtZSI6InNweXJvY2theiJ9LCJpYXQiOjE1MTc4MDQyMTIsImV4cCI6MTUxNzg5MDYxMiw' +
    'iaXNzIjoibW9yZV9yZWNpcGVzMTciLCJqdGkiOiJtb3JlX3JlY2lwZXMifQ.kQN5zHY0_BK7' +
    'cy0SKFJfqMUzyhrJR-a0WSSmCNDCg8E'
  },
  recipeDetails: {
    id: 1,
    recipeName: 'Chicken Soup',
    category: 'specials',
    ingredients: `**A list of ingredients for preparing Chicken soup**
                  * 1 (3 pound) whole chicken
                  * 4 carrots, halved
                  * 4 stalks celery, halved
                  * 1 large onion, halved
                  * water to cover
                  * salt and pepper to taste
                  * 1 teaspoon chicken bouillon granules (optional)`,
    instructions: `* Put the chicken, carrots, celery and onion in a large soup
                  pot and cover with cold water. Heat and simmer, uncovered,
                  until the chicken meat falls off of the bones
                  (skim off foam every so often).
                  * Take everything out of the pot. Strain the broth. 
                  Pick the meat off of the bones and chop the carrots, celery 
                  and onion. Season the broth with salt, pepper and chicken 
                  bouillon to taste, if desired. Return the chicken, carrots, 
                  celery and onion to the pot, stir together, and serve.`
  },
  createPostResponse: {
    status: 'success',
    message: 'Successfully created new recipe',
    id: 1,
    views: 0,
    upvote: 0,
    downvote: 0,
    recipeName: 'Chicken Soup',
    category: 'specials',
    ingredients: `**A list of ingredients for preparing Chicken soup**
                  * 1 (3 pound) whole chicken
                  * 4 carrots, halved
                  * 4 stalks celery, halved
                  * 1 large onion, halved
                  * water to cover
                  * salt and pepper to taste
                  * 1 teaspoon chicken bouillon granules (optional)`,
    instructions: `* Put the chicken, carrots, celery and onion in a large soup
                  pot and cover with cold water. Heat and simmer, uncovered,
                  until the chicken meat falls off of the bones
                  (skim off foam every so often).
                  * Take everything out of the pot. Strain the broth. 
                  Pick the meat off of the bones and chop the carrots, celery 
                  and onion. Season the broth with salt, pepper and chicken 
                  bouillon to taste, if desired. Return the chicken, carrots, 
                  celery and onion to the pot, stir together, and serve.`,
    image: null
  },
  editRecipeDetails: {
    id: 1,
    recipeName: 'Chicken Soup',
    category: 'specials',
    ingredients: `**A list of ingredients for preparing Chicken soup**
                  * 1 (3 pound) whole chicken
                  * 4 carrots, halved
                  * 4 stalks celery, halved
                  * 1 large onion, halved
                  * water to cover
                  * salt and pepper to taste
                  * 1 teaspoon chicken bouillon granules (optional)
                  * 1/2 teaspoon lemonade`,
    instructions: `* Put the chicken, carrots, celery and onion in a large soup
                  pot and cover with cold water. Heat and simmer, uncovered,
                  until the chicken meat falls off of the bones
                  (skim off foam every so often).
                  * Take everything out of the pot. Strain the broth. 
                  Pick the meat off of the bones and chop the carrots, celery 
                  and onion. Season the broth with salt, pepper and chicken 
                  bouillon to taste, if desired. Return the chicken, carrots, 
                  celery and onion to the pot, stir together, and serve.`,
    image: {
      file: 'empty',
      name: 'spice.jpg'
    }
  },
  editPostResponse: {
    status: 'success',
    message: 'Recipe successfully updated',
    id: 1,
    views: 0,
    upvote: 0,
    downvote: 0,
    recipeName: 'Chicken Soup',
    category: 'specials',
    ingredients: `**A list of ingredients for preparing Chicken soup**
                  * 1 (3 pound) whole chicken
                  * 4 carrots, halved
                  * 4 stalks celery, halved
                  * 1 large onion, halved
                  * water to cover
                  * salt and pepper to taste
                  * 1 teaspoon chicken bouillon granules (optional)
                  * 1/2 teaspoon lemonade`,
    instructions: `* Put the chicken, carrots, celery and onion in a large soup
                  pot and cover with cold water. Heat and simmer, uncovered,
                  until the chicken meat falls off of the bones
                  (skim off foam every so often).
                  * Take everything out of the pot. Strain the broth. 
                  Pick the meat off of the bones and chop the carrots, celery 
                  and onion. Season the broth with salt, pepper and chicken 
                  bouillon to taste, if desired. Return the chicken, carrots, 
                  celery and onion to the pot, stir together, and serve.`,
    image: null
  },
  fetchRecipesResponse: {
    status: 'success',
    message: 'Showing 1 of 1 recipes found',
    pagination: {
      page: 1,
      pageCount: 1,
      pageSize: 1,
      totalCount: 1
    },
    recipes: [
      {
        id: 1,
        views: 0,
        upvote: 0,
        downvote: 0,
        recipeName: 'Chicken Soup',
        category: 'specials',
        ingredients: `**A list of ingredients for preparing Chicken soup**
                  * 1 (3 pound) whole chicken
                  * 4 carrots, halved
                  * 4 stalks celery, halved
                  * 1 large onion, halved
                  * water to cover
                  * salt and pepper to taste
                  * 1 teaspoon chicken bouillon granules (optional)
                  * 1/2 teaspoon lemonade`,
        instructions: `* Put the chicken, carrots, celery and onion in a large
                  soup pot and cover with cold water. Heat and simmer, 
                  uncovered, until the chicken meat falls off of the bones
                  (skim off foam every so often).
                  * Take everything out of the pot. Strain the broth. 
                  Pick the meat off of the bones and chop the carrots, celery 
                  and onion. Season the broth with salt, pepper and chicken 
                  bouillon to taste, if desired. Return the chicken, carrots, 
                  celery and onion to the pot, stir together, and serve.`,
        image: 'spice.jpg',
        createdAt: '2018-02-05T07:00:47.980Z'
      }
    ]
  },
  fetchReviewsResponse: {
    status: 'success',
    message: 'Showing 3 of 3 comments',
    pagination: {
      page: 1,
      pageCount: 1,
      pageSize: 1,
      totalCount: 1
    },
    comments: [
      {
        id: 1,
        comment: 'Love this',
        createdAt: '2018-02-05T07:00:47.980Z',
        updatedAt: '2018-02-03T15:58:43.318Z',
        userId: 1,
        User: {
          username: 'username'
        }
      }
    ]
  },
  fetchSingleRecipeResponse: {
    status: 'success',
    message: 'Showing 1 of 1 recipes found',
    recipe: [
      {
        id: 1,
        views: 0,
        upvote: 0,
        downvote: 0,
        recipeName: 'Chicken Soup',
        category: 'specials',
        ingredients: `**A list of ingredients for preparing Chicken soup**
                  * 1 (3 pound) whole chicken
                  * 4 carrots, halved
                  * 4 stalks celery, halved
                  * 1 large onion, halved
                  * water to cover
                  * salt and pepper to taste
                  * 1 teaspoon chicken bouillon granules (optional)
                  * 1/2 teaspoon lemonade`,
        instructions: `* Put the chicken, carrots, celery and onion in a large
                  soup pot and cover with cold water. Heat and simmer, 
                  uncovered, until the chicken meat falls off of the bones
                  (skim off foam every so often).
                  * Take everything out of the pot. Strain the broth. 
                  Pick the meat off of the bones and chop the carrots, celery 
                  and onion. Season the broth with salt, pepper and chicken 
                  bouillon to taste, if desired. Return the chicken, carrots, 
                  celery and onion to the pot, stir together, and serve.`,
        image: 'spice.jpg',
        createdAt: '2018-02-05T07:00:47.980Z'
      }
    ]
  },
  fetchTopRecipesResponse: {
    status: 'success',
    message: 'Top recipes found',
    recipes: [
      {
        id: 1,
        views: 0,
        upvote: 0,
        downvote: 0,
        recipeName: 'Chicken Soup',
        category: 'specials',
        ingredients: `**A list of ingredients for preparing Chicken soup**
                  * 1 (3 pound) whole chicken
                  * 4 carrots, halved
                  * 4 stalks celery, halved
                  * 1 large onion, halved
                  * water to cover
                  * salt and pepper to taste
                  * 1 teaspoon chicken bouillon granules (optional)
                  * 1/2 teaspoon lemonade`,
        instructions: `* Put the chicken, carrots, celery and onion in a large
                  soup pot and cover with cold water. Heat and simmer, 
                  uncovered, until the chicken meat falls off of the bones
                  (skim off foam every so often).
                  * Take everything out of the pot. Strain the broth. 
                  Pick the meat off of the bones and chop the carrots, celery 
                  and onion. Season the broth with salt, pepper and chicken 
                  bouillon to taste, if desired. Return the chicken, carrots, 
                  celery and onion to the pot, stir together, and serve.`,
        image: 'spice.jpg',
        createdAt: '2018-02-05T07:00:47.980Z'
      }
    ]
  },
  postReviewResponse: {
    status: 'success',
    message: 'Review successfully posted',
    review: {
      id: 1,
      comment: 'Awesome recipe',
      createdAt: '2018-02-05T07:00:47.980Z',
      updatedAt: '2018-02-03T15:58:43.318Z',
      userId: 1,
      User: {
        username: 'username'
      }
    }
  }
};
