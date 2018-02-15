import { resolve } from 'path';

const recipeNames = {
  frenchFries: 'French Fries',
  chickenSoup: 'Chicken Soup'
};

export default {
  'Display landing page and ensure all element are available': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipes')
      .assert.containsText('h3', 'Welcome to awesome tastefullness!')
      .assert.visible('img')
      .assert.cssClassPresent('img', 'responsive-img')
      .assert.attributeContains('img', 'src', 'favicon.ico')
      .assert
      .containsText(
        'h5', 'Creating and sharing recipes has never been much fun'
      )
      .waitForElementVisible('#signup', 1000)
      .waitForElementVisible('#signin', 1000)
      .assert.visible('#signup')
      .assert.visible('#signup')
      .pause(2000)
      .click('#signin')
      .pause(2000);
  },
  'Signin authentication should fail if user is not registered': (client) => {
    client
      .assert.urlEquals('http://localhost:8080/signin')
      .assert.visible('nav')
      .assert.cssClassPresent('nav', 'header')
      .waitForElementVisible('form', 2000)
      .assert.visible('a.brand-logo')
      .assert.containsText('a.brand-logo', 'Back to More-Recipies')
      .assert.visible('li a')
      .assert.containsText('li a', 'Sign Up')
      .assert.elementPresent('ul.side-nav')
      .assert.visible('div.card')
      .assert.containsText('div.card h5', 'Login')
      .assert.visible('form')
      .assert.visible('input[name=username]')
      .assert.visible('input[name=password]')
      .setValue('input[name=username]', 'unregisteredUser')
      .pause(1000)
      .setValue('input[name=password]', 'password')
      .pause(1000)
      .submitForm('form')
      .waitForElementVisible('div.toast', 1000)
      .assert.visible('div.toast')
      .assert.containsText('div.toast', 'Invalid Authentication Details')
      .pause(4000)
      .click('li a')
      .pause(2000);
  },
  'Signup should fail if an empty form is submitted': (client) => {
    client
      .assert.urlEquals('http://localhost:8080/signup')
      .assert.visible('nav')
      .assert.cssClassPresent('nav', 'header')
      .waitForElementVisible('form', 2000)
      .assert.visible('a.brand-logo')
      .assert.containsText('a.brand-logo', 'Back to More-Recipies')
      .assert.visible('li a')
      .assert.containsText('li a', 'Log In')
      .assert.elementPresent('ul.side-nav')
      .assert.visible('div.card')
      .assert.containsText('div.card h5', 'Create an account')
      .assert.visible('form')
      .assert.visible('input[name=username]')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('input[name=confirmPassword]')
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(1) span')
      .assert
      .containsText('form div:nth-child(1) span', 'Username is required')
      .assert.visible('form div:nth-child(2) span')
      .assert
      .containsText('form div:nth-child(2) span', 'Email is required')
      .assert.visible('form div:nth-child(3) span')
      .assert
      .containsText('form div:nth-child(3) span', 'Password is required')
      .pause(2000);
  },
  'Signup should fail if username is less than 3 characters': (client) => {
    client
      .setValue('input[name=username]', 'da')
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(1) span')
      .assert
      .containsText('form div:nth-child(1) span', 'Username too short')
      .pause(2000);
  },
  'Signup should fail if username is more than 30 characters': (client) => {
    client
      .setValue('input[name=username]', 'nerystargarenfirstofhernamekhalee')
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(1) span')
      .assert
      .containsText('form div:nth-child(1) span', 'Username too long')
      .pause(2000);
  },
  'Signup should fail if username contains special characters': (client) => {
    client
      .clearValue('input[name=username]')
      .pause(1000)
      .setValue('input[name=username]', '@dan')
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(1) span')
      .assert
      .containsText(
        'form div:nth-child(1) span',
        'Username should contain alphabets and numbers only'
      )
      .pause(2000);
  },

  'Signup should fail if no email is provided': (client) => {
    client
      .clearValue('input[name=username]')
      .setValue('input[name=username]', 'daenarystormborn')
      .pause(1000)
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(2) span')
      .assert
      .containsText(
        'form div:nth-child(2) span',
        'Email is required'
      )
      .pause(1000);
  },

  'Signup should fail if provided email address not valid': (client) => {
    client
      .setValue('input[name=email]', 'daenarys@com')
      .pause(1000)
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(2) span')
      .assert
      .containsText(
        'form div:nth-child(2) span',
        'Email is invalid'
      )
      .pause(1000);
  },

  'Signup should if no password is provided': (client) => {
    client
      .clearValue('input[name=email]')
      .setValue('input[name=email]', 'daenarys@dragonstone.com')
      .pause(1000)
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(3) span')
      .assert
      .containsText(
        'form div:nth-child(3) span',
        'Password is required'
      )
      .pause(1000);
  },

  'Signup should fail if password length is less than six': (client) => {
    client
      .setValue('input[name=password]', 'kha')
      .pause(1000)
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(3) span')
      .assert
      .containsText(
        'form div:nth-child(3) span',
        'Password too weak'
      )
      .pause(1000);
  },

  'Signup should fail if password confirmation is not provided': (client) => {
    client
      .setValue('input[name=password]', 'leesi')
      .pause(1000)
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(4) span')
      .assert
      .containsText(
        'form div:nth-child(4) span',
        'Confirm password'
      )
      .pause(1000);
  },

  'Signup should fail if password and password confirmation does not match':
  (client) => {
    client
      .setValue('input[name=confirmPassword]', 'wrong')
      .pause(1000)
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(4) span')
      .assert
      .containsText(
        'form div:nth-child(4) span',
        'Passwords do not match'
      )
      .pause(1000);
  },

  'Signup should be successful if all provided registration details are valid':
  (client) => {
    client
      .clearValue('input[name=confirmPassword]')
      .setValue('input[name=confirmPassword]', 'khaleesi')
      .pause(1000)
      .submitForm('form')
      .pause(1000)
      .waitForElementVisible('.toast', 5000)
      .assert.visible('.toast')
      .assert.containsText(
        '.toast',
        'Welcome daenarystormborn! Update your profile'
      )
      .pause(4000);
  },

  'Newly registered user should be redirected to his/her profile details page':
  (client) => {
    client
      .assert.urlEquals('http://localhost:8080/dashboard/profile')
      .assert.visible('nav')
      .assert.cssClassPresent('nav', 'header')
      .assert.visible('.brand-logo')
      .assert.containsText('.brand-logo', 'More-Recipes')
      .assert.visible('#dash-panel')
      .assert.elementPresent('.side-nav')
      .assert.visible('form')
      .assert.visible('.profile-edit-btn')
      .pause(2000);
  },

  'Profile update should fail if an empty form is submitted':
  (client) => {
    client
      .click('.profile-edit-btn')
      .waitForElementNotPresent('.profile-edit-btn', 2000)
      .submitForm('form')
      .waitForElementVisible('form div:nth-child(1) span', 2000)
      .assert.containsText(
        'form div:nth-child(1) span',
        'First name field is required'
      )
      .assert.containsText(
        'form div:nth-child(2) span',
        'Last name field is required'
      )
      .pause(2000);
  },

  'Profile update should fail if provided name lengths are less than 3':
  (client) => {
    client
      .setValue('input[name=firstName]', 'Da')
      .setValue('input[name=lastName]', 'Ta')
      .pause(1000)
      .submitForm('form')
      .waitForElementVisible('form div:nth-child(1) span', 2000)
      .assert.containsText(
        'form div:nth-child(1) span',
        'First name should be minimum of 3 characters'
      )
      .assert.containsText(
        'form div:nth-child(2) span',
        'Last name should be minimum of 3 characters'
      )
      .pause(2000);
  },

  'Profile update should fail if provided name lengths are more than 30':
  (client) => {
    client
      .setValue('input[name=firstName]', 'naerys-Stomborn-Khaleesi-Green-Grass')
      .setValue('input[name=lastName]', 'rgaryen-Breaker-of-Chains-Dragons')
      .pause(1000)
      .submitForm('form')
      .waitForElementVisible('form div:nth-child(1) span', 2000)
      .assert.containsText(
        'form div:nth-child(1) span',
        'First name should be maximum of 30 characters'
      )
      .assert.containsText(
        'form div:nth-child(2) span',
        'Last name should be maximum of 30 characters'
      )
      .pause(2000);
  },

  'Profile update should fail if provided names contain special character(s)':
  (client) => {
    client
      .clearValue('input[name=lastName]')
      .setValue('input[name=lastName]', '@Ta')
      .pause(2000)
      .clearValue('input[name=firstName]')
      .setValue('input[name=firstName]', '@Da')
      .pause(2000)
      .submitForm('form')
      .waitForElementVisible('form div:nth-child(1) span', 2000)
      .assert.containsText(
        'form div:nth-child(1) span',
        'First name should contain alphabets and hyphen only'
      )
      .assert.containsText(
        'form div:nth-child(2) span',
        'Last name should contain alphabets and hyphen only'
      )
      .pause(2000);
  },

  'Profile update should be successful if valid update details are provided':
  (client) => {
    client
      .clearValue('input[name=firstName]')
      .setValue('input[name=firstName]', 'Daenarys')
      .pause(1000)
      .clearValue('input[name=lastName]')
      .pause(1000)
      .setValue('input[name=lastName]', 'Targaryen')
      .setValue(
        'textarea[name=bio]',
        'They call me the mother of dragons but I do not have any idea what ' +
        'I am doing on More-Recipes. Certainly not how to cook meal for that' +
        ' Jon Snow'
      )
      .setValue(
        'input[type=file]',
        resolve(`${__dirname}/../assets/css/img/khaleesi.jpeg`)
      )
      .pause(1000)
      .submitForm('form')
      .waitForElementVisible('.toast', 10000)
      .assert.visible('.toast')
      .assert.containsText('#toast-container div', 'Profile saved')
      .pause(4000);
  },

  'User should be have access to create recipe when authenticated':
  (client) => {
    client
      .click('.dropdown-button')
      .waitForElementVisible('.fa-plus-circle', 5000)
      .pause(1000)
      .click('.fa-plus-circle')
      .pause(2000)
      .assert.urlEquals('http://localhost:8080/recipes/new')
      .assert.visible('nav')
      .assert.visible('.fa-home')
      .assert.visible('#new-post')
      .assert.visible('form')
      .assert.visible('h5')
      .assert.containsText('h5', 'Create Recipe')
      .pause(2000);
  },

  'Post button for creating recipe should be disabled if a field is empty':
  (client) => {
    client
      .assert.attributeEquals('button[type=submit]', 'disabled', 'true')
      .pause(2000);
  },

  'Creating recipe should display errors if user does not fill required fields':
  (client) => {
    client
      .setValue('input[name=recipeName]', '')
      .setValue('textarea[name=ingredients]', '')
      .setValue('textarea[name=instructions]', '')
      .setValue('input[name=recipeName]', '')
      .waitForElementVisible('.red-text', 2000)
      .assert.visible('form div:nth-child(1) div:nth-child(2)')
      .assert.containsText(
        'form div:nth-child(1) div:nth-child(2)',
        'Please enter a recipe name'
      )
      .assert.containsText(
        'form div:nth-child(3) div:nth-child(2)',
        'Please enter some ingredients'
      )
      .assert.containsText(
        'form div:nth-child(4) div:nth-child(2)',
        'Please enter some instructions'
      )
      .pause(2000);
  },

  'Creating recipe should display error if recipe name length is more than 30':
  (client) => {
    client
      .setValue(
        'input[name=recipeName]',
        'This is a very very very long recipe'
      )
      .waitForElementVisible('.red-text', 2000)
      .pause(1000)
      .assert.visible('form div:nth-child(1) div:nth-child(2)')
      .assert.containsText(
        'form div:nth-child(1) div:nth-child(2)',
        'Recipe name too long'
      )
      .clearValue('input[name=recipeName]')
      .pause(2000);
  },

  'Creating recipe should be successful if all form fields have valid input':
  (client) => {
    client
      .setValue('input[name=recipeName]', 'Chicken Fries')
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-wrapper li:nth-child(10)')
      .pause(1000)
      .setValue(
        'textarea[name=ingredients]',
        `**A list of ingredients for preparing Chicken soup**
        * 1 (3 pound) whole chicken
        * 4 carrots, halved
        * 4 stalks celery, halved
        * 1 large onion, halved
        * water to cover
        * salt and pepper to taste
        * 1 teaspoon chicken bouillon granules (optional)`
      )
      .setValue(
        'textarea[name=instructions]',
        '* Put the chicken, carrots, celery and onion in a large soup pot and' +
        ' cover with cold water. Heat and simmer, uncovered, until the ' +
        'chicken meat falls off of the bone (skim off foam every so often) \n' +
        '* Take everything out of the pot. Strain the broth. Pick the meat ' +
        'off of the bones and chop the carrots, celery and onion. Season the ' +
        'broth with salt, pepper and chicken bouillon to taste, if desired. ' +
        'Return the chicken, carrots, celery and onion to the pot, stir ' +
        'together, and serve.'
      )
      .setValue(
        'input[type=file]',
        resolve(`${__dirname}/../assets/css/img/bgHome.jpeg`)
      )
      .pause(2000)
      .click('button[type=submit]')
      .pause(5000)
      .waitForElementVisible('#banner', 5000)
      .assert.urlEquals('http://localhost:8080/')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Successfully created new recipe')
      .pause(4000);
  },

  'Creating recipe should fail if recipe has been created by same user':
  (client) => {
    client
      .assert.visible('#banner')
      .assert.visible('nav')
      .assert.visible('.welcome-msg')
      .assert.visible('#search-form')
      .assert.visible('.category')
      .assert.visible('.pagination-container')
      .assert.visible('#trending')
      .assert.visible('.page-footer')
      .click('#new-post')
      .waitForElementVisible('#upload-btn', 5000)
      .setValue('input[name=recipeName]', 'Chicken Fries')
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-wrapper li:nth-child(10)')
      .pause(1000)
      .setValue(
        'textarea[name=ingredients]',
        `**A list of ingredients for preparing Chicken soup**
        * 1 (3 pound) whole chicken
        * 4 carrots, halved
        * 4 stalks celery, halved
        * 1 large onion, halved
        * water to cover
        * salt and pepper to taste
        * 1 teaspoon chicken bouillon granules (optional)`
      )
      .setValue(
        'textarea[name=instructions]',
        '* Put the chicken, carrots, celery and onion in a large soup pot and' +
        ' cover with cold water. Heat and simmer, uncovered, until the ' +
        'chicken meat falls off of the bone (skim off foam every so often) \n' +
        '* Take everything out of the pot. Strain the broth. Pick the meat ' +
        'off of the bones and chop the carrots, celery and onion. Season the ' +
        'broth with salt, pepper and chicken bouillon to taste, if desired. ' +
        'Return the chicken, carrots, celery and onion to the pot, stir ' +
        'together, and serve.'
      )
      .setValue(
        'input[type=file]',
        resolve(`${__dirname}/../assets/css/img/bgHome.jpeg`)
      )
      .pause(2000)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'You have already created recipe')
      .clearValue('input[name=recipeName]')
      .pause(2000);
  },

  'User should be able create recipes with name they have not created':
  (client) => {
    client
      .setValue('input[name=recipeName]', recipeNames.frenchFries)
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-wrapper li:nth-child(2)')
      .pause(2000)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 10000)
      .assert.containsText('.toast', 'Successfully created new recipe')
      .pause(3000)
      .click('#new-post')
      .waitForElementVisible('#upload-btn', 5000)
      .pause(2000);
  },

  'Creating recipe with no image should set a default image for the recipe':
  (client) => {
    client
      .setValue('input[name=recipeName]', recipeNames.chickenSoup)
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-wrapper li:nth-child(5)')
      .pause(1000)
      .setValue(
        'textarea[name=ingredients]',
        `**A list of ingredients for preparing Chicken soup**
        * 1 (3 pound) whole chicken
        * 4 carrots, halved
        * 4 stalks celery, halved
        * 1 large onion, halved
        * water to cover
        * salt and pepper to taste
        * 1 teaspoon chicken bouillon granules (optional)`
      )
      .setValue(
        'textarea[name=instructions]',
        '* Put the chicken, carrots, celery and onion in a large soup pot and' +
        ' cover with cold water. Heat and simmer, uncovered, until the ' +
        'chicken meat falls off of the bone (skim off foam every so often) \n' +
        '* Take everything out of the pot. Strain the broth. Pick the meat ' +
        'off of the bones and chop the carrots, celery and onion. Season the ' +
        'broth with salt, pepper and chicken bouillon to taste, if desired. ' +
        'Return the chicken, carrots, celery and onion to the pot, stir ' +
        'together, and serve.'
      )
      .pause(2000)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Successfully created new recipe')
      .pause(2000);
  },

  'Users should be able to search for recipes, defaults to search by title':
  (client) => {
    client
      .assert.visible('input[name=searchTerm]')
      .assert.visible('input[class=select-dropdown]')
      .setValue('input[name=searchTerm]', 'sou')
      .pause(3000)
      .click('.select-dropdown')
      .pause(2000)
      .click('.select-wrapper li:nth-child(3)')
      .pause(1000)
      .clearValue('input[name=searchTerm]')
      .pause(1000)
      .setValue('input[name=searchTerm]', 'spe')
      .pause(5000)
      .setValue('input[name=searchTerm]', 'zus')
      .waitForElementVisible('.not-found', 4000)
      .pause(2000)
      .clearValue('input[name=searchTerm]')
      .pause(1000)
      .setValue('input[name=searchTerm]', 'spe')
      .pause(2000);
  },

  'Authenticated user should be able to view details of a recipe': (client) => {
    client
      .waitForElementVisible('.hoverable', 10000)
      .click('div#recipes div:nth-child(2) img')
      .waitForElementVisible('#post-btn', 10000)
      .assert.urlEquals('http://localhost:8080/recipes/1')
      .assert.visible('nav')
      .assert.visible('#instructions')
      .assert.visible('#ingredients')
      .assert.visible('.materialboxed')
      .assert.visible('.fa-thumbs-up')
      .assert.visible('.fa-thumbs-down')
      .assert.visible('.fa-heart')
      .assert.visible('textarea')
      .pause(4000);
  },

  'Authenticated user should be able to upvote a recipe': (client) => {
    client
      .click('.fa-thumbs-up')
      .pause(2000);
  },

  'Authenticated user should be able to downvote a recipe': (client) => {
    client
      .click('.fa-thumbs-down')
      .pause(2000);
  },

  'Authenticated user should be able to favorite a recipe': (client) => {
    client
      .click('.fa-heart')
      .pause(4000)
      .click('.fa-heart')
      .pause(2000);
  },

  'Authenticated user should be able to review a recipe': (client) => {
    client
      .setValue('textarea[name=comment]', 'This is an awesome recipe')
      .pause(1000)
      .click('#post-btn')
      .pause(4000)
      .click('.fa-heart')
      .pause(4000);
  },

  'Authenticated user should be able to view his/her personal dashboard':
  (client) => {
    client
      .click('.dropdown-button')
      .waitForElementVisible('.fa-dashboard', 5000)
      .pause(1000)
      .click('.fa-dashboard')
      .waitForElementVisible('#dash-panel', 5000)
      .assert.urlEquals('http://localhost:8080/dashboard/recipes')
      .pause(2000);
  },

  'Authenticated user should be able to view his/her favorite recipes':
  (client) => {
    client
      .click('.fa-heart')
      .pause(2000);
  },

  'Authenticated user should be able to remove favorite recipe':
  (client) => {
    client
      .click('.delete')
      .waitForElementVisible('#modal-delete', 5000)
      .pause(2000)
      .click('div.modal-footer button:nth-child(2)')
      .pause(4000);
  },

  'Authenticated user should be able to view recipes they created':
  (client) => {
    client
      .click('.fa-briefcase')
      .pause(2000);
  },

  'Authenticated user should be able to delete his/her recipes':
  (client) => {
    client
      .click('.delete')
      .waitForElementVisible('#modal-delete', 5000)
      .pause(2000)
      .click('div.modal-footer button:nth-child(2)')
      .pause(4000);
  },

  'Authenticated user should be able to update his/her recipes':
  (client) => {
    client
      .click('div#my-recipes div:nth-child(1) a.edit')
      .waitForElementVisible('button[type=submit]', 5000)
      .assert.urlContains('edit')
      .clearValue('input[name=recipeName]')
      .clearValue('input[name=recipeName]')
      .pause(2000)
      .setValue('input[name=recipeName]', ' Chips')
      .pause(1000)
      .click('button[type=submit]')
      .pause(2000);
  },

  'Authenticated user should be able to view recipes by category':
  (client) => {
    client
      .waitForElementVisible('#dash-panel', 5000)
      .pause(4000)
      .click('.brand-logo')
      .waitForElementVisible('.welcome-msg', 5000)
      .pause(2000)
      .assert.visible('.category')
      .click('ul.collapsible li:nth-child(9)')
      .pause(3000)
      .assert.urlContains('category')
      .pause(5000)
      .click('ul.collapsible li:nth-child(1)')
      .pause(4000);
  },

  'User should be able to logout of the application':
  (client) => {
    client
      .click('.dropdown-button')
      .waitForElementVisible('.fa-sign-out', 5000)
      .pause(1000)
      .click('.fa-sign-out')
      .waitForElementVisible('#signup', 5000)
      .pause(5000);
  },

  'Signup should fail if provided username already exists': (client) => {
    client
      .click('#signup')
      .waitForElementVisible('form', 5000)
      .pause(1000)
      .setValue('input[name=username]', 'daenarystormborn')
      .setValue('input[name=email]', 'daenarys@dragonstone.com')
      .setValue('input[name=password]', 'khaleesi')
      .setValue('input[name=confirmPassword]', 'khaleesi')
      .pause(1000)
      .submitForm('form')
      .pause(4000);
  },

  'Signin should be successful if provided credentials are valid': (client) => {
    client
      .url('http://localhost:8080/signin')
      .pause(2000)
      .setValue('input[name=username]', 'daenarystormborn')
      .setValue('input[name=password]', 'khaleesi')
      .pause(1000)
      .submitForm('form')
      .pause(4000);
  },

  'Non existent routes or resource should return a not found page':
  (client) => {
    client
      .url('http://localhost:8080/recipes/invalid')
      .pause(4000)
      .url('http://localhost:8080/invalidroute')
      .pause(2000)
      .click('.fa-home')
      .pause(4000)
      .end();
  }
};
