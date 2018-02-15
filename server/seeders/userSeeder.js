export default {
  validSignupDetails1: {
    username: 'harrypotter',
    email: 'harrypotter@hogwart.com',
    password: 'muggle',
    confirmPassword: 'muggle',
  },
  validSignupDetails2: {
    username: 'voldemort',
    email: 'thedarklord@azkaban.com',
    password: 'thedarklord',
    confirmPassword: 'thedarklord',
  },
  validSignupDetails3: {
    username: 'uzumaki',
    email: 'hokage@konoha.com',
    password: 'kagebushin',
    confirmPassword: 'kagebushin',
  },
  existingUsernameSignup: {
    username: 'harrypotter',
    email: 'lordoftherings@elendil.com',
    password: 'thedarklord',
    confirmPassword: 'thedarklord',
  },
  existingEmailSignup: {
    username: 'aragorn',
    email: 'harrypotter@hogwart.com',
    password: 'thedarklord',
    confirmPassword: 'thedarklord',
  },
  nonAlphanumericUsername: {
    username: '56%67'
  },
  shortUsernameLength: {
    username: 'us'
  },
  shortPasswordLength: {
    password: 'pass'
  },
  invalidEmailAddress: {
    email: 'fakemail@fake'
  },
  confirmationPasswordMatchError: {
    password: 'password',
    confirmPassword: 'passwo'
  },
  validLoginCredentials1: {
    username: 'harrypotter',
    password: 'muggle'
  },
  validLoginCredentials2: {
    username: 'voldemort',
    password: 'thedarklord'
  },
  invalidLoginCredentials: {
    username: 'harrypotter',
    password: 'muggles'
  },
  newUserPassword: {
    password: 'muggle'
  },
  expiredUserToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIj' +
  'oxLCJ1c2VybmFtZSI6ImVtcGVyb2Fya2F5In0sImlhdCI6MTUxODQ2NTcxMSwiZXhwIjoxNTE' +
  '4NTUyMTExLCJpc3MiOiJtb3JlX3JlY2lwZXMxNyIsImp0aSI6Im1vcmVfcmVjaXBlcyJ9.M_r' +
  '6ojxcjMPYWofVxGYyMH1-Pp6XM4zx8PlsWb18EV8'
};
