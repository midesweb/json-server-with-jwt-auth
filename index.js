// GET JSON file in args 
const yargs = require('yargs');
yargs.options({
  port: {
    alias: 'p',
    description: 'Set port',
    default: 3000
  },
  file: {
    alias: 'f',
    description: 'Set JSON File',
    default: './json-samples/default.json'
  },
  authentication: {
    alias: 'a',
    description: 'Enable authenticaded routes',
    default: 'true'
  },
  delay: {
    alias: 'd',
    description: 'Miliseconds delay before response',
    default: '1500'
  }
});

console.log(yargs.argv);

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(yargs.argv.file);
const middlewares = jsonServer.defaults();

// bodyParser, load json-server instance to use in this module
server.use(jsonServer.bodyParser)

// Use json-server middlewares 
server.use(middlewares);

// configure user storage in memory
const userStorage = require('./security/users-storage')({
  email: 'user@example.com',
  password: '1234'
});
userStorage.logUsers();

// Route for login
const login = require('./routes/login-route')(userStorage);
server.post('/login', login);

// Route for sign-in
const register = require('./routes/sign-in-route')(userStorage);
server.post('/sign-in', register);

// Auth middleware 
if (yargs.argv.authentication === 'true') {
  const authMiddleware = require('./middleware/auth-middleware');
  server.use(authMiddleware);
}

// delay middleware
const delayMiddleware = require('./middleware/delay-middleware')(yargs.argv.delay);
server.use(delayMiddleware);

// Token verify route
const verify = require('./routes/verify-route');
server.get('/verify', verify);

// Start JSON Server
server.use(router);
server.listen(yargs.argv.port, () => {
  console.log(`
JSON Server is running on port ${yargs.argv.port}
http://localhost:${yargs.argv.port}
`)
});