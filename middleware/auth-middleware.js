const jwt = require('../security/jwt')
const delay = require('delay');

module.exports = (req, res, next) => {
  delay(500).then( () => {
    // Validate all GET routes but not /verify
    if(req.method === 'GET' && req.path != '/verify') {
      next();
      return true;
    }
    if (isLoggedIn(req)) { // add your authorization logic here
      next(); // continue to JSON Server router
    } else {
      res.status(401).send('Not logged in');
    }
  });
 }

function isLoggedIn(req) {
  let token = req.get('token');
  //console.log('token', token);
  let session = jwt.verify(token);
  console.log('Session:\n', session);
  if (session) {
    req.usuario = session.email;
    return true;
  } else {
    return false;
  }
}