const testValidUsers = [
  {
    username: 'patsiizy',
    password: 'passover',
    confirmPassword: 'passover',
    email: 'patzii@gmail.com',
  },
  {
    username: 'sponge',
    password: 'squarepants',
    confirmPassword: 'squarepants',
    email: 'spongebob@gmail.com',
  },
  {
    username: '56%67',
    password: 'squarepants',
    confirmPassword: 'squarepants',
    email: 'spongebob@gmail.com',
  },
  {
    username: 'sp',
    password: 'squarepants',
    confirmPassword: 'squarepants',
    email: 'spongebob@gmail.com',
  },
  {
    username: 'chucky',
    password: 'squar',
    confirmPassword: 'squarepants',
    email: 'chucky@gmail.com',
  },
  {
    username: 'chucky',
    password: 'square',
    confirmPassword: 'squar',
    email: 'chucky@gmail.com',
  },
  {

  }
];

const validUsersLogin = [
  {
    username: 'patsiizy',
    password: 'passover',
  },

  {
    username: 'sponge',
    password: 'squarepants',
  },
];

const invalidUsers = [
  {
    username: 'rapait',
    password: 'gutikms',
  },

  {
    username: 'sumbaz',
    password: 'rakers',
  },
];


const emptyUsername = [
  {
    username: '',
    password: 'password',
    confirmPassword: 'password',
    email: 'sam@gmail.com'
  }
];

const emptyPassword = [
  {
    username: 'samtarly',
    password: '',
    confirmPassword: 'password',
    email: 'sam@gmail.com'
  }
];

const emptyEmail = [
  {
    username: 'samtarly',
    password: 'password',
    confirmPassword: 'password',
    email: '',
  }
];

const incorrectPassword = [
  {
    username: 'sponge',
    password: 'incorrect'
  }
];

const nullForm = [
  {
    username: 'sponge'
  }
];

const changePassword = [
  {
    password: 'passover',
  },
  {
    password: 'pass',
  },
  {

  },
];

export default {
  validUsersLogin,
  invalidUsers,
  testValidUsers,
  emptyUsername,
  emptyPassword,
  emptyEmail,
  incorrectPassword,
  nullForm,
  changePassword
};
