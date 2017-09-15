[![Build Status](https://travis-ci.org/monsieurkayode/More-Recipes-Kayode-Adeola.svg?branch=develop)](https://travis-ci.org/monsieurkayode/More-Recipes-Kayode-Adeola)
[![Coverage Status](https://coveralls.io/repos/github/monsieurkayode/More-Recipes-Kayode-Adeola/badge.svg?branch=develop)](https://coveralls.io/github/monsieurkayode/More-Recipes-Kayode-Adeola?branch=develop)
[![Code Climate](https://codeclimate.com/github/monsieurkayode/More-Recipes-Kayode-Adeola/badges/gpa.svg)](https://codeclimate.com/github/monsieurkayode/More-Recipes-Kayode-Adeola)
[![Issue Count](https://codeclimate.com/github/monsieurkayode/More-Recipes-Kayode-Adeola/badges/issue_count.svg)](https://codeclimate.com/github/monsieurkayode/More-Recipes-Kayode-Adeola)
# More-Recipes
## Introduction
**More-Recipes** is a recipe sharing and social connecting platform where users can show their cuisine expertise by posting recipes for other users to view and learn from. Everything about this application is detailed below:

## Application Features
* Users can create accounts on the application
* Users can login to use the accessible features provided
* Users can create and post recipes
* Users can edit recipes they have posted
* Users can delete recipes they have posted
* Users can add recipes posted by other users to their favorite recipe list
* Users can view recipes posted in the application
* Users can comment on recipes posted in the application
* Users can show reaction to a posted recipe by upvoting or downvoting
* Users can assign their favorite recipe to a category

## Technology Stack
* NodeJS
* Express
* Sequelize ORM
* Postgresql Relational Database
* Materialize

## Getting Started
* Install **NodeJs** and **Postgresql** (PGAdmin 4 preferably) locally on your machine or signup to an online hosted database e.g ElephantSql
* Clone the repository from bash or windows command
> $ `git clone https://github.com/monsieurkayode/More-Recipes-Kayode-Adeola.git`

* Change into the directory
> $ `cd /More-Recipes-Kayode-Adeola`
* Install all required dependencies with 
> $ `npm install`
* After successful installation, create a `.env` file which will be used to load environment variables **see sample below**
* Create a databse to be used with application
``` 
DB_USERNAME = your database username
DB_PASSWORD = your database password
DB_DATABASE = your database name
DB_HOST = "127.0.0.1"
DB_PORT = "5432"
DB_DIALECT = "postgres"
secretKey = your secret key
issuer = your issuer
jwtid = your jwt id
expiresIn = set expiration e.g **"24h"**
```
* Migrate your database schema using 
> $ `npm run migrate`
* To start the application
``` 
> $ npm start
> babel-node ./bin/www
> Server listening on port 5000

```
## Using the Application
#### Routes
* POST `api/v1/users/signup` for creation of new account. Required fields are:
  * `username` Username containing alphabets and numbers only, mininmum of three characters
  * `email` A valid email address of the new user
  * `password` Password mininmum character length of six
  * `confirmPassword` Should be same as password provided above

* POST `api/v1/users/signin` for logging in to the application. Required fields are:
  * `username` Username of registered user
  * `password` Password of registered user

* PUT `api/v1/users/changepassword` for changing password of an existing user. Required fields are:
  * `password` old password
  * `newPassword` new password

* POST `api/v1/recipes` for creating new recipes posts. Required fields are:
  * `recipeName` Name of the recipe
  * `category`[optional] Category of the recipe
  * `ingredients` Ingredients for preparing the recipe
  * `instructions` Step by step guide on how recipe is prepared
  
* GET `api/v1/recipes` for viewing all the posted recipes in the application

* GET `api/v1/recipes?sort=upvote&order=descending` for viewing recipes with higehest number of upvotes

* GET `api/v1/recipes?category=<keyword>` for getting all recipes by category that matches search query

* GET `api/v1/recipes?ingredients=<keyword>` for getting all recipes with ingredients that matches search query

* PUT `api/v1/recipes/<recipeId>` for modifying a recipe by a user who has posted it. Fields that can be modified:
  * `recipeName`
  * `category`
  * `ingredients`
  * `instructions`
Required: `recipeId`[integer], the `id` of the recipe to be modified

* DELETE `api/v1/recipes/<recipeId>` to delete a posted recipe. Required `recipeId`[integer], the `id` of the recipe

* GET `api/v1/recipes/user` to get all recipes posted by and belonging to a user

* PUT `api/v1/recipes/<recipeId>/upvote` to upvote a recipe. Required `recipeId`[integer], `id` of the recipe

* PUT `api/v1/recipes/<recipeId>/downvote` to downvote a recipe. Required `recipeId`[integer], `id` of the recipe

* POST `api/v1/recipes/<recipeId>/reviews` for reviewing a recipe by making comments on the recipe post. Required `recipeId`[integer], `id` of the recipe

* POST `api/v1/users/<recipeId>/favorites` for adding a recipe to a list of user's favorite. Required `recipeId`[integer], `id` of the recipe

* PUT `api/v1/users/<recipeId>/favorites` for adding a recipe on a user's favorite list to a category. Required `recipeId`[integer], `id` of the recipe

* GET `api/v1/users/recipes/favorites` for viewing all the recipes in a user's favorite list.

## Testing
* Create a test database and name it travis
* Run Test `$ npm test`

## Application Limitations
* Users can only create account once with their username and  email
* Users can login and obtain a token which is verified on every request
* Users will have to obtain a fresh token after 24 hours when their session has expired
* Users will only be able to access the full application functionalities only if they are logged in
