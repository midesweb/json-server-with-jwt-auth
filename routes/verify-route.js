const delay = require('delay');

module.exports = function (req, res) {
  delay(1000).then(() => {
    //si estoy aqui ya paso por el midddleware, luego no tengo que verificar nada
    console.log(req.usuario);
    res.status(201).json({
      msg: 'Verified',
      email: req.usuario
    });
  });
}
