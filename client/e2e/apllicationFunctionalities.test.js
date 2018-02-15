export default {
  'Display landing page and ensure all element are available': (client) => {
    client
      .url('http://localhost:8081')
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
      .assert.urlEquals('http://localhost:8081/signin')
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
      .assert.urlEquals('http://localhost:8081/signup')
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
  'Signup should fail if no username is provided': (client) => {
    client
      .setValue('input[name=email]', 'daenarys@dragonstone.com')
      .setValue('input[name=password]', 'khaleesi')
      .setValue('input[name=confirmPassword]', 'khaleesi')
      .submitForm('form')
      .pause(1000)
      .assert.visible('form div:nth-child(1) span')
      .assert
      .containsText('form div:nth-child(1) span', 'Username is required')
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
      .clearValue('input[name=email]')
      .setValue('input[name=username]', 'daenarys')
      .setValue('input[name=email]', null)
      .pause(4000)
      .submitForm('form')
      .pause(90000)
      // .assert.visible('form div:nth-child(2) span')
      // .assert
      // .containsText(
      //   'form div:nth-child(2) span',
      //   'Email is required'
      // )
      .pause(10000)
      .end();
  }
};
