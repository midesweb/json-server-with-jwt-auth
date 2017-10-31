const jwt = require('../security/jwt')

module.exports = (req, res, next) => {
  // Validate all GET routes but not /verify
  if(req.method === 'GET' && req.path != '/verify') {
    return true;
  }
  if (isLoggedIn(req)) { // add your authorization logic here
    next(); // continue to JSON Server router
  } else {
    res.status(401).send('Not logged in');
  }
 }

function isLoggedIn(req) {
  let token = req.get('token');
  let session = jwt.verify(token);
  console.log('Session:\n', session);
  if (session) {
    req.usuario = session.email;
    return true;
  } else {
    return false;
  }
}