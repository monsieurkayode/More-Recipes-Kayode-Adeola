[![Build Status](https://travis-ci.org/monsieurkayode/More-Recipes-Kayode-Adeola.svg?branch=develop)](https://travis-ci.org/monsieurkayode/More-Recipes-Kayode-Adeola)
[![Coverage Status](https://coveralls.io/repos/github/monsieurkayode/More-Recipes-Kayode-Adeola/badge.svg?maxAge=60?branch=develop)](https://coveralls.io/github/monsieurkayode/More-Recipes-Kayode-Adeola?branch=develop)
[![Code Climate](https://codeclimate.com/github/monsieurkayode/More-Recipes-Kayode-Adeola/badges/gpa.svg)](https://codeclimate.com/github/monsieurkayode/More-Recipes-Kayode-Adeola)
[![Issue Count](https://codeclimate.com/github/monsieurkayode/More-Recipes-Kayode-Adeola/badges/issue_count.svg)](https://codeclimate.com/github/monsieurkayode/More-Recipes-Kayode-Adeola)
# More-Recipes
## Introduction
**More-Recipes** is a recipe sharing and social connecting platform where users can show their cuisine expertise by posting recipes for other users to view and learn from. Everything about this application is detailed below:

## Application Features
* Users can create accounts on the application
* Users can login to use the accessible features provided
* Users can change their passwords for login credentials
* Users can create and post recipes
* Users can edit recipes they have posted
* Users can delete recipes they have posted
* Users can add recipes posted by other users to their favorite recipe list
* Users can view recipes posted in the application
* Users can comment on recipes posted in the application
* Users will get email notfications when another user comments on their post
* Users can show reaction to a posted recipe by upvoting or downvoting
* Users can assign their favorite recipe to a category
* Users can delete recipes thay have added to favorite
* Users can see the number of times their posted recipes have been viewed

## Technology Stack
* NodeJS
* Express
* Sequelize ORM
* Postgresql Relational Database
* Materialize

## Getting Started
* Install **NodeJs** and **Postgresql** (PGAdmin 4 preferably) locally on your machine or signup to an online hosted database e.g ElephantSql
* Clone the repository from bash or windows command
```sh
> $ git clone https://github.com/monsieurkayode/More-Recipes-Kayode-Adeola.git
```

* Change into the directory
```sh
> $ cd /More-Recipes-Kayode-Adeola
```
* Install all required dependencies with
```sh
> $ npm install
```
* After successful installation, create a `.env` file which will be used to load environment variables **see sample in env.example**
* Create a database to be used with application

* Migrate your database schema using
```sh
> $ npm run migrate
```
* To start the application
```sh
> $ npm start
> babel-node ./bin/www
> Server listening on port 5000

```

## API Documentation
The API Documentation can be found here [More-Recipes API Documentation](https://more-recipes17.herokuapp.com/api-docs)

## Testing
* Create a test database and name it travis
* Run Test $ npm test

## Application Limitations
* Users can only create account once with their username and  email
* Users can login and obtain a token which is verified on every request
* Users will have to obtain a fresh token after 24 hours when their session has expired
* Users will only be able to access the full application functionalities only if they are logged in

## How To Contribute
* Fork the repository
* Create a feature branch with a feature.md file
* Write tests and make them pass
* Open a pull request
