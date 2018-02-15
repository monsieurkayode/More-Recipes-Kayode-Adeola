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
* React
* Redux

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
* To start the application in development mode
```sh
> $ npm run start:devServer
> nodemon --watch server --watch client --exec babel-node ./server/bin/www
> more-recipes@1.0.0 client:dev /Users/kayodeadeola/Desktop/Checkpoint 1/More-Recipes-Kayode-Adeola
> webpack-dev-server --config webpack.config.dev.js
> [nodemon] 1.12.1
> [nodemon] to restart at any time, enter `rs`
> [nodemon] starting `babel-node ./server/bin/www`
> Project is running at http://localhost:8081/
> webpack output is served from /
> Content not from webpack is served from ./build
> 404s will fallback to /index.html
> Server listening on port 5000
>
> webpack: Compiled successfully.

```
* To start the the production build
```sh
> $ npm run build:prod
> $ npm start
> Server listening on port 5000

```

## API Documentation
The API Documentation can be found here [More-Recipes API Documentation](https://more-recipes17.herokuapp.com/api-docs)

## Testing
* Create a test database
* Run Test use the command
```sh
> `$ npm test`

```
## FAQ
#### API response format
The API currently returns data in JSON format

#### Authentication
All api endpoints except the signin and signup endpoints require authentication and authorization. On succesfull login or signup a token is returned. Set the token as the value to the x-aceess-token key in your headers.

#### Environments
This project has three environments configured all with their own databases
* Development
* Test
* Production

##### Development
This describes my local devlopment environment with certain configurations that make the workflow easier. It's designed to simulate a production environment as closely as possible but it is configured to work with dummy data

##### Test
The test environment is used to run the integration and unit tests for this application, it is completely seperate and it has its own migrations and seeders. For this project the test environment is configured on TRAVIS CI.

##### Production
This is the live environment that contains real data. Currently, it is hosted on Heroku.

## Application Limitations
* Users can only create account once with their username and email
* The api uses a shared database connection thereby leading to occasionally slow response times

## How To Contribute
* Fork the repository
* Create a feature branch with a feature.md file
* Write tests and make them pass
* Open a pull request

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.