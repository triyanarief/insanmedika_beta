var express = require('express');
var router = express.Router();
var user = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var password = req.body.password;
  var retypePassword = req.body.retypePassword;
  var newUser = {name:name, email:email, phoneNumber:phoneNumber, password:password, retypePassword:retypePassword};
  user.create(newUser, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });

});

module.exports = router;
